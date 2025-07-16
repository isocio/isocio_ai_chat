
import React, { useState } from 'react';
import { CloseIcon } from './icons/CloseIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { BellIcon } from './icons/BellIcon';
import { PersonalizationIcon } from './icons/PersonalizationIcon';
import { ConnectedAppsIcon } from './icons/ConnectedAppsIcon';
import { DataControlsIcon } from './icons/DataControlsIcon';
import { SecurityIcon } from './icons/SecurityIcon';
import { AccountIcon } from './icons/AccountIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { PlayIcon } from './icons/PlayIcon';
import { InfoIcon } from './icons/InfoIcon';
import { CheckIcon } from './icons/CheckIcon';
import { GoogleDriveIcon } from './icons/GoogleDriveIcon';
import { OneDriveIcon } from './icons/OneDriveIcon';
import ToggleSwitch from './ToggleSwitch';
import { useTheme } from '../contexts/ThemeContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestLogout?: () => void;
  onNavigateToUpgrade?: () => void;
}

// General Settings Panel
const GeneralSettingsPanel = () => {
    const { theme, setTheme } = useTheme();
    const [language, setLanguage] = useState('en');
    const [spokenLanguage, setSpokenLanguage] = useState('auto');
    const [voice, setVoice] = useState('arbor');
    const [showSuggestions, setShowSuggestions] = useState(true);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Theme</span>
                <div className="relative">
                    <select value={theme} onChange={e => setTheme(e.target.value as any)} className="appearance-none bg-gray-100 dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 rounded-md py-1 pl-3 pr-8 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="system">System</option>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                    <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                </div>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Language</span>
                <div className="relative">
                    <select 
                        value={language} 
                        onChange={e => setLanguage(e.target.value)} 
                        className="appearance-none bg-white dark:bg-zinc-800 border-2 border-gray-200 dark:border-zinc-600 rounded-md py-1 pl-3 pr-8 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:border-blue-500"
                    >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="ar">العربية</option>
                    </select>
                     <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                </div>
            </div>
             <div className="border-t border-gray-200 dark:border-zinc-600"></div>
             <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="spoken-language" className="text-sm text-gray-700 dark:text-gray-300">Spoken language</label>
                     <div className="relative">
                        <select id="spoken-language" value={spokenLanguage} onChange={e => setSpokenLanguage(e.target.value)} className="appearance-none bg-gray-100 dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 rounded-md py-1 pl-3 pr-8 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="auto">Auto-detect</option>
                            <option value="en-US">English (US)</option>
                            <option value="en-GB">English (UK)</option>
                        </select>
                         <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                    </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-sm">For best results, select the language you mainly speak. If it's not listed, it may still be supported via auto-detection.</p>
             </div>
             <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Voice</span>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-zinc-700 px-2 py-1 rounded-md">
                        <PlayIcon className="w-4 h-4" />
                        Play
                    </button>
                    <div className="relative">
                        <select value={voice} onChange={e => setVoice(e.target.value)} className="appearance-none bg-gray-100 dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 rounded-md py-1 pl-3 pr-8 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="arbor">Arbor</option>
                            <option value="birch">Birch</option>
                            <option value="cedar">Cedar</option>
                        </select>
                        <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>
             <div className="border-t border-gray-200 dark:border-zinc-600"></div>
            <div className="flex items-center justify-between">
                <label htmlFor="suggestions-toggle" className="text-sm text-gray-700 dark:text-gray-300">Show follow up suggestions in chats</label>
                <ToggleSwitch id="suggestions-toggle" checked={showSuggestions} onChange={setShowSuggestions} />
            </div>
        </div>
    );
};

