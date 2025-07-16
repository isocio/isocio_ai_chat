import React from 'react';
import { Message, Role } from '../types';
import { UserIcon } from './icons/UserIcon';
import { GeminiIcon } from './icons/GeminiIcon';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
  const match = /language-(\w+)/.exec(className || '');
  return !inline && match ? (
    <SyntaxHighlighter
      style={vscDarkPlus}
      language={match[1]}
      PreTag="div"
      {...props}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};


const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLoading = false }) => {
  const isUser = message.role === Role.USER;
  const isError = message.role === Role.ERROR;

  const containerClasses = `flex items-start gap-4 my-6 ${isUser ? 'justify-end' : 'justify-start'}`;
  
  const bubbleClasses = `relative max-w-2xl px-5 py-3 rounded-2xl ${
    isUser
      ? 'rounded-br-lg ltr:rounded-br-lg rtl:rounded-bl-lg'
      : isError
      ? 'bg-red-100 text-red-800 border border-red-300 dark:bg-red-900/20 dark:text-red-400 dark:border-red-500/30'
      : 'rounded-bl-lg ltr:rounded-bl-lg rtl:rounded-br-lg'
  }`;

  const iconClasses = `flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
    isUser ? 'bg-blue-600' : 'bg-gray-200 dark:bg-zinc-700'
  }`;

  const icon = isUser ? <UserIcon /> : <GeminiIcon className="text-gray-600 dark:text-gray-300" />;

  return (
    <div className={containerClasses}>
      {!isUser && (
        <div className={iconClasses}>
          {icon}
        </div>
      )}
      <div className={bubbleClasses}>
        {isLoading && message.content === 'Thinking...' ? (
          <div className="flex items-center space-x-2">
             <span className="animate-pulse bg-gray-400 dark:bg-gray-500 rounded-full h-2 w-2"></span>
             <span className="animate-pulse delay-75 bg-gray-400 dark:bg-gray-500 rounded-full h-2 w-2"></span>
             <span className="animate-pulse delay-150 bg-gray-400 dark:bg-gray-500 rounded-full h-2 w-2"></span>
          </div>
        ) : (
          <div className="prose prose-sm md:prose-base max-w-none prose-pre:bg-gray-800 prose-pre:p-4 prose-pre:rounded-lg dark:prose-invert">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code: CodeBlock,
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
       {isUser && (
        <div className={iconClasses}>
          {icon}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
