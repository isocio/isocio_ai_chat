
export interface User {
  id: string;
  name: string;
  email: string;
  totalTokensUsed: number;
  subscriptionType: 'free' | 'pro';
  isActive: boolean;
}
