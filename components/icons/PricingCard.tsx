
import React from 'react';
import { CheckIcon } from './icons/CheckIcon';

interface PricingCardProps {
  planName: string;
  price: number;
  description: string;
  features: string[];
  buttonText: string;
  isCurrent?: boolean;
  isPopular?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  planName,
  price,
  description,
  features,
  buttonText,
  isCurrent = false,
  isPopular = false,
}) => {
  const cardClasses = `relative text-left p-8 rounded-2xl border bg-white dark:bg-zinc-900 ${
    isPopular ? 'border-green-500' : 'border-gray-200 dark:border-zinc-700'
  }`;

  const buttonClasses = `w-full py-3 rounded-lg text-sm font-semibold transition-colors ${
    isCurrent
      ? 'bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-gray-400 cursor-default'
      : isPopular
      ? 'bg-green-600 text-white hover:bg-green-700'
      : 'bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'
  }`;

  return (
    <div className={cardClasses}>
      {isPopular && (
        <div className="absolute top-0 right-8 -translate-y-1/2 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full border border-green-300">
          POPULAR
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{planName}</h3>
      <p className="mt-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        ${price}
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> USD/month</span>
      </p>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 h-10">{description}</p>
      <button className={buttonClasses} disabled={isCurrent}>
        {buttonText}
      </button>
      <ul className="mt-8 space-y-3 text-sm text-gray-600 dark:text-gray-300">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingCard;
