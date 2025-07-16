import { useState, useCallback, useRef, useEffect } from 'react';
import { Message, Role, ChatSession } from '../types';
import { GeminiService } from '../services/geminiService';
import { Chat, Content } from '@google/genai';
import { useI18n } from '../contexts/I18nContext';

const mapMessagesToContent = (messages: Message[]): Content[] => {
  return messages
    .filter(msg => msg.role === Role.USER || msg.role === Role.MODEL)
    .map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));
};

const geminiService = GeminiService.getInstance();
const CHAT_CONFIG = {
  systemInstruction: 'You are a helpful and friendly AI assistant. Format your responses using markdown where appropriate, especially for code blocks, lists, and emphasis.',
};

export const useChatManager = () => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Message | null>(null);
  const chatInstances = useRef<Map<string, Chat>>(new Map());
  const { t } = useI18n();

  useEffect(() => {
    try {
      const savedSessions = localStorage.getItem('chatSessions');
      if (savedSessions) {
        const parsedSessions = JSON.parse(savedSessions);
        setChatSessions(parsedSessions);
      }
    } catch (e) {
      console.error("Failed to load sessions from localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('chatSessions', JSON.stringify(chatSessions));
    } catch (e) {
      console.error("Failed to save sessions to localStorage", e);
    }
  }, [chatSessions]);

  const getChatInstance = useCallback((sessionId: string): Chat => {
    if (chatInstances.current.has(sessionId)) {
      return chatInstances.current.get(sessionId)!;
    }
    const session = chatSessions.find(s => s.id === sessionId);
    const history = session ? mapMessagesToContent(session.messages) : [];
    const newChat = geminiService.startChat(CHAT_CONFIG, history);
    chatInstances.current.set(sessionId, newChat);
    return newChat;
  }, [chatSessions]);

  const startNewChat = useCallback(() => {
    const newChatId = `chat-${Date.now()}`;
    const newSession: ChatSession = {
      id: newChatId,
      title: t('newChat'),
      messages: [],
    };
    setChatSessions(prev => [newSession, ...prev]);
    return newSession;
  }, [t]);

  const postMessage = useCallback(async (text: string, chatId: string) => {
    setIsLoading(true);
    setError(null);

    const userMessage: Message = { id: `user-${Date.now()}`, role: Role.USER, content: text };
    const modelMessageId = `model-${Date.now()}`;

    setChatSessions(prevSessions =>
      prevSessions.map(session =>
        session.id === chatId
          ? {
              ...session,
              title: session.messages.length === 0 ? text.substring(0, 40) + (text.length > 40 ? '...' : '') : session.title,
              messages: [...session.messages, userMessage],
            }
          : session
      )
    );
    
    setChatSessions(prevSessions =>
        prevSessions.map(session =>
            session.id === chatId
            ? { ...session, messages: [...session.messages, { id: modelMessageId, role: Role.MODEL, content: '' }] }
            : session
        )
    );

    try {
      const chat = getChatInstance(chatId);
      const stream = await chat.sendMessageStream({ message: text });

      for await (const chunk of stream) {
        const chunkText = chunk.text;
        setChatSessions(prev =>
          prev.map(session =>
            session.id === chatId
              ? {
                  ...session,
                  messages: session.messages.map(msg =>
                    msg.id === modelMessageId
                      ? { ...msg, content: msg.content + chunkText }
                      : msg
                  ),
                }
              : session
          )
        );
      }
    } catch (e: any) {
      console.error('Error sending message:', e);
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        role: Role.ERROR,
        content: `${t('errorMessagePrefix')} ${e.message || ''}`,
      };
       setChatSessions(prev =>
          prev.map(session =>
            session.id === chatId
              ? { ...session, messages: session.messages.filter(msg => msg.id !== modelMessageId) }
              : session
          )
        );
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [getChatInstance, t]);

  return { chatSessions, startNewChat, postMessage, isLoading, error };
};
