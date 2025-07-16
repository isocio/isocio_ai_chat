
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { isApiConfigured, streamChatCompletion, getChatTitle, generateImageFromPrompt, analyzeImageWithAzure, analyzeDocumentWithAzure } from '../services/openaiService';
import type { Message, ChatSession, Attachment } from '../types';
import { useAppContext } from '../context/AppContext';
import { PlusIcon, ChatBubbleIcon, SendIcon, MenuIcon, UserCircleIcon, SparklesIcon, PlanIcon, CustomizeIcon, HelpIcon, LogoutIcon, ImageIcon, MicrophoneIcon, ClipboardIcon, ThumbsUpIcon, ThumbsDownIcon, ArrowPathIcon, ShareIcon, ClipboardCheckIcon, PaperClipIcon, SpeakerWaveIcon, StopCircleIcon, XMarkIcon, ArchiveBoxIcon, TrashIcon, ArrowUpOnSquareIcon, XCircleIcon, ShieldCheckIcon, GlobeIcon, PencilIcon, ResearchIcon, LightbulbIcon } from '../components/icons';
import SettingsModal from '../components/SettingsModal';
import type { ActiveTab as SettingsTab } from '../components/SettingsModal';
import { findLastIndex } from '../utils/helpers';

const AZURE_SPEECH_KEY = import.meta.env.VITE_AZURE_SPEECH_KEY;
const AZURE_SPEECH_REGION = import.meta.env.VITE_AZURE_SPEECH_REGION;

const translations = {
  en: {
    newChat: "New chat",
    askAnything: "Ask anything, or attach a file...",
    whatsOnMind: "How can I help today?",
    logout: "Log out",
    settings: "Settings",
    myPlan: "My plan",
    customize: "Settings",
    helpCenter: "Help Center",
    adminDashboard: "Admin Dashboard",
    userEmail: "user@example.com",
    tools: "Tools",
    createImage: "Create an image",
    copy: "Copy",
    copied: "Copied!",
    goodResponse: "Good response",
    badResponse: "Bad response",
    readAloud: "Read aloud",
    stop: "Stop",
    stopGenerating: "Stop generating",
    regenerate: "Regenerate",
    share: "Share",
    disclaimer: "AI may make errors. Check the important information.",
    attachFile: "Attach file",
    microphone: "Use microphone",
    recording: "Stop recording",
    send: "Send",
    suggestWrite: "Help me write",
    suggestWriteText: "a thank you note to my team",
    suggestBrainstorm: "Help me brainstorm",
    suggestBrainstormText: "team bonding activities for a work retreat",
    suggestPlan: "Help me plan",
    suggestPlanText: "a 3-day trip to Paris",
    suggestUnderstand: "Help me understand",
    suggestUnderstandText: "the basics of quantum computing",
    active: "Active",
    archived: "Archived",
    shared: "Shared",
    archive: "Archive",
    unarchive: "Unarchive",
    stopSharing: "Stop Sharing",
    delete: "Delete",
    noActiveChats: "No active chats.",
    noArchivedChats: "No archived chats.",
    noSharedChats: "No shared chats.",
    confirmDeleteChat: "Are you sure you want to permanently delete this chat?",
    confirmArchiveAll: "Are you sure you want to archive all chats?",
    chatShared: "Chat is now shared. In a real app, you would get a shareable link.",
    azureCredsMissing: "Azure Speech key or region not configured. Speech services are disabled.",
    imageAnalysisPrefix: "[Image Analysis]",
    captionLabel: "Caption",
    ocrLabel: "Text",
    documentAnalysisPrefix: "[Document Analysis]",
    apiErrorTitle: "API Not Configured",
    apiErrorBody: "The application is not configured to connect to the AI service. Please ensure the required API keys are set in the environment by the administrator.",
  },
  ar: {
    newChat: "دردشة جديدة",
    askAnything: "اسأل أي شيء، أو أرفق ملفًا...",
    whatsOnMind: "كيف يمكنني المساعدة اليوم؟",
    logout: "تسجيل الخروج",
    settings: "الإعدادات",
    myPlan: "خطتي",
    customize: "الإعدادات",
    helpCenter: "مركز المساعدة",
    adminDashboard: "لوحة تحكم الأدمن",
    userEmail: "user@example.com",
    tools: "أدوات",
    createImage: "إنشاء صورة",
    copy: "نسخ",
    copied: "تم النسخ!",
    goodResponse: "رد جيد",
    badResponse: "رد سيء",
    readAloud: "قراءة بصوت عالٍ",
    stop: "إيقاف",
    stopGenerating: "إيقاف الإنشاء",
    regenerate: "إعادة الإنشاء",
    share: "مشاركة",
    disclaimer: "قد يرتكب الذكاء الاصطناعي أخطاء. تحقق من المعلومات المهمة.",
    attachFile: "إرفاق ملف",
    microphone: "استخدام الميكروفون",
    recording: "إيقاف التسجيل",
    send: "إرسال",
    suggestWrite: "ساعدني في كتابة",
    suggestWriteText: "رسالة شكر لفريقي",
    suggestBrainstorm: "ساعدني في توليد أفكار",
    suggestBrainstormText: "لأنشطة بناء الفريق في معتكف عمل",
    suggestPlan: "ساعدني في التخطيط",
    suggestPlanText: "لرحلة لمدة 3 أيام إلى باريس",
    suggestUnderstand: "ساعدني في فهم",
    suggestUnderstandText: "أساسيات الحوسبة الكمومية",
    active: "النشطة",
    archived: "المؤرشفة",
    shared: "المشتركة",
    archive: "أرشفة",
    unarchive: "إلغاء الأرشفة",
    stopSharing: "إيقاف المشاركة",
    delete: "حذف",
    noActiveChats: "لا توجد دردشات نشطة.",
    noArchivedChats: "لا توجد دردشات مؤرشفة.",
    noSharedChats: "لا توجد دردشات مشتركة.",
    confirmDeleteChat: "هل أنت متأكد أنك تريد حذف هذه الدردشة نهائيًا؟",
    confirmArchiveAll: "هل أنت متأكد أنك تريد أرشفة جميع الدردشات؟",
    chatShared: "تمت مشاركة الدردشة الآن. في تطبيق حقيقي، ستحصل على رابط قابل للمشاركة.",
    azureCredsMissing: "مفتاح أو منطقة Azure Speech غير مهيأة. خدمات الكلام معطلة.",
    imageAnalysisPrefix: "[تحليل الصورة]",
    captionLabel: "تعليق",
    ocrLabel: "نص",
    documentAnalysisPrefix: "[تحليل المستند]",
    apiErrorTitle: "واجهة برمجة التطبيقات غير مهيأة",
    apiErrorBody: "التطبيق غير مهيأ للاتصال بخدمة الذكاء الاصطناعي. يرجى التأكد من أن المسؤول قد قام بتعيين مفاتيح API المطلوبة في البيئة.",
  }
};

