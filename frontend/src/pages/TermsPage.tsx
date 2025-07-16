
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '../components/icons';

interface LegalPageProps {
  onBack?: () => void;
}

const TermsPage: React.FC<LegalPageProps> = ({ onBack }) => {
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
        <div className="max-w-4xl mx-auto prose dark:prose-invert">
          <h1>Terms of Use</h1>
          <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p>Welcome to this application! These terms and conditions outline the rules and regulations for the use of this application.</p>
          <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use this application if you do not agree to take all of the terms and conditions stated on this page.</p>
          
          <h2>1. Introduction</h2>
          <p>These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, accessible at this application.</p>
          <p>These Terms will be applied fully and affect to your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here. You must not use this Website if you disagree with any of these Website Standard Terms and Conditions.</p>
          
          <h2>2. Intellectual Property Rights</h2>
          <p>Other than the content you own, under these Terms, the Service and/or its licensors own all the intellectual property rights and materials contained in this Website.</p>
          <p>You are granted limited license only for purposes of viewing the material contained on this Website.</p>

          <h2>3. Restrictions</h2>
          <p>You are specifically restricted from all of the following:</p>
          <ul>
            <li>publishing any Website material in any other media;</li>
            <li>selling, sublicensing and/or otherwise commercializing any Website material;</li>
            <li>publicly performing and/or showing any Website material;</li>
            <li>using this Website in any way that is or may be damaging to this Website;</li>
            <li>using this Website in any way that impacts user access to this Website;</li>
            <li>using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;</li>
            <li>engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;</li>
            <li>using this Website to engage in any advertising or marketing.</li>
          </ul>

          <h2>4. Your Content</h2>
          <p>In these Website Standard Terms and Conditions, "Your Content" shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant the Service a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.</p>
          <p>Your Content must be your own and must not be invading any third-party's rights. The Service reserves the right to remove any of Your Content from this Website at any time without notice.</p>

          <h2>5. No warranties</h2>
          <p>This Website is provided "as is," with all faults, and the Service express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.</p>

          <h2>6. Limitation of liability</h2>
          <p>In no event shall the Service, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. The Service, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.</p>
          
          <h2>7. Entire Agreement</h2>
          <p>These Terms constitute the entire agreement between the Service and you in relation to your use of this Website, and supersede all prior agreements and understandings.</p>
        </div>
      </main>
    </div>
  );
};
export default TermsPage;
