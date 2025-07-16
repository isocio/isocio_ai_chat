import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { SubmitIcon } from './icons/SubmitIcon';
import { PlusIcon } from './icons/PlusIcon';
import { MicrophoneIcon } from './icons/MicrophoneIcon';
import { FileIcon } from './icons/FileIcon';
import { AppsIcon } from './icons/AppsIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { ToolsIcon } from './icons/ToolsIcon';
import { ThinkIcon } from './icons/ThinkIcon';
import { ResearchIcon } from './icons/ResearchIcon';
import { ImageIcon } from './icons/ImageIcon';
import { WebSearchIcon } from './icons/WebSearchIcon';
import { WriteCodeIcon } from './icons/WriteCodeIcon';
import { useI18n } from '../contexts/I18nContext';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');
  const [isAttachPopoverOpen, setIsAttachPopoverOpen] = useState(false);
  const [isToolsPopoverOpen, setIsToolsPopoverOpen] = useState(false);
  const { t } = useI18n();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const attachPopoverRef = useRef<HTMLDivElement>(null);
  const attachButtonRef = useRef<HTMLButtonElement>(null);
  const toolsPopoverRef = useRef<HTMLDivElement>(null);
  const toolsButtonRef = useRef<HTMLButtonElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      const el = textareaRef.current;
      el.style.height = 'auto';
      const maxHeight = 200;
      if (el.scrollHeight > maxHeight) {
        el.style.height = `${maxHeight}px`;
        el.style.overflowY = 'auto';
      } else {
        el.style.height = `${el.scrollHeight}px`;
        el.style.overflowY = 'hidden';
      }
    }
  }, [text]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        attachPopoverRef.current &&
        !attachPopoverRef.current.contains(event.target as Node) &&
        attachButtonRef.current &&
        !attachButtonRef.current.contains(event.target as Node)
      ) {
        setIsAttachPopoverOpen(false);
      }
       if (
        toolsPopoverRef.current &&
        !toolsPopoverRef.current.contains(event.target as Node) &&
        toolsButtonRef.current &&
        !toolsButtonRef.current.contains(event.target as Node)
      ) {
        setIsToolsPopoverOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = () => {
    if (text.trim() && !isLoading) {
      onSendMessage(text);
      setText('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      console.log('File selected:', event.target.files[0].name);
      // Handle file upload logic here
      setIsAttachPopoverOpen(false);
    }
  };
  
  const handleToolSelect = (toolName: string) => {
    console.log(`${toolName} selected`);
    setIsToolsPopoverOpen(false);
  };

  const toolItems = [
    { name: t('toolThinkLonger'), icon: ThinkIcon },
    { name: t('toolDeepResearch'), icon: ResearchIcon },
    { name: t('toolCreateImage'), icon: ImageIcon },
    { name: t('toolSearchWeb'), icon: WebSearchIcon },
    { name: t('toolWriteCode'), icon: WriteCodeIcon },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 p-4 border-t border-gray-200 dark:border-zinc-700">
      <div className="max-w-4xl mx-auto">
        <div className="relative flex w-full border border-gray-300 dark:border-zinc-600 rounded-2xl p-2 items-end bg-gray-50 dark:bg-zinc-800">
          <div className="relative">
            <button
              ref={attachButtonRef}
              onClick={() => { setIsAttachPopoverOpen(prev => !prev); setIsToolsPopoverOpen(false); }}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              aria-label={t('attachFile')}
            >
              <PlusIcon />
            </button>
            {isAttachPopoverOpen && (
              <div ref={attachPopoverRef} className="absolute bottom-full mb-2 w-64 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700 overflow-hidden">
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-3 w-full px-4 py-3 text-start text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
                >
                    <FileIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span className="flex-1">{t('addPhotosAndFiles')}</span>
                </button>
                <button className="flex items-center gap-3 w-full px-4 py-3 text-start text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700">
                    <AppsIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span className="flex-1">{t('addFromApps')}</span>
                    <ChevronRightIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                </button>
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
          </div>
          <div className="relative">
             <button
                ref={toolsButtonRef}
                onClick={() => { setIsToolsPopoverOpen(prev => !prev); setIsAttachPopoverOpen(false); }}
                className="flex items-center gap-2 p-2 text-gray-600 dark:text-gray-300 bg-white dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-600"
                aria-label={t('selectTool')}
            >
                <ToolsIcon />
                <span className="text-sm font-medium">{t('tools')}</span>
            </button>
            {isToolsPopoverOpen && (
                 <div ref={toolsPopoverRef} className="absolute bottom-full mb-2 w-64 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700 overflow-hidden">
                    {toolItems.map((tool) => (
                        <button
                            key={tool.name}
                            onClick={() => handleToolSelect(tool.name)}
                            className="flex items-center gap-3 w-full px-4 py-3 text-start text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
                        >
                            <tool.icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            <span className="flex-1">{tool.name}</span>
                        </button>
                    ))}
                </div>
            )}
          </div>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('askAnything')}
            rows={1}
            className="flex-1 bg-transparent text-gray-800 dark:text-gray-200 p-2 resize-none focus:outline-none transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
            disabled={isLoading}
          />
          <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200" aria-label={t('useMicrophone')}>
            <MicrophoneIcon />
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !text.trim()}
            className="p-2 w-8 h-8 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            aria-label={t('sendMessage')}
          >
            <SubmitIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
