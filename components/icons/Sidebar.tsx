
import React from 'react';
import { ChatSession } from '../types';
import { EditIcon } from './icons/EditIcon';
import { ChatIcon } from './icons/ChatIcon';

interface SidebarProps {
  isOpen: boolean;
  chatSessions: ChatSession[];
  activeChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onOpenSettings: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  chatSessions,
  activeChatId,
  onNewChat,
  onSelectChat,
  onOpenSettings,
}) => {
  return (
    <aside className={`bg-zinc-900 flex flex-col border-r border-zinc-800 transition-all duration-300 ${isOpen ? 'w-[260px]' : 'w-20'} p-2`}>
      <div className="flex-shrink-0">
        <button
          onClick={onNewChat}
          className={`flex items-center gap-3 w-full p-3 rounded-lg text-left text-sm font-medium text-gray-200 hover:bg-zinc-800 transition-colors ${!isOpen && 'justify-center'}`}
        >
          <EditIcon />
          {isOpen && <span className="truncate">New Chat</span>}
        </button>
      </div>
      <div className="flex-grow overflow-y-auto mt-2 space-y-1">
        <nav>
          {chatSessions.map((session) => (
            <a
              key={session.id}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelectChat(session.id);
              }}
              title={isOpen ? undefined : session.title}
              className={`flex items-center gap-3 p-3 rounded-lg text-left text-sm truncate transition-colors ${
                activeChatId === session.id
                  ? 'bg-zinc-800 text-white font-medium'
                  : 'text-gray-400 hover:bg-zinc-800/50'
              } ${!isOpen && 'justify-center'}`}
            >
              {!isOpen && <ChatIcon />}
              {isOpen && <span className="truncate flex-1">{session.title}</span>}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex-shrink-0 border-t border-zinc-700 pt-2">
        <button
          onClick={onOpenSettings}
          className={`flex items-center gap-3 w-full p-2 rounded-lg text-left text-sm font-medium text-gray-200 hover:bg-zinc-800 transition-colors ${!isOpen && 'justify-center'}`}
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
            MN
          </div>
          {isOpen && <span className="truncate flex-1">My Name</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
