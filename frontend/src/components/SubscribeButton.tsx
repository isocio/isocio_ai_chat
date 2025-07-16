
interface SubscribeButtonProps {
    planName: string;
}

export function SubscribeButton({ planName }: SubscribeButtonProps) {
  
  const handleSubscribe = async () => {
    // In a real application, you would make a request to YOUR OWN backend server here.
    alert(`Redirecting to checkout for ${planName}...\n\n(This is a simulation. A real app would redirect to a payment page created securely on a server.)`);
  };

  return (
    <button 
        onClick={handleSubscribe} 
        className="w-full mt-10 py-3 rounded-lg font-semibold transition-colors bg-gray-900 dark:bg-gray-100 text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
    >
      Upgrade to {planName}
    </button>
  );
}
