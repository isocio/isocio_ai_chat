import React, { createContext, useContext, useState, useEffect } from 'react';

interface RouterContextType {
  location: Location;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (context === undefined) {
    throw new Error('يجب استخدام useRouter داخل RouterProvider');
  }
  return context;
};

interface RouterProviderProps {
  children: React.ReactNode;
}

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  const [location, setLocation] = useState(window.location);

  useEffect(() => {
    const handlePopState = () => {
      setLocation(window.location);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = (to: string) => {
    window.history.pushState({}, '', to);
    setLocation(new URL(to, window.location.origin));
  };

  const contextValue = {
    location,
    navigate,
  };

  return (
    <RouterContext.Provider value={contextValue}>
      {children}
    </RouterContext.Provider>
  );
};

interface NavigateProps {
  to: string;
}

export const Navigate: React.FC<NavigateProps> = ({ to }) => {
  const { navigate } = useRouter();
  React.useEffect(() => {
    navigate(to);
  }, [to, navigate]);
  return null;
};