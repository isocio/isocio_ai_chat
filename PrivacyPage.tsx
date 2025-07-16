
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '../components/icons';

interface LegalPageProps {
  onBack?: () => void;
}

const PrivacyPage: React.FC<LegalPageProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const handleBack = onBack ? onBack : () => navigate(-1);

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-start p-4 border-b border-isocio-gray-200 dark:border-isocio-gray-800 flex-shrink-0 bg-white dark:bg-isocio-gray-900">
        <button onClick={handleBack} className="p-2 rounded-md hover:bg-isocio-gray-100 dark:hover:bg-isocio-gray-800">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
      </header>
      <main className="flex-grow overflow-y-auto p-6 md:p-12">
        <div className="max-w-4xl mx-auto prose">
          <h1>Privacy Policy</h1>
          <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p>"This application" ("us", "we", or "our") operates this application (the "Service").</p>
          <p>This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.</p>

          <h2>Information Collection and Use</h2>
          <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
          <h3>Types of Data Collected</h3>
          <h4>Personal Data</h4>
          <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally, identifiable information may include, but is not limited to:</p>
          <ul>
            <li>Email address</li>
            <li>Cookies and Usage Data</li>
          </ul>
          <h4>Usage Data</h4>
          <p>We may also collect information that your browser sends whenever you visit our Service or when you access the Service by or through a mobile device ("Usage Data").</p>
          
          <h2>Use of Data</h2>
          <p>The Service uses the collected data for various purposes:</p>
          <ul>
            <li>To provide and maintain the Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
            <li>To provide customer care and support</li>
            <li>To provide analysis or valuable information so that we can improve the Service</li>
            <li>To monitor the usage of the Service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>

          <h2>Security of Data</h2>
          <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
          
          <h2>Changes to This Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
          <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
          
          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us by email: contact@example.com</p>
        </div>
      </main>
    </div>
  );
};
export default PrivacyPage;