const ChatInput: React.FC<{
    onSendMessage: (message: string, file: File | null, toolOverride?: string) => void;
    isLoading: boolean;
}> = ({ onSendMessage, isLoading }) => {
    const { language } = useAppContext();
    const t = translations[language];
    const [input, setInput] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isRecording, setIsRecording] = useState(false);
    const recognizerRef = useRef<any | null>(null);

    const placeholderText = t.askAnything;

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = `${scrollHeight}px`;
        }
    }, [input]);

    useEffect(() => {
        return () => {
            if (recognizerRef.current) recognizerRef.current.close();
        };
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
        if (e.target) e.target.value = '';
    };
    
    const handleMicClick = () => {
        if (isRecording) {
            if (recognizerRef.current) {
                recognizerRef.current.stopContinuousRecognitionAsync();
                setIsRecording(false);
            }
            return;
        }

        if (!AZURE_SPEECH_KEY || !AZURE_SPEECH_REGION) {
            alert(t.azureCredsMissing);
            return;
        }
        
        const { SpeechConfig, AudioConfig, SpeechRecognizer, ResultReason } = (window as any).Microsoft.SpeechSDK;
        const speechConfig = SpeechConfig.fromSubscription(AZURE_SPEECH_KEY, AZURE_SPEECH_REGION);
        speechConfig.speechRecognitionLanguage = language === 'ar' ? 'ar-SA' : 'en-US';
        const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
        const recognizer = new SpeechRecognizer(speechConfig, audioConfig);
        recognizerRef.current = recognizer;
        
        let finalTranscript = '';
        setInput('');
        setIsRecording(true);

        recognizer.recognizing = (s: any, e: any) => setInput(finalTranscript + e.result.text);
        recognizer.recognized = (s: any, e: any) => {
            if (e.result.reason === ResultReason.RecognizedSpeech) {
                finalTranscript += e.result.text + " ";
                setInput(finalTranscript);
            }
        };
        recognizer.canceled = (s: any, e: any) => {
            console.error(`CANCELED: Reason=${e.reason}`);
            setIsRecording(false);
            recognizer.stopContinuousRecognitionAsync();
        };
        recognizer.sessionStopped = (s: any, e: any) => {
            setIsRecording(false);
            recognizer.stopContinuousRecognitionAsync();
        };
        recognizer.startContinuousRecognitionAsync();
    };

    const handleSend = (e: React.FormEvent, tool?: 'image') => {
        e.preventDefault();
        if ((input.trim() || file) && !isLoading) {
            onSendMessage(input.trim(), file, tool);
            setInput('');
            setFile(null);
        }
    };
    
    return (
        <div className="w-full max-w-3xl mx-auto">
            <form onSubmit={handleSend} className="relative">
                {file && (
                    <div className="bg-isocio-gray-200 dark:bg-isocio-gray-700 p-2 rounded-lg flex items-center justify-between text-sm mx-2 mb-2">
                        <div className="flex items-center gap-2 truncate">
                            <PaperClipIcon className="w-4 h-4 flex-shrink-0" />
                            <span className="font-medium truncate">{file.name}</span>
                        </div>
                        <button type="button" onClick={() => setFile(null)} className="p-1 rounded-full hover:bg-isocio-gray-300 dark:hover:bg-isocio-gray-600">
                            <XMarkIcon className="w-4 h-4" />
                        </button>
                    </div>
                )}
                <div className="flex items-end gap-2 p-2 border border-isocio-gray-200 dark:border-isocio-gray-700 rounded-2xl focus-within:ring-2 focus-within:ring-isocio-blue transition-shadow bg-isocio-gray-100 dark:bg-isocio-gray-800">
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,text/plain,text/markdown,application/pdf" />
                    <button type="button" onClick={(e) => handleSend(e, 'image')} title={t.createImage} className="p-2 hover:bg-isocio-gray-200 dark:hover:bg-isocio-gray-700 rounded-lg disabled:opacity-50" disabled={isLoading || !input.trim()}>
                        <ImageIcon className="w-6 h-6 text-isocio-gray-600 dark:text-isocio-gray-400" />
                    </button>
                    
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) handleSend(e);
                        }}
                        placeholder={placeholderText}
                        className="flex-grow bg-transparent focus:outline-none resize-none px-2 max-h-48"
                        rows={1}
                        disabled={isRecording}
                    />
                    
                    <div className="flex items-center gap-1 flex-shrink-0">
                        <button type="button" onClick={() => fileInputRef.current?.click()} title={t.attachFile} className="p-2 hover:bg-isocio-gray-200 dark:hover:bg-isocio-gray-700 rounded-full">
                            <PaperClipIcon className="w-6 h-6 text-isocio-gray-600 dark:text-isocio-gray-400" />
                        </button>
                         <button type="button" onClick={handleMicClick} title={isRecording ? t.recording : t.microphone} className={`p-2 rounded-full transition-colors ${isRecording ? 'bg-red-500/20 text-red-500' : 'hover:bg-isocio-gray-200 dark:hover:bg-isocio-gray-700'}`}>
                            {isRecording ? <StopCircleIcon className="w-6 h-6 animate-pulse" /> : <MicrophoneIcon className="w-6 h-6 text-isocio-gray-600 dark:text-isocio-gray-400" />}
                        </button>
                        {(input.trim() || file) && !isRecording && (
                            <button type="submit" disabled={isLoading} title={t.send} className="p-2 rounded-full bg-isocio-blue text-white disabled:bg-isocio-gray-300 dark:disabled:bg-isocio-gray-600 transition-colors">
                                <SendIcon className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
                <p className="text-center text-xs text-isocio-gray-500 dark:text-isocio-gray-400 mt-2 px-4">{t.disclaimer}</p>
            </form>
        </div>
    );
};