// Personalization Panel
const PersonalizationPanel = () => {
    const [memoryOn, setMemoryOn] = useState(false);
    return (
        <div className="space-y-4">
            <button className="flex items-center justify-between w-full p-3 -m-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700">
                <span className="text-sm text-gray-700 dark:text-gray-300">Custom instructions</span>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">On</span>
                    <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                </div>
            </button>
            <div className="border-t border-gray-200 dark:border-zinc-600"></div>
            <div className="pt-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                         <span className="text-sm text-gray-700 dark:text-gray-300">Memory</span>
                         <InfoIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </div>
                    <ToggleSwitch checked={memoryOn} onChange={setMemoryOn} />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Let ChatGPT save and use memories when responding.</p>
            </div>
             <button className="flex items-center justify-between w-full p-3 -m-3 mt-4 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700">
                <span className="text-sm text-gray-700 dark:text-gray-300">Manage memories</span>
                <div className="flex items-center gap-2">
                     <span className="px-2 py-1 text-xs font-medium bg-gray-200 dark:bg-zinc-600 text-gray-700 dark:text-gray-200 rounded-md">Manage</span>
                </div>
            </button>
        </div>
    );
};

// Connected Apps Panel
const ConnectedAppsPanel = () => (
    <div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">These apps will allow you to add files to ChatGPT messages.</p>
        <div className="space-y-4">
            <div className="flex items-center">
                <GoogleDriveIcon className="w-8 h-8 mr-4"/>
                <div className="flex-grow">
                    <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">Google Drive</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Upload Google Docs, Sheets, Slides and other files.</p>
                </div>
                <button className="text-sm font-semibold text-gray-800 dark:text-gray-200 bg-white dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 rounded-md px-4 py-1.5 hover:bg-gray-50 dark:hover:bg-zinc-600">Connect</button>
            </div>
            <div className="flex items-center">
                <OneDriveIcon className="w-8 h-8 mr-4"/>
                <div className="flex-grow">
                    <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">Microsoft OneDrive (personal)</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Upload Microsoft Word, Excel, PowerPoint and other files.</p>
                </div>
                <button className="text-sm font-semibold text-gray-800 dark:text-gray-200 bg-white dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 rounded-md px-4 py-1.5 hover:bg-gray-50 dark:hover:bg-zinc-600">Connect</button>
            </div>
             <div className="flex items-center">
                <OneDriveIcon className="w-8 h-8 mr-4"/>
                <div className="flex-grow">
                    <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">Microsoft OneDrive (work/school)</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Upload Microsoft Word, Excel, PowerPoint, and other files, including those from SharePoint sites.</p>
                </div>
                <button className="text-sm font-semibold text-gray-800 dark:text-gray-200 bg-white dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 rounded-md px-4 py-1.5 hover:bg-gray-50 dark:hover:bg-zinc-600">Connect</button>
            </div>
        </div>
    </div>
);

// Data Controls Panel
const DataControlsPanel = () => (
    <div className="space-y-2">
        <button className="flex items-center justify-between w-full p-3 -m-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700">
            <span className="text-sm text-gray-700 dark:text-gray-300">Improve the model for everyone</span>
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Off</span>
                <ChevronRightIcon className="w-4 h-4 text-gray-400" />
            </div>
        </button>
        <div className="border-t border-gray-200 dark:border-zinc-600 my-2"></div>
        <button className="flex items-center justify-between w-full p-3 -m-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700">
            <span className="text-sm text-gray-700 dark:text-gray-300">Shared links</span>
            <span className="px-2 py-1 text-xs font-medium bg-gray-200 dark:bg-zinc-600 text-gray-700 dark:text-gray-200 rounded-md">Manage</span>
        </button>
        <button className="flex items-center justify-between w-full p-3 -m-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700">
            <span className="text-sm text-gray-700 dark:text-gray-300">Archived chats</span>
            <span className="px-2 py-1 text-xs font-medium bg-gray-200 dark:bg-zinc-600 text-gray-700 dark:text-gray-200 rounded-md">Manage</span>
        </button>
        <div className="border-t border-gray-200 dark:border-zinc-600 my-2"></div>
         <button className="flex items-center justify-between w-full p-3 -m-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700">
            <span className="text-sm text-gray-700 dark:text-gray-300">Archive all chats</span>
            <span className="px-3 py-1.5 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-white dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-600">Archive all</span>
        </button>
         <button className="flex items-center justify-between w-full p-3 -m-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700">
            <span className="text-sm text-red-600 dark:text-red-500">Delete all chats</span>
            <span className="px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-50 border-red-200 rounded-md hover:bg-red-100 dark:text-red-300 dark:bg-red-500/10 dark:border-red-500/20 dark:hover:bg-red-500/20">Delete all</span>
        </button>
        <div className="border-t border-gray-200 dark:border-zinc-600 my-2"></div>
        <button className="flex items-center justify-between w-full p-3 -m-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700">
            <span className="text-sm text-gray-700 dark:text-gray-300">Export data</span>
            <span className="px-3 py-1.5 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-white dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-600">Export</span>
        </button>
    </div>
);

