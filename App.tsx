import React, { useState, useEffect } from 'react';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';
import UpgradePlanPage from './pages/UpgradePlanPage';
import { useRouter, Navigate } from './hooks/useRouter';
import { useI18n } from './contexts/I18nContext';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('isLoggedIn'));
  const [userEmail, setUserEmail] = useState<string | null>(() => localStorage.getItem('userEmail'));
  const { navigate, location } = useRouter();
  const { dir } = useI18n();

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = dir === 'rtl' ? 'ar' : 'en';
  }, [dir]);

  const handleLogin = (email: string) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    setIsLoggedIn(true);
    setUserEmail(email);
    navigate('/chat');
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserEmail(null);
    navigate('/login');
  };

  if (!isLoggedIn) {
    if (location.pathname !== '/login') {
      return <Navigate to="/login" />;
    }
    return <AuthPage onLogin={handleLogin} />;
  }

  // User is logged in
  if (location.pathname === '/login') {
    return <Navigate to="/chat" />;
  }
  
  if (location.pathname.startsWith('/chat')) {
    const chatId = location.pathname.split('/chat/')[1] || null;
    return <ChatPage activeChatIdFromUrl={chatId} onLogout={handleLogout} userEmail={userEmail} />;
  }

  if (location.pathname === '/upgrade') {
    return <UpgradePlanPage />;
  }

  // Default route for logged in users
  return <Navigate to="/chat" />;
};

export default App;
