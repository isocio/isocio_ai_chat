
export enum Role {
  USER = 'user',
  MODEL = 'model',
  ERROR = 'error',
}

export interface Message {
  id: string;
  role: Role;
  content: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
}
