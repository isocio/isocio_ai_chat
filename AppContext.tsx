* text=auto
*.sh text eol=lf
*.bat text eol=crlf
import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import type { Theme, Language, AppContextType } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('system');
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }

    const storedLang = localStorage.getItem('language') as Language | null;
    if(storedLang) {
      setLanguage(storedLang);
    }
  }, []);

  useEffect(() => {
    const applyTheme = (t: Theme) => {
      if (t === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', systemPrefersDark);
      } else {
        document.documentElement.classList.toggle('dark', t === 'dark');
      }
      localStorage.setItem('theme', t);
    };

    applyTheme(theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('language', language);
  }, [language]);

  const contextValue = useMemo(() => ({
    theme,
    setTheme,
    language,
    setLanguage,
  }), [theme, language]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};