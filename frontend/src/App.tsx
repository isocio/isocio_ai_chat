
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';
// import PlanPage from './pages/PlanPage'; // Removed due to missing module
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import AdminDashboard from './pages/AdminDashboard';

const App: React.FC = () => {
  // In a real app, this would be determined by a token, cookie, etc.
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    // Also clear any session storage if needed
    setIsAuthenticated(false);
  }

  return (
    <AppProvider>
      <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200">
        <BrowserRouter>
          <Routes>
            {isAuthenticated ? (
              <Route path="/" element={<AuthenticatedLayout />}>
                <Route index element={<Navigate to="/chat" replace />} />
                <Route path="chat" element={<ChatPage onLogout={handleLogout} />} />
                <Route path="chat/:chatId" element={<ChatPage onLogout={handleLogout} />} />
                {/* <Route path="plan" element={<PlanPage />} /> */}
                <Route path="admin" element={<AdminDashboard />} />
                <Route path="terms" element={<TermsPage />} />
                <Route path="privacy" element={<PrivacyPage />} />
                <Route path="*" element={<Navigate to="/chat" replace />} />
              </Route>
            ) : (
              <>
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth" element={<AuthPage onLogin={handleLogin} />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </div>
    </AppProvider>
  );
};

// This is a placeholder for a real layout component structure.
const AuthenticatedLayout: React.FC = () => {
    return <Outlet />;
};

export default App;
