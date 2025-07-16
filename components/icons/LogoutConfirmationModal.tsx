
import React from 'react';

interface LogoutConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userEmail: string | null;
}

const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  userEmail,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div
        className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl w-full max-w-sm p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Are you sure you want to log out?</h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Log out of ChatGPT as <br />
          <span className="font-medium text-gray-700 dark:text-gray-200">{userEmail}</span>
        </p>
        <div className="mt-8 space-y-3">
          <button
            onClick={onConfirm}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white"
          >
            Log out
          </button>
          <button
            onClick={onClose}
            className="w-full flex justify-center py-3 px-4 border border-gray-300 dark:border-zinc-600 rounded-md shadow-sm bg-white dark:bg-zinc-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 dark:focus:ring-zinc-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationModal;