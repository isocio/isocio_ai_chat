
import React from 'react';

interface ToggleSwitchProps {
    id?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ id, checked, onChange }) => {
    return (
        <button
            id={id}
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`${
                checked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-zinc-600'
            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
            <span
                aria-hidden="true"
                className={`${
                    checked ? 'translate-x-5' : 'translate-x-0'
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
        </button>
    );
};

export default ToggleSwitch;