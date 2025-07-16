
import React from 'react';
import { ChatSession, Message } from '../types';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import { GeminiIcon } from './icons/GeminiIcon';

interface ChatViewProps {
  chatSession: ChatSession | undefined;
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  error: Message | null;
}

const ChatView: React.FC<ChatViewProps> = ({
  chatSession,
  onSendMessage,
  isLoading,
  error,
}) => {
  if (!chatSession) {
    return (
      <div className="flex-grow flex items-center justify-center bg-white dark:bg-zinc-900">
        <div className="text-center">
           <div className="w-16 h-16 flex items-center justify-center mx-auto">
            <GeminiIcon width={48} height={48} className="text-gray-400 dark:text-gray-600"/>
           </div>
          <h2 className="mt-6 text-2xl font-semibold text-gray-600 dark:text-gray-400">
            Your chat assistant
          </h2>
          <p className="text-gray-500 dark:text-gray-500 mt-1">
            Select a conversation or start a new one from the sidebar.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col bg-white dark:bg-zinc-900 overflow-hidden">
      <ChatWindow
        messages={chatSession.messages}
        isLoading={isLoading}
        error={error}
      />
      <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatView;