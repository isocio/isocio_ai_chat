import React, { useRef, useEffect } from 'react';
import { Message, Role } from '../types';
import ChatMessage from './ChatMessage';
import { useI18n } from '../contexts/I18nContext';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  error: Message | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading, error }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();
  const showWelcomeMessage = messages.length === 0 && !isLoading && !error;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, error]);

  return (
    <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-6">
      <div className="max-w-4xl mx-auto w-full">
         {showWelcomeMessage && (
            <div className="text-center py-16 flex flex-col items-center justify-center h-full">
              <h2 className="mt-8 text-4xl font-semibold text-gray-400 dark:text-gray-600">
                {t('welcomeMessage')}
              </h2>
            </div>
        )}
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && messages.some(m => m.id.startsWith('model-') && m.content === '') && (
          <ChatMessage
            message={{
              id: 'loading',
              role: Role.MODEL,
              content: 'Thinking...',
            }}
            isLoading={true}
          />
        )}
        {error && <ChatMessage key={error.id} message={error} />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
