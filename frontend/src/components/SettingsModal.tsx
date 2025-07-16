
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import type { Language, Theme } from '../types';
import { XMarkIcon, Cog6ToothIcon, BellIcon, LinkIcon, CircleStackIcon, ShieldCheckIcon, UserCircleIcon, ChevronUpDownIcon, PlayIcon, PencilSquareIcon, ChevronRightIcon, GoogleDriveIcon, OneDriveIcon, HelpIcon } from './icons';

const translations = {
  en: {
    settings: 'Settings',
    general: 'General',
    notifications: 'Notifications',
    personalization: 'Personalization',
    connectedApps: 'Connected apps',
    dataControls: 'Data controls',
    security: 'Security',
    account: 'Account',
    help: 'Help Center',
    theme: 'Theme',
    system: 'System',
    light: 'Light',
    dark: 'Dark',
    language: 'Language',
    english: 'English',
    arabic: 'العربية',
    spokenLanguage: 'Spoken language',
    spokenLangDesc: "For best results, select the language you mainly speak. If it's not listed, it may still be supported via auto-detection.",
    autoDetect: 'Auto-detect',
    voice: 'Voice',
    play: 'Play',
    arbor: 'Arbor',
    showSuggestions: 'Show follow up suggestions in chats',
    responses: 'Responses',
    getNotified: 'Get notified when the AI responds to requests that take time.',
    push: 'Push',
    tasks: 'Tasks',
    taskUpdates: 'Get notified when tasks you’ve created have updates.',
    email: 'Email',
    customInstructions: 'Custom instructions',
    customInstructionsDesc: 'Reference saved memories when responding.',
    manage: 'Manage',
    connectedAppsDesc: 'These apps will allow you to add files to messages.',
    googleDrive: 'Google Drive',
    googleDriveDesc: 'Upload Google Docs, Sheets, Slides and other files.',
    oneDrivePersonal: 'Microsoft OneDrive (personal)',
    oneDrivePersonalDesc: 'Upload Microsoft Word, Excel, PowerPoint and other files.',
    oneDriveWork: 'Microsoft OneDrive (work/school)',
    oneDriveWorkDesc: 'Upload files, including those from SharePoint sites.',
    connect: 'Connect',
    disconnect: 'Disconnect',
    improveModel: 'Improve the model for everyone',
    improveModelDesc: 'Allow your conversations to be used to train our models. No data from Business or Enterprise plans is used for training.',
    sharedLinks: 'Shared links',
    archivedChats: 'Archived chats',
    archiveAll: 'Archive all chats',
    deleteAll: 'Delete all chats',
    exportData: 'Export data',
    export: 'Export',
    mfa: 'Multi-factor authentication',
    mfaDesc: 'Require an extra security challenge when logging in.',
    logOutDevice: 'Log out of this device',
    logout: 'Log out',
    logOutAll: 'Log out of all devices',
    logOutAllDesc: 'Log out of all active sessions across all devices, including your current session.',
    getPlus: 'Get Plus',
    getPlusDesc: 'Get everything in Free, and more.',
    upgrade: 'Upgrade',
    deleteAccount: 'Delete account',
    delete: 'Delete',
    helpGreeting: "Welcome to the Help Center. We're here to assist you.",
    q1: "What is this app?",
    a1: "This is an intelligent chat platform designed to be your helpful and friendly AI assistant. You can ask it anything, get help with writing, brainstorming, planning, and more.",
    q2: "How do I start a new chat?",
    a2: "You can start a new chat by clicking the 'New Chat' button at the top of the sidebar. This will create a new, empty chat session for you.",
    q3: "Can I upload files?",
    a3: "Yes! You can attach files like images, text documents, and PDFs to your messages using the paperclip icon in the chat input area. The AI can analyze these files and incorporate them into the conversation.",
    q4: "What are Tools?",
    a4: "Tools give you more control over the AI's response. You can use them to instruct the AI to perform specific tasks like generating an image, searching the web for up-to-date information, or writing code.",
    q5: "Is my data private?",
    a5: "We take your privacy seriously. By default, your conversations are not used to train our models. You can review our Privacy Policy for more details. You have controls to manage your data, including exporting or deleting your chat history.",
  },
  ar: {
    settings: 'الإعدادات',
    general: 'عام',
    notifications: 'الإشعارات',
    personalization: 'التخصيص',
    connectedApps: 'التطبيقات المتصلة',
    dataControls: 'عناصر التحكم بالبيانات',
    security: 'الأمان',
    account: 'الحساب',
    help: 'مركز المساعدة',
    theme: 'المظهر',
    system: 'النظام',
    light: 'فاتح',
    dark: 'داكن',
    language: 'اللغة',
    english: 'English',
    arabic: 'العربية',
    spokenLanguage: 'اللغة المنطوقة',
    spokenLangDesc: 'للحصول على أفضل النتائج، حدد اللغة التي تتحدث بها بشكل أساسي. إذا لم تكن مدرجة، فقد تظل مدعومة عبر الاكتشاف التلقائي.',
    autoDetect: 'اكتشاف تلقائي',
    voice: 'الصوت',
    play: 'تشغيل',
    arbor: 'Arbor',
    showSuggestions: 'عرض الاقتراحات اللاحقة في الدردشات',
    responses: 'الردود',
    getNotified: 'تلقي إشعار عندما يستجيب الذكاء الاصطناعي للطلبات التي تستغرق وقتاً.',
    push: 'إشعار فوري',
    tasks: 'المهام',
    taskUpdates: 'تلقي إشعار عند وجود تحديثات للمهام التي أنشأتها.',
    email: 'بريد إلكتروني',
    customInstructions: 'تعليمات مخصصة',
    customInstructionsDesc: 'الرجوع إلى الذكريات المحفوظة عند الرد.',
    manage: 'إدارة',
    connectedAppsDesc: 'ستسمح لك هذه التطبيقات بإضافة ملفات إلى الرسائل.',
    googleDrive: 'Google Drive',
    googleDriveDesc: 'تحميل مستندات وجداول بيانات وعروض تقديمية من Google.',
    oneDrivePersonal: 'Microsoft OneDrive (شخصي)',
    oneDrivePersonalDesc: 'تحميل ملفات Microsoft Word, Excel, PowerPoint وغيرها.',
    oneDriveWork: 'Microsoft OneDrive (عمل/مدرسة)',
    oneDriveWorkDesc: 'تحميل الملفات، بما في ذلك تلك الموجودة في مواقع SharePoint.',
    connect: 'توصيل',
    disconnect: 'قطع الاتصال',
    improveModel: 'تحسين النموذج للجميع',
    improveModelDesc: 'السماح باستخدام محادثاتك لتدريب نماذجنا. لا يتم استخدام أي بيانات من خطط الأعمال أو المؤسسات للتدريب.',
    sharedLinks: 'الروابط المشتركة',
    archivedChats: 'الدردشات المؤرشفة',
    archiveAll: 'أرشفة جميع الدردشات',
    deleteAll: 'حذف جميع الدردشات',
    exportData: 'تصدير البيانات',
    export: 'تصدير',
    mfa: 'المصادقة متعددة العوامل',
    mfaDesc: 'طلب تحدي أمني إضافي عند تسجيل الدخول.',
    logOutDevice: 'تسجيل الخروج من هذا الجهاز',
    logout: 'تسجيل الخروج',
    logOutAll: 'تسجيل الخروج من جميع الأجهزة',
    logOutAllDesc: 'تسجيل الخروج من جميع الجلسات النشطة عبر جميع الأجهزة، بما في ذلك جلستك الحالية.',
    getPlus: 'الحصول على بلس',
    getPlusDesc: 'احصل على كل شيء في الخطة المجانية، وأكثر.',
    upgrade: 'ترقية',
    deleteAccount: 'حذف الحساب',
    delete: 'حذف',
    helpGreeting: "أهلاً بك في مركز المساعدة. نحن هنا لمساعدتك.",
    q1: "ما هو هذا التطبيق؟",
    a1: "هذا التطبيق هو منصة دردشة ذكية مصممة لتكون مساعدك الذكي الودود والمتعاون. يمكنك سؤاله عن أي شيء، والحصول على مساعدة في الكتابة، وتوليد الأفكار، والتخطيط، وغير ذلك الكثير.",
    q2: "كيف أبدأ دردشة جديدة؟",
    a2: "يمكنك بدء دردشة جديدة بالنقر على زر 'دردشة جديدة' في أعلى الشريط الجانبي. سيؤدي هذا إلى إنشاء جلسة دردشة جديدة وفارغة لك.",
    q3: "هل يمكنني تحميل الملفات؟",
    a3: "نعم! يمكنك إرفاق ملفات مثل الصور والمستندات النصية وملفات PDF برسائلك باستخدام أيقونة مشبك الورق في منطقة إدخال الدردشة. يمكن للذكاء الاصطناعي تحليل هذه الملفات ودمجها في المحادثة.",
    q4: "ما هي الأدوات؟",
    a4: "تمنحك الأدوات مزيدًا من التحكم في استجابة الذكاء الاصطناعي. يمكنك استخدامها لتوجيه الذكاء الاصطناعي لأداء مهام محددة مثل إنشاء صورة أو البحث في الويب عن معلومات حديثة أو كتابة تعليمات برمجية.",
    q5: "هل بياناتي خاصة؟",
    a5: "نحن نأخذ خصوصيتك على محمل الجد. بشكل افتراضي، لا تُستخدم محادثاتك لتدريب نماذجنا. يمكنك مراجعة سياسة الخصوصية الخاصة بنا لمزيد من التفاصيل. لديك عناصر تحكم لإدارة بياناتك، بما في ذلك تصدير أو حذف سجل الدردشة الخاص بك.",
  }
};

