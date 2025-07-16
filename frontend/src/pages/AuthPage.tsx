
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleIcon, MicrosoftIcon, AppleIcon, PhoneIcon } from '../components/icons';

interface AuthPageProps {
  onLogin: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(false);

  const SocialButton: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
    <button className="w-full flex items-center justify-center p-3 border border-isocio-gray-300 dark:border-isocio-gray-600 rounded-lg hover:bg-isocio-gray-100 dark:hover:bg-isocio-gray-800 transition-colors">
      {icon}
      <span className="ms-3">{text}</span>
    </button>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-isocio-gray-50 dark:bg-isocio-gray-950 p-4">
      
      <div className="w-full max-w-sm bg-white dark:bg-isocio-gray-900 rounded-xl p-8 shadow-sm border border-isocio-gray-200 dark:border-isocio-gray-800">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Welcome back" : "Create an account"}
        </h1>
        
        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-isocio-gray-600 dark:text-isocio-gray-400 mb-2">
              Email address
            </label>
            <input 
              type="email" 
              id="email" 
              className="w-full p-3 bg-transparent border border-isocio-gray-300 dark:border-isocio-gray-600 rounded-lg focus:ring-2 focus:ring-isocio-blue focus:border-isocio-blue outline-none transition" 
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-isocio-gray-900 dark:bg-isocio-gray-100 text-white dark:text-black font-semibold p-3 rounded-lg hover:bg-isocio-gray-800 dark:hover:bg-isocio-gray-200 transition-colors"
          >
            Continue
          </button>
        </form>

        <div className="text-center my-4">
          <p className="text-sm text-isocio-gray-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-isocio-blue hover:underline">
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-isocio-gray-300 dark:border-isocio-gray-700"></div>
          <span className="flex-shrink mx-4 text-isocio-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-isocio-gray-300 dark:border-isocio-gray-700"></div>
        </div>

        <div className="space-y-3">
          <SocialButton icon={<GoogleIcon className="w-5 h-5" />} text="Continue with Google" />
          <SocialButton icon={<MicrosoftIcon className="w-5 h-5" />} text="Continue with Microsoft Account" />
          <SocialButton icon={<AppleIcon className="w-5 h-5" />} text="Continue with Apple" />
          <SocialButton icon={<PhoneIcon className="w-5 h-5" />} text="Continue with phone" />
        </div>
      </div>

      <div className="text-center mt-8 text-isocio-gray-500 text-sm">
        <Link to="/terms" className="hover:underline">Terms of use</Link>
        <span className="mx-2">|</span>
        <Link to="/privacy" className="hover:underline">Privacy policy</Link>
      </div>
    </div>
  );
};

export default AuthPage;