// Security Panel
const SecurityPanel: React.FC<{ onRequestLogout?: () => void }> = ({ onRequestLogout }) => {
    const [mfa, setMfa] = useState(false);
    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between">
                <div>
                    <label htmlFor="mfa-toggle" className="text-sm text-gray-700 dark:text-gray-300 font-medium">Multi-factor authentication</label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-sm">Require an extra security challenge when logging in. If you are unable to pass this challenge, you will have the option to recover your account via email.</p>
                </div>
                <ToggleSwitch id="mfa-toggle" checked={mfa} onChange={setMfa} />
            </div>
            <div className="border-t border-gray-200 dark:border-zinc-600"></div>
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Log out of this device</span>
                <button onClick={onRequestLogout} className="text-sm font-semibold text-gray-800 dark:text-gray-200 bg-white dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 rounded-md px-4 py-1.5 hover:bg-gray-50 dark:hover:bg-zinc-600">Log out</button>
            </div>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Log out of all devices</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-sm">Log out of all active sessions across all devices, including your current session. It may take up to 30 minutes for other devices to be logged out.</p>
                </div>
                <button onClick={onRequestLogout} className="text-sm font-semibold text-red-700 bg-red-50 border border-red-200 rounded-md px-4 py-1.5 hover:bg-red-100 dark:text-red-300 dark:bg-red-500/10 dark:border-red-500/20 dark:hover:bg-red-500/20 whitespace-nowrap">Log out all</button>
            </div>
            <div className="border-t border-gray-200 dark:border-zinc-600"></div>
            <div>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">Secure sign in with ChatGPT</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Sign in to websites and apps across the internet with the trusted security of ChatGPT. <a href="#" className="text-blue-600 dark:text-blue-400">Learn more</a></p>
                <div className="mt-4 p-4 text-center bg-gray-50 dark:bg-zinc-700/50 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">You haven't used ChatGPT to sign into any websites or apps yet. Once you do, they'll show up here.</p>
                </div>
            </div>
        </div>
    );
};

