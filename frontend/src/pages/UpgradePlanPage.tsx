
import React, { useState } from 'react';
import PricingCard from '../components/PricingCard';

interface UpgradePlanPageProps {
  onBack: () => void;
}

const UpgradePlanPage: React.FC<UpgradePlanPageProps> = ({ onBack }) => {
  const [planType, setPlanType] = useState('personal');

  const plans = {
    personal: [
      {
        planName: 'Free',
        price: 0,
        description: 'Explore how AI can help you with everyday tasks',
        features: [
          'Access to GPT-4o mini and reasoning',
          'Standard voice mode',
          'Real-time data from the web with search',
          'Limited access to GPT-4o and o4-mini',
          'Limited access to file uploads, advanced data analysis, and image generation',
          'Use custom GPTs',
        ],
        buttonText: 'Your current plan',
        isCurrent: true,
      },
      {
        planName: 'Plus',
        price: 20,
        description: 'Level up productivity and creativity with expanded access',
        features: [
          'Everything in Free',
          'Extended limits on messaging, file uploads, advanced data analysis, and image generation',
          'Standard and advanced voice mode',
          'Access to deep research, multiple reasoning models (o4-mini, o4-mini-high, and o3), and a research preview of GPT-4.5',
          'Create and use tasks, projects, and custom GPTs',
          'Limited access to Sora video generation',
          'Opportunities to test new features',
        ],
        buttonText: 'Get Plus',
        isPopular: true,
      },
      {
        planName: 'Pro',
        price: 200,
        description: 'Get the best of OpenAI with the highest level of access',
        features: [
          'Everything in Plus',
          'Unlimited access to all reasoning models and GPT-4o',
          'Unlimited access to advanced voice',
          'Extended access to deep research, which conducts multi-step online research for complex tasks',
          'Access to research previews of GPT-4.5 and Operator',
          'Access to o3 pro mode, which uses more compute for the best answers to the hardest questions',
        ],
        buttonText: 'Get Pro',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200 font-sans">
       <header className="p-4 flex justify-start">
        <button onClick={onBack} className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
          &larr; Back to Chat
        </button>
      </header>
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Upgrade your plan
          </h1>
          <div className="mt-6 flex justify-center">
            <div className="bg-gray-200 dark:bg-zinc-800 p-1 rounded-full flex items-center">
              <button
                onClick={() => setPlanType('personal')}
                className={`px-4 py-1.5 text-sm font-medium rounded-full ${
                  planType === 'personal' ? 'bg-white dark:bg-zinc-700 shadow' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                Personal
              </button>
              <button
                onClick={() => setPlanType('business')}
                className={`px-4 py-1.5 text-sm font-medium rounded-full ${
                  planType === 'business' ? 'bg-white dark:bg-zinc-700 shadow' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                Business
              </button>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3 items-start">
            {plans.personal.map((plan, index) => (
              <PricingCard
                key={index}
                planName={plan.planName}
                price={plan.price}
                description={plan.description}
                features={plan.features}
                buttonText={plan.buttonText}
                isCurrent={plan.isCurrent}
                isPopular={plan.isPopular}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UpgradePlanPage;
