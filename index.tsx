import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import { RouterProvider } from './hooks/useRouter';
import { I18nProvider } from './contexts/I18nContext';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ThemeProvider>
        <I18nProvider>
          <RouterProvider>
            <App />
          </RouterProvider>
        </I18nProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}
