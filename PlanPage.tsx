
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CheckIcon } from '../components/icons';
import { useAppContext } from '../context/AppContext';

type TranslationKeys = {
  pageTitle: string;
  pageDescription: string;
  planFreeTitle: string;
  planPlusTitle: string;
  planProTitle: string;
  priceFree: string;
  pricePlus: string;
  pricePro: string;
  perMonth: string;
  featuresFree: string[];
  featuresPlus: string[];
  featuresPro: string[];
  currentPlan: string;
  upgradeTo: string;
  mostPopular: string;
};

const translations: { en: TranslationKeys; ar: TranslationKeys } = {
  en: {
    pageTitle: "Choose the plan that's right for you",
    pageDescription: "Unlock more powerful features and get the most out of this app.",
    planFreeTitle: "Free",
    planPlusTitle: "Plus",
    planProTitle: "Pro",
    priceFree: "$0",
    pricePlus: "$10",
    pricePro: "$20",
    perMonth: "/ month",
    featuresFree: [
      'Standard model access',
      'Limited message history',
      'Community support',
    ],
    featuresPlus: [
      'Everything in Free, plus:',
      'Access to advanced models',
      'Priority access to new features',
      'Faster response times',
    ],
    featuresPro: [
      'Everything in Plus, plus:',
      'Higher message limits',
      'Advanced data analysis tools',
      'Dedicated email support',
    ],
    currentPlan: "Your Current Plan",
    upgradeTo: "Upgrade to",
    mostPopular: "Most Popular",
  },
  ar: {
    pageTitle: "اختر الخطة المناسبة لك",
    pageDescription: "أطلق العنان لميزات أقوى واستفد من التطبيق إلى أقصى حد.",
    planFreeTitle: "مجانية",
    planPlusTitle: "بلس",
    planProTitle: "برو",
    priceFree: "٠$",
    pricePlus: "١٠$",
    pricePro: "٢٠$",
    perMonth: "/ شهرياً",
    featuresFree: [
      'وصول للنموذج القياسي',
      'سجل رسائل محدود',
      'دعم مجتمعي',
    ],
    featuresPlus: [
      'كل شيء في الخطة المجانية، بالإضافة إلى:',
      'الوصول إلى النماذج المتقدمة',
      'أولوية الوصول إلى الميزات الجديدة',
      'أوقات استجابة أسرع',
    ],
    featuresPro: [
      'كل شيء في خطة بلس، بالإضافة إلى:',
      'حدود رسائل أعلى',
      'أدوات تحليل بيانات متقدمة',
      'دعم مخصص عبر البريد الإلكتروني',
    ],
    currentPlan: "خطتك الحالية",
    upgradeTo: "الترقية إلى",
    mostPopular: "الأكثر شيوعاً",
  }
};

interface PlanPageProps {}

const PlanCard: React.FC<{
  title: string;
  price: string;
  features: string[];
  t: TranslationKeys;
  isCurrent?: boolean;
  isPopular?: boolean;
}> = ({ title, price, features, t, isCurrent = false, isPopular = false }) => {
  const buttonClasses = isCurrent
    ? 'bg-transparent border border-isocio-gray-300 dark:border-isocio-gray-600 text-isocio-gray-500 dark:text-isocio-gray-400 cursor-default'
    : 'bg-isocio-gray-900 dark:bg-isocio-gray-100 text-white dark:text-black hover:bg-isocio-gray-800 dark:hover:bg-isocio-gray-200';

  const cardClasses = `relative flex flex-col p-8 rounded-2xl border ${isPopular ? 'border-isocio-blue' : 'border-isocio-gray-200 dark:border-isocio-gray-700'}`;

  return (
    <div className={cardClasses}>
      {isPopular && (
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
            <span className="px-3 py-1 text-sm font-semibold text-isocio-blue bg-isocio-blue/10 rounded-full">{t.mostPopular}</span>
        </div>
      )}
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-4 text-4xl font-bold tracking-tight">
        {price}
        <span className="text-base font-normal text-isocio-gray-500 dark:text-isocio-gray-400">{t.perMonth}</span>
      </p>
      <ul role="list" className="mt-8 space-y-4 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <CheckIcon className="w-5 h-5 text-isocio-blue" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button className={`w-full mt-10 py-3 rounded-lg font-semibold transition-colors ${buttonClasses}`}>
        {isCurrent ? t.currentPlan : `${t.upgradeTo} ${title}`}
      </button>
    </div>
  );
};

const PlanPage: React.FC<PlanPageProps> = () => {
  const { language } = useAppContext();
  const t = translations[language];
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-start p-4 border-b border-isocio-gray-200 dark:border-isocio-gray-800 flex-shrink-0">
        <button onClick={handleBack} className="p-2 rounded-md hover:bg-isocio-gray-100 dark:hover:bg-isocio-gray-800">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
      </header>
      <main className="flex-grow overflow-y-auto p-6 md:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              {t.pageTitle}
            </h1>
            <p className="mt-4 text-lg text-isocio-gray-600 dark:text-isocio-gray-400 max-w-2xl mx-auto">
              {t.pageDescription}
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PlanCard
              title={t.planFreeTitle}
              price={t.priceFree}
              features={t.featuresFree}
              t={t}
              isCurrent={true}
            />
            <PlanCard
              title={t.planPlusTitle}
              price={t.pricePlus}
              features={t.featuresPlus}
              t={t}
              isPopular={true}
            />
            <PlanCard
              title={t.planProTitle}
              price={t.pricePro}
              features={t.featuresPro}
              t={t}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlanPage;
