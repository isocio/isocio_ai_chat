import React from 'react';
import { MicrosoftIcon, LinkedInIcon } from '../components/icons';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="relative min-h-screen bg-white dark:bg-brand-gray-950 text-brand-gray-900 dark:text-brand-gray-100 overflow-hidden">
      {/* Background shape */}
      <div className="absolute top-0 right-0 w-full h-full sm:w-3/4 md:w-1/2 lg:w-2/3 xl:w-1/2" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <radialGradient id="grad1" cx="100%" cy="0%" r="120%">
              <stop offset="0%" style={{ stopColor: 'rgba(255, 99, 71, 0.3)' }} />
              <stop offset="100%" style={{ stopColor: 'rgba(255, 99, 71, 0)' }} />
            </radialGradient>
            <radialGradient id="grad2" cx="100%" cy="20%" r="100%">
              <stop offset="0%" style={{ stopColor: 'rgba(30, 144, 255, 0.4)' }} />
              <stop offset="100%" style={{ stopColor: 'rgba(30, 144, 255, 0)' }} />
            </radialGradient>
             <radialGradient id="grad3" cx="120%" cy="50%" r="100%">
              <stop offset="0%" style={{ stopColor: 'rgba(199, 21, 133, 0.35)' }} />
              <stop offset="100%" style={{ stopColor: 'rgba(199, 21, 133, 0)' }} />
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
            <span className="font-semibold text-lg text-brand-gray-700 dark:text-brand-gray-300">Microsoft Azure</span>
          </div>
        </header>

        <main className="flex-grow flex flex-col justify-center p-6 sm:p-8">
          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-brand-gray-900 dark:text-brand-gray-100">
              Design, Customize and Manage AI Apps & Agents with Azure AI Foundry
            </h1>
            <div className="mt-8 space-y-1 text-base sm:text-lg text-brand-gray-600 dark:text-brand-gray-300">
              <p>Sridhar Arrabelly,</p>
              <p>Technology Leader, Microsoft AI</p>
              <p>sarrabelly@microsoft.com</p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <LinkedInIcon className="w-5 h-5 text-[#0077B5]" />
              <a href="https://www.linkedin.com/in/sridhararrabelly" target="_blank" rel="noopener noreferrer" className="text-sm text-[#0077B5] hover:underline">
                www.linkedin.com/in/sridhararrabelly
              </a>
            </div>
            <p className="mt-8 text-brand-gray-500">May 16th, 2025</p>
            <button
              onClick={onGetStarted}
              className="mt-12 px-8 py-3 bg-brand-blue text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 dark:focus:ring-offset-brand-gray-950 transition-all"
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