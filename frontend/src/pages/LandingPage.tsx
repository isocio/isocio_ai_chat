
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MicrosoftIcon } from '../components/icons';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => navigate('/auth');

  return (
    <div className="relative min-h-screen bg-white dark:bg-isocio-gray-950 text-isocio-gray-900 dark:text-isocio-gray-100 overflow-hidden">
      {/* Background shape */}
      <div className="absolute top-0 right-0 w-full h-full sm:w-3/4 md:w-1/2 lg:w-2/3 xl:w-1/2" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <radialGradient id="grad1" cx="100%" cy="0%" r="120%">
              <stop offset="0%" className="text-isocio-blue/30" style={{ stopColor: 'currentColor' }} />
              <stop offset="100%" className="text-isocio-blue/0" style={{ stopColor: 'currentColor' }} />
            </radialGradient>
            <radialGradient id="grad2" cx="100%" cy="20%" r="100%">
              <stop offset="0%" className="text-sky-500/30" style={{ stopColor: 'currentColor' }} />
              <stop offset="100%" className="text-sky-500/0" style={{ stopColor: 'currentColor' }} />
            </radialGradient>
             <radialGradient id="grad3" cx="120%" cy="50%" r="100%">
              <stop offset="0%" className="text-indigo-500/30" style={{ stopColor: 'currentColor' }} />
              <stop offset="100%" className="text-indigo-500/0" style={{ stopColor: 'currentColor' }} />
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill="url(#grad1)" />
          <rect width="100" height="100" fill="url(#grad2)" />
          <rect width="100" height="100" fill="url(#grad3)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <MicrosoftIcon className="w-6 h-6" />
            <span className="font-semibold text-lg text-isocio-gray-700 dark:text-isocio-gray-300">Microsoft Azure</span>
          </div>
        </header>

        <main className="flex-grow flex flex-col justify-center p-6 sm:p-8">
          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-isocio-gray-900 dark:text-isocio-gray-100">
              Design, Customize and Manage AI Apps & Agents with Azure AI Foundry
            </h1>
            <p className="mt-6 text-lg text-isocio-gray-600 dark:text-isocio-gray-300">
              Your platform for building enterprise-grade AI solutions. Harness the power of Azure OpenAI to create intelligent, scalable applications.
            </p>
            <button
              onClick={handleGetStarted}
              className="mt-12 px-8 py-3 bg-isocio-blue text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-isocio-blue focus:ring-offset-2 dark:focus:ring-offset-isocio-gray-950 transition-all"
            >
              Get Started
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