const MenuItem: React.FC<{icon: React.ReactNode, text: string, onClick?: () => void}> = ({icon, text, onClick}) => (
    <button onClick={onClick} className="w-full text-start flex items-center gap-3 px-2 py-1.5 rounded-md text-sm hover:bg-isocio-gray-100 dark:hover:bg-isocio-gray-800 transition-colors">
        {icon}
        <span>{text}</span>
    </button>
);

type ViewType = 'active' | 'archived' | 'shared';

const Sidebar: React.FC<{
  chatSessions: ChatSession[];
  activeChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  isOpen: boolean;
  onLogout: () => void;
  onOpenSettings: (tab: SettingsTab) => void;
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  onArchiveChat: (id: string) => void;
  onUnarchiveChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
  onShareChat: (id: string) => void;
  onStopSharing: (id: string) => void;

}> = ({ 
    chatSessions, activeChatId, onNewChat, onSelectChat, isOpen, onLogout, onOpenSettings,
    currentView, setCurrentView, onArchiveChat, onUnarchiveChat, onDeleteChat, onShareChat, onStopSharing
}) => {
  const { language } = useAppContext();
  const navigate = useNavigate();
  const t = translations[language];
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  const filteredSessions = useMemo(() => chatSessions.filter(session => {
    if (currentView === 'active') return !session.isArchived;
    if (currentView === 'archived') return session.isArchived;
    if (currentView === 'shared') return session.isShared;
    return true;
  }).sort((a,b) => b.createdAt - a.createdAt), [chatSessions, currentView]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpenSettings = () => {
    onOpenSettings('general');
    setIsUserMenuOpen(false);
  }

  const handleNavigateToPlan = () => {
    navigate('/plan');
    setIsUserMenuOpen(false);
  }
  
  const handleNavigateToAdmin = () => {
    navigate('/admin');
    setIsUserMenuOpen(false);
  }

  const handleOpenHelp = () => {
    onOpenSettings('help');
    setIsUserMenuOpen(false);
  }

  const ViewSwitcherButton: React.FC<{view: ViewType, text: string}> = ({view, text}) => (
      <button 
        onClick={() => setCurrentView(view)} 
        className={`flex-1 px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${currentView === view ? 'bg-white dark:bg-isocio-gray-700 shadow-sm' : 'hover:bg-white/50 dark:hover:bg-isocio-gray-700/50'}`}
      >
        {text}
      </button>
  );

  return (
    <div className={`fixed top-0 start-0 h-full bg-isocio-gray-50 dark:bg-isocio-gray-950 flex flex-col transition-transform duration-300 ease-in-out z-40 w-64 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:dark:bg-isocio-gray-900 md:bg-white border-e border-isocio-gray-200 dark:border-isocio-gray-800`}>
        <div className="p-4 flex-shrink-0 border-b border-isocio-gray-200 dark:border-isocio-gray-800">
             <button onClick={onNewChat} className="w-full flex items-center justify-between p-2 rounded-lg border border-isocio-gray-300 dark:border-isocio-gray-700 hover:bg-isocio-gray-100 dark:hover:bg-isocio-gray-800">
                <span className="font-semibold text-isocio-gray-900 dark:text-isocio-gray-100">{t.newChat}</span>
                <PlusIcon className="w-5 h-5" />
            </button>
        </div>
      <nav className="flex-grow p-2 overflow-y-auto">
        <div className="px-1 mb-2">
            <div className="flex bg-isocio-gray-200 dark:bg-isocio-gray-800 rounded-lg p-1">
                <ViewSwitcherButton view="active" text={t.active} />
                <ViewSwitcherButton view="archived" text={t.archived} />
                <ViewSwitcherButton view="shared" text={t.shared} />
            </div>
        </div>

        <ul className="mt-2 space-y-1">
          {filteredSessions.map(session => (
            <li key={session.id} className="group relative">
              <button onClick={() => onSelectChat(session.id)} className={`w-full text-start flex items-center gap-3 px-3 py-2 rounded-md text-sm truncate ${activeChatId === session.id ? 'bg-isocio-gray-200 dark:bg-isocio-gray-800' : 'hover:bg-isocio-gray-100 dark:hover:bg-isocio-gray-800'}`}>
                <ChatBubbleIcon className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{session.title}</span>
              </button>
               <div className="absolute end-2 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-0.5 bg-isocio-gray-200 dark:bg-isocio-gray-700 p-0.5 rounded-md">
                {currentView === 'active' && (
                    <>
                        <button title={t.archive} onClick={() => onArchiveChat(session.id)} className="p-1 rounded hover:bg-isocio-gray-300 dark:hover:bg-isocio-gray-600"><ArchiveBoxIcon className="w-4 h-4" /></button>
                        <button title={t.share} onClick={() => onShareChat(session.id)} className="p-1 rounded hover:bg-isocio-gray-300 dark:hover:bg-isocio-gray-600"><ShareIcon className="w-4 h-4" /></button>
                    </>
                )}
                {currentView === 'archived' && (
                    <button title={t.unarchive} onClick={() => onUnarchiveChat(session.id)} className="p-1 rounded hover:bg-isocio-gray-300 dark:hover:bg-isocio-gray-600"><ArrowUpOnSquareIcon className="w-4 h-4" /></button>
                )}
                {currentView === 'shared' && (
                    <button title={t.stopSharing} onClick={() => onStopSharing(session.id)} className="p-1 rounded hover:bg-isocio-gray-300 dark:hover:bg-isocio-gray-600"><XCircleIcon className="w-4 h-4 text-isocio-gray-500" /></button>
                )}
                <button title={t.delete} onClick={() => onDeleteChat(session.id)} className="p-1 rounded hover:bg-red-200 dark:hover:bg-red-800/50"><TrashIcon className="w-4 h-4 text-red-500" /></button>
              </div>
            </li>
          ))}
          {filteredSessions.length === 0 && (
                <div className="text-center p-8 text-sm text-isocio-gray-500 dark:text-isocio-gray-400">
                    {currentView === 'active' && t.noActiveChats}
                    {currentView === 'archived' && t.noArchivedChats}
                    {currentView === 'shared' && t.noSharedChats}
                </div>
            )}
        </ul>
      </nav>
      <div className="flex-shrink-0 p-2 border-t border-isocio-gray-200 dark:border-isocio-gray-800">
          <div ref={userMenuRef} className="relative">
              {isUserMenuOpen && (
                  <div className="absolute bottom-full mb-2 w-full bg-white dark:bg-isocio-gray-900 rounded-md shadow-lg border border-isocio-gray-200 dark:border-isocio-gray-700 z-50 p-2 space-y-1">
                      <div className="px-2 py-1.5 text-sm text-isocio-gray-500 dark:text-isocio-gray-400 truncate">
                          {t.userEmail}
                      </div>
                      <div className="my-1 border-t border-isocio-gray-200 dark:border-isocio-gray-700" />
                      <MenuItem icon={<PlanIcon className="w-5 h-5 text-isocio-gray-500"/>} text={t.myPlan} onClick={handleNavigateToPlan} />
                      <MenuItem icon={<CustomizeIcon className="w-5 h-5 text-isocio-gray-500"/>} text={t.customize} onClick={handleOpenSettings} />
                      <MenuItem icon={<HelpIcon className="w-5 h-5 text-isocio-gray-500"/>} text={t.helpCenter} onClick={handleOpenHelp} />
                      <MenuItem icon={<ShieldCheckIcon className="w-5 h-5 text-isocio-gray-500"/>} text={t.adminDashboard} onClick={handleNavigateToAdmin} />
                      <div className="my-1 border-t border-isocio-gray-200 dark:border-isocio-gray-700" />
                      <MenuItem icon={<LogoutIcon className="w-5 h-5 text-isocio-gray-500"/>} text={t.logout} onClick={onLogout} />
                  </div>
              )}

              <button
                  onClick={() => setIsUserMenuOpen(prev => !prev)}
                  className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-isocio-gray-100 dark:hover:bg-isocio-gray-800"
              >
                  <UserCircleIcon className="w-7 h-7 text-isocio-gray-500" />
                  <span className="truncate font-semibold flex-1 text-start text-sm">{t.userEmail.split('@')[0]}</span>
              </button>
          </div>
      </div>
    </div>
  );
};

const MessageActions: React.FC<{ 
    message: Message; 
    onRegenerate: () => void;
    isLastMessage: boolean;
    isResponding: boolean;
    onPlayText: (message: Message) => void;
    speakingMessageId: string | null;
}> = ({ message, onRegenerate, isLastMessage, isResponding, onPlayText, speakingMessageId }) => {
    const { language } = useAppContext();
    const t = translations[language];
    const [copied, setCopied] = useState(false);
    const [feedback, setFeedback] = useState<'good' | 'bad' | null>(null);
    const isPlaying = speakingMessageId === message.id;

    const handleCopy = () => {
        navigator.clipboard.writeText(message.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleFeedback = (newFeedback: 'good' | 'bad') => {
        setFeedback(prev => prev === newFeedback ? null : newFeedback);
    };

    const actionButtons = [
        { id: 'copy', label: copied ? t.copied : t.copy, icon: copied ? <ClipboardCheckIcon className="w-5 h-5 text-green-500" /> : <ClipboardIcon className="w-5 h-5" />, onClick: handleCopy, disabled: false },
        { id: 'good', label: t.goodResponse, icon: <ThumbsUpIcon className={`w-5 h-5 ${feedback === 'good' ? 'text-isocio-blue' : ''}`} />, onClick: () => handleFeedback('good'), disabled: false },
        { id: 'bad', label: t.badResponse, icon: <ThumbsDownIcon className={`w-5 h-5 ${feedback === 'bad' ? 'text-isocio-blue' : ''}`} />, onClick: () => handleFeedback('bad'), disabled: false },
        { id: 'readAloud', label: isPlaying ? t.stop : t.readAloud, icon: isPlaying ? <StopCircleIcon className="w-5 h-5 text-isocio-blue" /> : <SpeakerWaveIcon className="w-5 h-5" />, onClick: () => onPlayText(message), disabled: false },
        { id: 'share', label: t.share, icon: <ShareIcon className="w-5 h-5" />, onClick: () => {}, disabled: false },
    ];

    if (isLastMessage) {
        actionButtons.push({ id: 'regen', label: t.regenerate, icon: <ArrowPathIcon className="w-5 h-5" />, onClick: onRegenerate, disabled: isResponding });
    }
    
    return (
        <div className="flex items-center gap-1 text-isocio-gray-500 dark:text-isocio-gray-400">
            {actionButtons.map(btn => (
                <button
                    key={btn.id}
                    title={btn.label}
                    onClick={btn.onClick}
                    className="p-1 hover:bg-isocio-gray-200 dark:hover:bg-isocio-gray-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={btn.label}
                    disabled={btn.disabled}
                >
                    {btn.icon}
                </button>
            ))}
        </div>
    );
};

const SuggestionCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    text: string;
    onClick: () => void;
}> = ({ icon, title, text, onClick }) => (
    <button 
      onClick={onClick} 
      className="text-start p-4 border border-isocio-gray-200 dark:border-isocio-gray-700 rounded-xl hover:bg-isocio-gray-100 dark:hover:bg-isocio-gray-800 transition-colors duration-200 h-full"
    >
        <div className="flex items-center gap-3 mb-2">
            {icon}
            <h3 className="font-semibold text-isocio-gray-800 dark:text-isocio-gray-200">{title}</h3>
        </div>
        <p className="text-sm text-isocio-gray-500 dark:text-isocio-gray-400">{text}</p>
    </button>
);


const ChatView: React.FC<{
  messages: Message[];
  isLoading: boolean;
  onRegenerate: () => void;
  onPlayText: (message: Message) => void;
  speakingMessageId: string | null;
  onSendMessage: (message: string, file: File | null) => void;
}> = ({ messages, isLoading, onRegenerate, onPlayText, speakingMessageId, onSendMessage }) => {
  const { language } = useAppContext();
  const t = translations[language];
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSuggestionClick = (prompt: string, text: string) => {
    onSendMessage(`${prompt} ${text}`, null);
  };
  
  const suggestions = [
    { id: 'write', icon: <PencilIcon className="w-6 h-6 text-isocio-gray-500"/>, title: t.suggestWrite, text: t.suggestWriteText, prompt: `Help me write` },
    { id: 'brainstorm', icon: <LightbulbIcon className="w-6 h-6 text-isocio-gray-500"/>, title: t.suggestBrainstorm, text: t.suggestBrainstormText, prompt: `Help me brainstorm` },
    { id: 'plan', icon: <GlobeIcon className="w-6 h-6 text-isocio-gray-500"/>, title: t.suggestPlan, text: t.suggestPlanText, prompt: `Help me plan` },
    { id: 'understand', icon: <ResearchIcon className="w-6 h-6 text-isocio-gray-500"/>, title: t.suggestUnderstand, text: t.suggestUnderstandText, prompt: `Help me understand` },
  ];

  return (
    <div className="flex-grow flex flex-col justify-between">
      <div className="flex-grow overflow-y-auto p-4 md:p-6">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 && !isLoading ? (
            <>
              <div className="text-center my-12">
                <h1 className="text-4xl font-bold tracking-tight text-isocio-gray-800 dark:text-isocio-gray-200">{t.whatsOnMind}</h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {suggestions.map(s => (
                  <SuggestionCard
                    key={s.id}
                    icon={s.icon}
                    title={s.title}
                    text={s.text}
                    onClick={() => handleSuggestionClick(s.prompt, s.text)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                  {message.role === 'model' && (
                    <div className="w-8 h-8 rounded-full bg-isocio-gray-200 dark:bg-isocio-gray-700 flex items-center justify-center flex-shrink-0">
                      <SparklesIcon className="w-5 h-5 text-isocio-blue" />
                    </div>
                  )}
                  <div className={`w-full max-w-full md:max-w-[85%] ${message.role === 'user' ? 'flex justify-end' : ''}`}>
                    <div className={`relative px-4 py-3 rounded-2xl ${message.role === 'user'
                        ? 'bg-isocio-gray-100 dark:bg-isocio-gray-800 rounded-br-none'
                        : 'bg-transparent rounded-bl-none'
                      }`}>
                       {message.attachments?.map((att, attIndex) => (
                          att.type === 'image' && <img key={attIndex} src={att.content} alt={att.name} className="max-w-xs rounded-lg mb-2" />
                       ))}
                      <div className="prose dark:prose-invert max-w-none prose-p:my-2 prose-headings:my-2 prose-ul:my-2 prose-ol:my-2">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                          {message.content}
                        </ReactMarkdown>
                      </div>
                      {message.role === 'model' && !isLoading && (
                        <div className="mt-2 -mb-1">
                           <MessageActions 
                                message={message} 
                                onRegenerate={onRegenerate}
                                isLastMessage={index === messages.length - 1} 
                                isResponding={isLoading}
                                onPlayText={onPlayText}
                                speakingMessageId={speakingMessageId}
                            />
                        </div>
                      )}
                    </div>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-isocio-gray-200 dark:bg-isocio-gray-700 flex items-center justify-center flex-shrink-0">
                      <UserCircleIcon className="w-7 h-7 text-isocio-gray-500" />
                    </div>
                  )}
                </div>
              ))}
               {isLoading && (
                    <div className="flex gap-3">
                         <div className="w-8 h-8 rounded-full bg-isocio-gray-200 dark:bg-isocio-gray-700 flex items-center justify-center flex-shrink-0">
                             <SparklesIcon className="w-5 h-5 text-isocio-blue animate-pulse" />
                         </div>
                         <div className="w-full max-w-full md:max-w-[85%]">
                            <div className="px-4 py-3 rounded-2xl rounded-bl-none">
                                <div className="animate-pulse flex space-x-4">
                                    <div className="flex-1 space-y-3 py-1">
                                        <div className="h-2 bg-isocio-gray-200 dark:bg-isocio-gray-700 rounded"></div>
                                        <div className="h-2 bg-isocio-gray-200 dark:bg-isocio-gray-700 rounded w-5/6"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


const ChatPage: React.FC<{ onLogout: () => void; }> = ({ onLogout }) => {
  const { language } = useAppContext();
  const t = translations[language];
  const navigate = useNavigate();

  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsInitialTab, setSettingsInitialTab] = useState<SettingsTab>('general');
  const [currentView, setCurrentView] = useState<ViewType>('active');
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const isServiceConfigured = isApiConfigured();

  const loadSessionsFromStorage = useCallback(() => {
    try {
      const savedSessions = localStorage.getItem('chatSessions');
      if (savedSessions) {
        const parsedSessions: ChatSession[] = JSON.parse(savedSessions);
        setChatSessions(parsedSessions);
        const lastActive = parsedSessions.find(s => !s.isArchived);
        if (lastActive) setActiveChatId(lastActive.id);
      }
    } catch (error) { console.error("Failed to load sessions:", error); }
  }, []);

  useEffect(() => { loadSessionsFromStorage(); }, [loadSessionsFromStorage]);
  useEffect(() => { 
    try {
      localStorage.setItem('chatSessions', JSON.stringify(chatSessions));
    } catch (error) {
      console.error("Failed to save sessions:", error);
    }
  }, [chatSessions]);

  useEffect(() => {
    const handlePopState = () => stopSpeech();
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      stopSpeech();
    };
  }, []);

  const stopSpeech = () => {
    if (speechSynthesis.speaking) speechSynthesis.cancel();
    setSpeakingMessageId(null);
  };
  
  const handlePlayText = (message: Message) => {
    if (speakingMessageId === message.id) {
        stopSpeech();
        return;
    }
    stopSpeech();

    const utterance = new SpeechSynthesisUtterance(message.content);
    utteranceRef.current = utterance;
    utterance.lang = language === 'ar' ? 'ar-SA' : 'en-US';
    utterance.onstart = () => setSpeakingMessageId(message.id);
    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = (e) => {
        console.error("Speech synthesis error", e);
        setSpeakingMessageId(null);
    };
    speechSynthesis.speak(utterance);
  };
  
  const updateChatSessions = (updater: (prev: ChatSession[]) => ChatSession[]) => {
    setChatSessions(updater);
  };

  const createNewChat = () => {
    stopSpeech();
    const newSession: ChatSession = {
      id: `chat_${Date.now()}`,
      title: t.newChat,
      messages: [],
      createdAt: Date.now()
    };
    updateChatSessions(prev => [newSession, ...prev]);
    setActiveChatId(newSession.id);
    setCurrentView('active');
  };

  const selectChat = (id: string) => {
    stopSpeech();
    setActiveChatId(id);
    const session = chatSessions.find(s => s.id === id);
    if(session?.isArchived) setCurrentView('archived');
    else if(session?.isShared) setCurrentView('shared');
    else setCurrentView('active');
  };

  const processFile = async (file: File | null): Promise<Attachment | null> => {
    if (!file) return null;

    const fileToArrayBuffer = (f: File): Promise<ArrayBuffer> => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = reject;
        reader.readAsArrayBuffer(f);
    });

    const fileToDataURL = (f: File): Promise<string> => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(f);
    });

    try {
        if (file.type.startsWith('image/')) {
            const arrayBuffer = await fileToArrayBuffer(file);
            const dataUrl = await fileToDataURL(file);
            const analysisResult = await analyzeImageWithAzure(arrayBuffer);
            return { name: file.name, type: 'image', mimeType: file.type, content: dataUrl, analysisResult };
        } else if (file.type === 'application/pdf') {
            const arrayBuffer = await fileToArrayBuffer(file);
            const markdownContent = await analyzeDocumentWithAzure(arrayBuffer);
            return { name: file.name, type: 'document', mimeType: file.type, content: markdownContent };
        } else if (file.type.startsWith('text/')) {
            const content = await file.text();
            return { name: file.name, type: 'text', mimeType: file.type, content };
        }
    } catch (error) {
        console.error("Error processing file:", error);
        alert(`Failed to process file ${file.name}: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
    return null;
  };
  
  const handleAIResponse = async (chatId: string, history: Message[], toolOverride?: string) => {
    setIsLoading(true);

    if (toolOverride === 'image') {
      const lastUserMessage = history[history.length - 1];
      const modelMessage: Message = { id: `model_${Date.now()}`, role: 'model', content: '', timestamp: new Date().toISOString() };
      updateChatSessions(prev => prev.map(s => s.id === chatId ? { ...s, messages: [...s.messages, modelMessage] } : s));
      try {
        const b64Json = await generateImageFromPrompt(lastUserMessage.content);
        const imageContent = `![Generated image from prompt: ${lastUserMessage.content}](data:image/png;base64,${b64Json})`;
        updateChatSessions(prev => prev.map(s => s.id === chatId ? { ...s, messages: s.messages.map(m => m.id === modelMessage.id ? {...m, content: imageContent} : m) } : s));
      } catch (error) {
        console.error("Image generation failed:", error);
        const errorMessage = `Image generation failed: ${error instanceof Error ? error.message : "An unknown error occurred."}`;
        updateChatSessions(prev => prev.map(s => s.id === chatId ? { ...s, messages: s.messages.map(m => m.id === modelMessage.id ? { ...m, content: errorMessage } : m) } : s));
      } finally {
        setIsLoading(false);
      }
      return;
    }

    if (history.filter(m => m.role === 'user').length === 1) {
      getChatTitle(history[history.length - 1].content).then(title => {
        updateChatSessions(prev => prev.map(s => s.id === chatId ? { ...s, title } : s));
      });
    }

    const modelMessage: Message = { id: `model_${Date.now()}`, role: 'model', content: '', timestamp: new Date().toISOString() };
    updateChatSessions(prev => prev.map(s => s.id === chatId ? { ...s, messages: [...s.messages, modelMessage] } : s));

    try {
      abortControllerRef.current = new AbortController();
      const stream = await streamChatCompletion(history);
      const reader = stream.getReader();
      const decoder = new TextDecoder();
      while (true) {
        if (abortControllerRef.current.signal.aborted) break;
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        updateChatSessions(prev => prev.map(s => s.id === chatId
            ? { ...s, messages: s.messages.map(m => m.id === modelMessage.id ? { ...m, content: m.content + chunk } : m) }
            : s
        ));
      }
    } catch (error) {
      console.error("Streaming failed:", error);
      const errorMessage = `Error: ${error instanceof Error ? error.message : "An unknown error occurred."}`;
      updateChatSessions(prev => prev.map(s => s.id === chatId
        ? { ...s, messages: s.messages.map(m => m.id === modelMessage.id ? { ...m, content: errorMessage } : m) }
        : s
      ));
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleSendMessage = async (input: string, file: File | null, toolOverride?: string) => {
    if (!isServiceConfigured || isLoading) return;

    setIsLoading(true);
    const attachment = await processFile(file);
    setIsLoading(false);
    if (file && !attachment) return; // File processing failed

    let contentForModel = input;
    if (attachment) {
      if (attachment.type === 'image' && attachment.analysisResult) {
        contentForModel = `${t.imageAnalysisPrefix}\n\n**${t.captionLabel}:** ${attachment.analysisResult.caption}\n\n**${t.ocrLabel}:**\n${attachment.analysisResult.text}\n\n---\n\n${input}`;
      } else if (attachment.type === 'document' || attachment.type === 'text') {
        contentForModel = `File Content: "${attachment.content}"\n\n---\n\nUser Prompt: "${input}"`;
      }
    }
    
    // Message for UI can show the original input
    const userMessageForUi: Message = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
      ...(attachment && { attachments: [attachment] })
    };
    
    // We create a separate message object for the API history with the processed content
    const userMessageForApi: Message = { ...userMessageForUi, content: contentForModel };

    let chatId = activeChatId;
    let newHistory: Message[];

    if (!chatId) {
        chatId = `chat_${Date.now()}`;
        const newSession: ChatSession = {
            id: chatId,
            title: input.substring(0, 30) || (attachment?.name ?? t.newChat),
            messages: [userMessageForUi], // Show the clean message in UI
            createdAt: Date.now(),
        };
        newHistory = [userMessageForApi]; // Use the processed message for API
        setChatSessions(prev => [newSession, ...prev]);
        setActiveChatId(chatId);
        setCurrentView('active');
    } else {
        const currentSession = chatSessions.find(s => s.id === chatId)!;
        newHistory = [...currentSession.messages.map(m => m.id === userMessageForUi.id ? userMessageForApi : m), userMessageForApi];
        setChatSessions(prev => prev.map(s => s.id === chatId ? { ...s, messages: [...s.messages, userMessageForUi] } : s));
    }
    
    setTimeout(() => handleAIResponse(chatId!, newHistory, toolOverride), 0);
  };

  const handleRegenerate = () => {
      stopSpeech();
      const currentSession = chatSessions.find(s => s.id === activeChatId);
      if (!currentSession || isLoading) return;

      const lastUserMessageIndex = findLastIndex(currentSession.messages, msg => msg.role === 'user');
      if (lastUserMessageIndex === -1) return;

      const historyToResend = currentSession.messages.slice(0, lastUserMessageIndex + 1);
      
      updateChatSessions(prev => prev.map(s => s.id === activeChatId ? { ...s, messages: historyToResend } : s));

      // This complex logic is needed to re-process the prompt if it was based on a file
      const lastUserMessage = historyToResend[lastUserMessageIndex];
      const input = lastUserMessage.content;
      const attachment = lastUserMessage.attachments?.[0] || null;
      let contentForModel = input;
      if (attachment) {
          if (attachment.type === 'image' && attachment.analysisResult) {
            contentForModel = `${t.imageAnalysisPrefix}\n\n**${t.captionLabel}:** ${attachment.analysisResult.caption}\n\n**${t.ocrLabel}:**\n${attachment.analysisResult.text}\n\n---\n\n${input}`;
          } else if (attachment.type === 'document' || attachment.type === 'text') {
            contentForModel = `File Content: "${attachment.content}"\n\n---\n\nUser Prompt: "${input}"`;
          }
      }
      const historyForApi = historyToResend.map((msg, index) => index === lastUserMessageIndex ? { ...msg, content: contentForModel } : msg);

      setTimeout(() => handleAIResponse(currentSession.id, historyForApi), 0);
  };

  const handleArchiveChat = (id: string) => {
      updateChatSessions(prev => prev.map(s => s.id === id ? { ...s, isArchived: true } : s));
      if(activeChatId === id) {
        const nextActive = chatSessions.filter(s => !s.isArchived && s.id !== id).sort((a,b) => b.createdAt - a.createdAt)[0];
        setActiveChatId(nextActive ? nextActive.id : null);
      }
  };
  
  const handleUnarchiveChat = (id: string) => {
      updateChatSessions(prev => prev.map(s => s.id === id ? { ...s, isArchived: false } : s));
      setCurrentView('active');
      setActiveChatId(id);
  };
  
  const handleDeleteChat = (id: string) => {
      if (window.confirm(t.confirmDeleteChat)) {
          updateChatSessions(prev => prev.filter(s => s.id !== id));
          if(activeChatId === id) {
            const nextActive = chatSessions.filter(s => !s.isArchived && s.id !== id).sort((a,b) => b.createdAt - a.createdAt)[0];
            setActiveChatId(nextActive ? nextActive.id : null);
          }
      }
  };
  
  const handleShareChat = (id: string) => {
      updateChatSessions(prev => prev.map(s => s.id === id ? { ...s, isShared: true } : s));
      alert(t.chatShared);
  };
  
  const handleStopSharing = (id: string) => {
      updateChatSessions(prev => prev.map(s => s.id === id ? { ...s, isShared: false } : s));
  };
  
  const handleArchiveAll = () => {
      if(window.confirm(t.confirmArchiveAll)) {
          updateChatSessions(prev => prev.map(s => ({...s, isArchived: true})));
          setActiveChatId(null);
      }
  };
  
  const handleDeleteAll = () => {
      if(window.confirm(t.confirmDeleteChat)) {
          updateChatSessions(() => []);
          setActiveChatId(null);
      }
  };
  
  const handleExportAll = () => {
      const data = JSON.stringify(chatSessions, null, 2);
      const blob = new Blob([data], {type: 'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'azure_ai_chat_sessions.json';
      a.click();
      URL.revokeObjectURL(url);
  };
  
  const handleOpenSettings = (tab: SettingsTab) => {
    setSettingsInitialTab(tab);
    setIsSettingsOpen(true);
  };

  const currentMessages = useMemo(() => {
    return chatSessions.find(s => s.id === activeChatId)?.messages || [];
  }, [chatSessions, activeChatId]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        chatSessions={chatSessions}
        activeChatId={activeChatId}
        onNewChat={createNewChat}
        onSelectChat={selectChat}
        isOpen={isSidebarOpen}
        onLogout={onLogout}
        onOpenSettings={handleOpenSettings}
        currentView={currentView}
        setCurrentView={setCurrentView}
        onArchiveChat={handleArchiveChat}
        onUnarchiveChat={handleUnarchiveChat}
        onDeleteChat={handleDeleteChat}
        onShareChat={handleShareChat}
        onStopSharing={handleStopSharing}
      />
      <main className="flex-1 flex flex-col transition-all duration-300 ease-in-out md:ms-64">
        <header className="flex-shrink-0 flex items-center justify-between p-4 border-b border-isocio-gray-200 dark:border-isocio-gray-800">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 md:hidden">
            <MenuIcon className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-semibold truncate">{chatSessions.find(s=>s.id === activeChatId)?.title || t.newChat}</h2>
          <button onClick={createNewChat} className="p-2">
            <PlusIcon className="w-6 h-6" />
          </button>
        </header>

        <ChatView
          messages={currentMessages}
          isLoading={isLoading}
          onRegenerate={handleRegenerate}
          onPlayText={handlePlayText}
          speakingMessageId={speakingMessageId}
          onSendMessage={handleSendMessage}
        />

        <div className="flex-shrink-0 p-4 pt-2">
           {isServiceConfigured ? (
             <>
               {isLoading && (
                 <div className="flex justify-center mb-2">
                   <button onClick={() => abortControllerRef.current?.abort()} className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-isocio-gray-300 dark:border-isocio-gray-600 rounded-lg hover:bg-isocio-gray-100 dark:hover:bg-isocio-gray-800">
                     <StopCircleIcon className="w-5 h-5"/>
                     {t.stopGenerating}
                   </button>
                 </div>
               )}
               <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
             </>
           ) : (
            <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-lg">
                <h3 className="font-bold text-red-800 dark:text-red-300">{t.apiErrorTitle}</h3>
                <p className="text-sm text-red-700 dark:text-red-400">{t.apiErrorBody}</p>
            </div>
           )}
        </div>
      </main>
      
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        onLogout={onLogout}
        onDeleteAll={handleDeleteAll}
        onExportAll={handleExportAll}
        onNavigateToPlan={() => { navigate('/plan'); setIsSettingsOpen(false); }}
        onArchiveAll={handleArchiveAll}
        onNavigateToView={(view) => {
            setCurrentView(view);
            setIsSettingsOpen(false);
        }}
        initialTab={settingsInitialTab}
      />
    </div>
  );
};

export default ChatPage;
