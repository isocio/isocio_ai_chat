
import React from 'react';

interface SubscribeButtonProps {
    userId: string;
    planName: string;
}

export function SubscribeButton({ userId, planName }: SubscribeButtonProps) {
  
  const handleSubscribe = async () => {
    // SECURITY NOTE: In a real application, you would make a request to YOUR OWN backend server here.
    // Your server would then securely call the Stripe API with your secret key to create a checkout session.
    // The server would return the session URL, and you would redirect the user to it.
    // Exposing Stripe secret keys on the client-side is a major security vulnerability.
    
    alert(`Redirecting to checkout for ${planName}...\n\n(This is a simulation. A real app would redirect to a Stripe checkout page created securely on a server.)`);
    
    // Example of what the server communication might look like:
    /*
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, planName })
      });
      const session = await response.json();
      if (session.url) {
        window.location.href = session.url;
      } else {
        alert('Could not create checkout session.');
      }
    } catch (error) {
      console.error("Subscription error:", error);
      alert('An error occurred during checkout.');
    }
    */
  };

  return (
    <button 
        onClick={handleSubscribe} 
        className="w-full mt-10 py-3 rounded-lg font-semibold transition-colors bg-isocio-gray-900 dark:bg-isocio-gray-100 text-white dark:text-black hover:bg-isocio-gray-800 dark:hover:bg-isocio-gray-200"
    >
      Upgrade to {planName}
    </button>
  );
}