export type ActiveTab = 'general' | 'notifications' | 'personalization' | 'connected' | 'data' | 'security' | 'account' | 'help';
type ViewType = 'active' | 'archived' | 'shared';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  onDeleteAll: () => void;
  onExportAll: () => void;
  onNavigateToPlan: () => void;
  onArchiveAll: () => void;
  onNavigateToView: (view: ViewType) => void;
  initialTab?: ActiveTab;
}

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => (
    <div className="border-b border-isocio-gray-200 dark:border-isocio-gray-700 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
      <h4 className="text-md font-semibold mb-2 text-isocio-gray-900 dark:text-isocio-gray-100">{question}</h4>
      <p className="text-sm text-isocio-gray-600 dark:text-isocio-gray-400">{answer}</p>
    </div>
  );

const SettingsModal: React.FC<SettingsModalProps> = ({ 
    isOpen, onClose, onLogout, onDeleteAll, onExportAll, onNavigateToPlan,
    onArchiveAll, onNavigateToView, initialTab = 'general' 
}) => {
  const { theme, setTheme, language, setLanguage } = useAppContext();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<ActiveTab>(initialTab);
  const [showFollowUp, setShowFollowUp] = useState(true);
  const [improveModel, setImproveModel] = useState(() => {
    try {
        const saved = localStorage.getItem('improveModel');
        return saved ? JSON.parse(saved) : false;
    } catch {
        return false;
    }
  });
  const [mfa, setMfa] = useState(false);
  const [pushResponses, setPushResponses] = useState(true);
  const [pushTasks, setPushTasks] = useState(true);
  const [emailTasks, setEmailTasks] = useState(false);
  const [customInstructions, setCustomInstructions] = useState(true);

  const [appConnections, setAppConnections] = useState<Record<string, boolean>>(() => {
    try {
        const saved = localStorage.getItem('appConnections');
        return saved ? JSON.parse(saved) : {
            googleDrive: false,
            oneDrivePersonal: false,
            oneDriveWork: false,
        };
    } catch (error) {
        return {
            googleDrive: false,
            oneDrivePersonal: false,
            oneDriveWork: false,
        };
    }
  });

  useEffect(() => {
    if (isOpen) {
        setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);
  
  useEffect(() => {
    localStorage.setItem('appConnections', JSON.stringify(appConnections));
  }, [appConnections]);
  
  useEffect(() => {
    localStorage.setItem('improveModel', JSON.stringify(improveModel));
  }, [improveModel]);


  const handleToggleConnection = (appId: string) => {
    setAppConnections(prev => ({
      ...prev,
      [appId]: !prev[appId]
    }));
  };

  if (!isOpen) return null;

  const handlePlaceholderClick = (feature: string) => {
      alert(`${feature} feature is not implemented yet.`);
  };

  const tabs: { id: ActiveTab; name: string; icon: React.ReactNode; }[] = [
    { id: 'general', name: t.general, icon: <Cog6ToothIcon className="w-5 h-5" /> },
    { id: 'notifications', name: t.notifications, icon: <BellIcon className="w-5 h-5" /> },
    { id: 'personalization', name: t.personalization, icon: <PencilSquareIcon className="w-5 h-5" /> },
    { id: 'connected', name: t.connectedApps, icon: <LinkIcon className="w-5 h-5" /> },
    { id: 'data', name: t.dataControls, icon: <CircleStackIcon className="w-5 h-5" /> },
    { id: 'security', name: t.security, icon: <ShieldCheckIcon className="w-5 h-5" /> },
    { id: 'account', name: t.account, icon: <UserCircleIcon className="w-5 h-5" /> },
    { id: 'help', name: t.help, icon: <HelpIcon className="w-5 h-5" /> },
  ];

  const Dropdown: React.FC<{label: string; value: string; options: {value: string; label: string}[]; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; description?: string;}> = ({ label, value, options, onChange, description }) => (
    <div>
        <label className="block text-sm font-medium text-isocio-gray-700 dark:text-isocio-gray-300">{label}</label>
        <div className="relative mt-1">
            <select
                value={value}
                onChange={onChange}
                className="w-full appearance-none bg-white dark:bg-isocio-gray-800 border border-isocio-gray-300 dark:border-isocio-gray-600 rounded-md py-2 px-3 pr-8 leading-tight focus:outline-none focus:ring-2 focus:ring-isocio-blue focus:border-isocio-blue"
            >
                {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center px-2 text-isocio-gray-700 dark:text-isocio-gray-400">
                <ChevronUpDownIcon className="h-5 w-5" />
            </div>
        </div>
        {description && <p className="mt-2 text-xs text-isocio-gray-500 dark:text-isocio-gray-400">{description}</p>}
    </div>
  );
  
  const ToggleSwitch: React.FC<{ enabled: boolean; setEnabled: (enabled: boolean) => void;}> = ({ enabled, setEnabled }) => (
      <button
        onClick={() => setEnabled(!enabled)}
        className={`${enabled ? 'bg-isocio-blue' : 'bg-isocio-gray-200 dark:bg-isocio-gray-600'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-isocio-blue focus:ring-offset-2 dark:ring-offset-isocio-gray-800`}
      >
        <span
          className={`${enabled ? 'translate-x-5 rtl:-translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
      </button>
  );
  
  const SettingsItem: React.FC<{title: string, description?: string, action: React.ReactNode}> = ({ title, description, action }) => (
      <div className="flex items-center justify-between">
          <div>
              <p className="font-medium text-isocio-gray-800 dark:text-isocio-gray-200">{title}</p>
              {description && <p className="text-sm text-isocio-gray-500 dark:text-isocio-gray-400">{description}</p>}
          </div>
          <div>{action}</div>
      </div>
  );

  const ActionButton: React.FC<{text: string; onClick?: () => void;}> = ({ text, onClick }) => (
    <button onClick={onClick} className="px-4 py-1.5 text-sm font-semibold bg-isocio-gray-100 dark:bg-isocio-gray-700 hover:bg-isocio-gray-200 dark:hover:bg-isocio-gray-600 rounded-md">
      {text}
    </button>
  );
  
  const appsToConnect = [
    { id: 'googleDrive', icon: <GoogleDriveIcon className="w-7 h-7" />, title: t.googleDrive, description: t.googleDriveDesc },
    { id: 'oneDrivePersonal', icon: <OneDriveIcon className="w-7 h-7" />, title: t.oneDrivePersonal, description: t.oneDrivePersonalDesc },
    { id: 'oneDriveWork', icon: <OneDriveIcon className="w-7 h-7" />, title: t.oneDriveWork, description: t.oneDriveWorkDesc },
  ];


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white dark:bg-isocio-gray-900 rounded-xl shadow-2xl w-full max-w-4xl h-[70vh] flex overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="w-1/3 md:w-1/4 border-e border-isocio-gray-200 dark:border-isocio-gray-800 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">{t.settings}</h2>
                <button onClick={onClose} className="p-1 rounded-md hover:bg-isocio-gray-100 dark:hover:bg-isocio-gray-800">
                    <XMarkIcon className="w-6 h-6 text-isocio-gray-500" />
                </button>
            </div>
            <nav className="space-y-1">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${activeTab === tab.id ? 'bg-isocio-gray-100 dark:bg-isocio-gray-800 text-isocio-gray-900 dark:text-isocio-gray-100' : 'text-isocio-gray-600 dark:text-isocio-gray-300 hover:bg-isocio-gray-50 dark:hover:bg-isocio-gray-800/50'}`}
                    >
                        {tab.icon}
                        <span className="truncate">{tab.name}</span>
                    </button>
                ))}
            </nav>
        </div>
        <div className="w-2/3 md:w-3/4 p-8 overflow-y-auto">
            {activeTab === 'general' && (
                <div className="space-y-8">
                    <Dropdown
                        label={t.theme}
                        value={theme}
                        options={[{value: 'system', label: t.system}, {value: 'light', label: t.light}, {value: 'dark', label: t.dark}]}
                        onChange={(e) => setTheme(e.target.value as Theme)}
                    />
                    <Dropdown
                        label={t.language}
                        value={language}
                        options={[{value: 'en', label: t.english}, {value: 'ar', label: t.arabic}]}
                        onChange={(e) => setLanguage(e.target.value as Language)}
                    />
                    <Dropdown
                        label={t.spokenLanguage}
                        value="auto"
                        options={[{value: 'auto', label: t.autoDetect}]}
                        onChange={() => {}}
                        description={t.spokenLangDesc}
                    />
                    <SettingsItem title={t.voice} action={
                        <button onClick={() => handlePlaceholderClick(t.voice)} className="flex items-center gap-2 p-2 rounded-md hover:bg-isocio-gray-100 dark:hover:bg-isocio-gray-800">
                            <PlayIcon className="w-5 h-5" />
                            <span>{t.arbor}</span>
                            <ChevronUpDownIcon className="w-4 h-4 text-isocio-gray-400" />
                        </button>
                    } />
                    <SettingsItem title={t.showSuggestions} action={<ToggleSwitch enabled={showFollowUp} setEnabled={setShowFollowUp} />} />
                </div>
            )}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <SettingsItem title={t.responses} description={t.getNotified} action={<div className='flex items-center gap-2'><span className='text-sm text-isocio-gray-500'>{t.push}</span><ToggleSwitch enabled={pushResponses} setEnabled={setPushResponses}/></div>} />
                <SettingsItem title={t.tasks} description={t.taskUpdates} action={<div className='flex items-center gap-4'><span className='text-sm text-isocio-gray-500'>{t.push}</span><ToggleSwitch enabled={pushTasks} setEnabled={setPushTasks}/><span className='text-sm text-isocio-gray-500'>{t.email}</span><ToggleSwitch enabled={emailTasks} setEnabled={setEmailTasks}/></div>} />
              </div>
            )}
            {activeTab === 'personalization' && (
              <div className="space-y-6">
                <SettingsItem title={t.customInstructions} description={t.customInstructionsDesc} action={<ToggleSwitch enabled={customInstructions} setEnabled={setCustomInstructions}/>} />
                <SettingsItem title={t.manage} action={<button onClick={() => handlePlaceholderClick(t.manage)} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-isocio-gray-100 dark:bg-isocio-gray-700 hover:bg-isocio-gray-200 dark:hover:bg-isocio-gray-600 rounded-md">{t.manage} <ChevronRightIcon className="w-4 h-4" /></button>} />
              </div>
            )}
            {activeTab === 'connected' && (
                <div className="space-y-4">
                    <p className="text-sm text-isocio-gray-600 dark:text-isocio-gray-400">{t.connectedAppsDesc}</p>
                    {appsToConnect.map(app => (
                        <div key={app.id} className="flex items-center justify-between p-3 border border-isocio-gray-200 dark:border-isocio-gray-700 rounded-lg">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 flex items-center justify-center">{app.icon}</div>
                                <div>
                                    <p className="font-semibold">{app.title}</p>
                                    <p className="text-sm text-isocio-gray-500 dark:text-isocio-gray-400">{app.description}</p>
                                </div>
                            </div>
                            {appConnections[app.id] ? (
                                <button onClick={() => handleToggleConnection(app.id)} className="px-4 py-1.5 text-sm font-semibold bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-400 dark:hover:bg-red-900/80 rounded-md">
                                    {t.disconnect}
                                </button>
                            ) : (
                                <ActionButton text={t.connect} onClick={() => handleToggleConnection(app.id)} />
                            )}
                        </div>
                    ))}
                </div>
            )}
            {activeTab === 'data' && (
              <div className="space-y-6">
                <SettingsItem title={t.improveModel} description={t.improveModelDesc} action={<ToggleSwitch enabled={improveModel} setEnabled={setImproveModel}/>} />
                <SettingsItem title={t.sharedLinks} action={<ActionButton text={t.manage} onClick={() => onNavigateToView('shared')} />} />
                <SettingsItem title={t.archivedChats} action={<ActionButton text={t.manage} onClick={() => onNavigateToView('archived')} />} />
                <SettingsItem title={t.archiveAll} action={<ActionButton text={t.archiveAll} onClick={onArchiveAll} />} />
                <SettingsItem title={t.deleteAll} action={<button onClick={onDeleteAll} className="px-4 py-1.5 text-sm font-semibold bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-400 dark:hover:bg-red-900/80 rounded-md">{t.deleteAll}</button>} />
                <SettingsItem title={t.exportData} action={<ActionButton text={t.export} onClick={onExportAll} />} />
              </div>
            )}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <SettingsItem title={t.mfa} description={t.mfaDesc} action={<ToggleSwitch enabled={mfa} setEnabled={setMfa} />} />
                <SettingsItem title={t.logOutDevice} action={<ActionButton text={t.logout} onClick={onLogout} />} />
                <SettingsItem title={t.logOutAll} description={t.logOutAllDesc} action={<ActionButton text={t.logOutAll} onClick={onLogout} />} />
              </div>
            )}
            {activeTab === 'account' && (
              <div className="space-y-6">
                  <SettingsItem title={t.getPlus} description={t.getPlusDesc} action={<ActionButton text={t.upgrade} onClick={onNavigateToPlan} />} />
                  <SettingsItem title={t.deleteAccount} action={<button onClick={() => handlePlaceholderClick(t.deleteAccount)} className="px-4 py-1.5 text-sm font-semibold bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-400 dark:hover:bg-red-900/80 rounded-md">{t.delete}</button>} />
              </div>
            )}
            {activeTab === 'help' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-2">{t.help}</h3>
                <p className="text-sm text-isocio-gray-600 dark:text-isocio-gray-400 mb-6">{t.helpGreeting}</p>
                <FAQItem question={t.q1} answer={t.a1} />
                <FAQItem question={t.q2} answer={t.a2} />
                <FAQItem question={t.q3} answer={t.a3} />
                <FAQItem question={t.q4} answer={t.a4} />
                <FAQItem question={t.q5} answer={t.a5} />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
