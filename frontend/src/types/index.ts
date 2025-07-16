
export type Theme = 'light' | 'dark' | 'system';
export type Language = 'en' | 'ar';

export interface Attachment {
  name: string;
  type: 'image' | 'text' | 'document' | 'other';
  mimeType: string;
  // content will be a data URL for images, and raw text for text/document files.
  content: string;
  analysisResult?: {
    caption: string;
    text: string;
  };
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string; // The user's text prompt or the model's response
  attachments?: Attachment[];
  timestamp: string;
}

export interface ChatSession {
  id:string;
  title: string;
  messages: Message[];
  createdAt: number;
  isArchived?: boolean;
  isShared?: boolean;
}

export interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}
