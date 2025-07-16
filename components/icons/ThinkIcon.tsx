
import React from 'react';

export const ThinkIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2.25c-3.14 0-5.75 2.51-5.75 5.61 0 2.2 1.13 4.1 2.84 5.14V17.25h5.82v-4.25c1.71-1.04 2.84-2.94 2.84-5.14C17.75 4.76 15.14 2.25 12 2.25z" />
    <path d="M8.25 20.25h7.5" />
    <path d="M12 17.25v3" />
  </svg>
);