// Account Panel
const AccountPanel: React.FC<{ onNavigateToUpgrade?: () => void }> = ({ onNavigateToUpgrade }) => (
    <div className="space-y-8">
        <div>
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Get ChatGPT Plus</span>
                <button onClick={onNavigateToUpgrade} className="text-sm font-semibold text-white bg-black dark:text-black dark:bg-white rounded-md px-4 py-1.5 hover:bg-gray-800 dark:hover:bg-gray-200">Upgrade</button>
            </div>
            <div className="mt-4 p-4 border border-gray-200 dark:border-zinc-600 rounded-lg">
                <p className="font-semibold text-gray-800 dark:text-gray-200">Get everything in Free, and more.</p>
                <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-2"><CheckIcon className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" /><span>Extended limits on messaging, file uploads, advanced data analysis, and image generation</span></li>
                    <li className="flex items-start gap-2"><CheckIcon className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" /><span>Standard and advanced voice mode</span></li>
                    <li className="flex items-start gap-2"><CheckIcon className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" /><span>Access to deep research, multiple reasoning models (o4-mini, o4-mini-high, and o2), and a research preview of GPT-4.5</span></li>
                    <li className="flex items-start gap-2"><CheckIcon className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" /><span>Create and use tasks, projects, and custom GPTs</span></li>
                    <li className="flex items-start gap-2"><CheckIcon className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" /><span>Limited access to Sora video generation</span></li>
                    <li className="flex items-start gap-2"><CheckIcon className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" /><span>Opportunities to test new features</span></li>
                </ul>
            </div>
        </div>
        <div className="flex items-center justify-between">
            <span className="text-sm text-red-600 dark:text-red-500">Delete account</span>
            <button className="text-sm font-semibold text-red-700 bg-red-50 border border-red-200 rounded-md px-4 py-1.5 hover:bg-red-100 dark:text-red-300 dark:bg-red-500/10 dark:border-red-500/20 dark:hover:bg-red-500/20">Delete</button>
        </div>
        <div>
            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">GPT builder profile</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Personalize your builder profile to connect with users of your GPTs. These settings apply to publicly shared GPTs.</p>
            <div className="mt-4 flex justify-end">
                <button className="text-sm font-semibold text-gray-800 dark:text-gray-200 bg-white dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 rounded-md px-4 py-1.5 hover:bg-gray-50 dark:hover:bg-zinc-600">Preview</button>
            </div>
        </div>
    </div>
);

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onRequestLogout, onNavigateToUpgrade }) => {
  const [activeTab, setActiveTab] = useState('General');

  if (!isOpen) return null;

  const menuItems = [
    { id: 'General', icon: SettingsIcon, label: 'General', title: 'Settings' },
    { id: 'Notifications', icon: BellIcon, label: 'Notifications', title: 'Notifications' },
    { id: 'Personalization', icon: PersonalizationIcon, label: 'Personalization', title: 'Customization' },
    { id: 'Connected apps', icon: ConnectedAppsIcon, label: 'Connected apps', title: 'File uploads' },
    { id: 'Data controls', icon: DataControlsIcon, label: 'Data controls', title: 'Data controls' },
    { id: 'Security', icon: SecurityIcon, label: 'Security', title: 'Security' },
    { id: 'Account', icon: AccountIcon, label: 'Account', title: 'Account' },
  ];

  const panelTitles: { [key: string]: string } = menuItems.reduce((acc, item) => {
    acc[item.id] = item.title;
    return acc;
  }, {} as { [key: string]: string });

  const renderContent = () => {
    switch (activeTab) {
        case 'General':
            return <GeneralSettingsPanel />;
        case 'Personalization':
            return <PersonalizationPanel />;
        case 'Connected apps':
            return <ConnectedAppsPanel />;
        case 'Data controls':
            return <DataControlsPanel />;
        case 'Security':
            return <SecurityPanel onRequestLogout={onRequestLogout} />;
        case 'Account':
            return <AccountPanel onNavigateToUpgrade={onNavigateToUpgrade}/>;
        case 'Notifications':
            return <div className="text-center text-gray-500 dark:text-gray-400 py-10">{activeTab} settings are not yet available.</div>;
        default:
            return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-70" onClick={onClose}>
      <div
        className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl w-full max-w-4xl flex overflow-hidden"
        style={{height: '600px'}}
        onClick={(e) => e.stopPropagation()}
      >
        <aside className="w-1/4 bg-gray-50 dark:bg-zinc-900 p-4 border-r border-gray-200 dark:border-zinc-700">
          <nav className="flex flex-col space-y-1">
            {menuItems.map(item => (
                <button 
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-3 w-full p-2 rounded-md text-left text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-gray-200 text-gray-900 dark:bg-zinc-700 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-700/50'}`}
                >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.label}</span>
                </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 flex flex-col">
          <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{panelTitles[activeTab] || 'Settings'}</h2>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700">
              <CloseIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </header>
          <div className="flex-grow p-6 overflow-y-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsModal;