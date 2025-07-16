// contexts/I18nContext.tsx
import React, { createContext, useContext, ReactNode } from "react";

const I18nContext = createContext({ locale: "en", t: (key: string) => key });

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  return (
    <I18nContext.Provider value={{ locale: "en", t: (key) => key }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
