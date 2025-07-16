
import React from 'react';

export const PersonalizationIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22a10 10 0 1 0-10-10" />
    <path d="M2 12h10" />
    <path d="M12 2v10" />
  </svg>
);
