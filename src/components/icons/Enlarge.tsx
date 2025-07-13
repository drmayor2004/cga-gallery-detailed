import React from 'react';

interface EnlargeProps {
  className?: string;
}

const Enlarge: React.FC<EnlargeProps> = ({ className = "h-6 w-6" }) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21 3a1 1 0 0 0-1-1h-4a1 1 0 0 0 0 2h1.59l-3.3 3.29a1 1 0 0 0 1.42 1.42L19 5.41V7a1 1 0 0 0 2 0V3zM3.71 3.71a1 1 0 0 0-1.42 1.42L5.59 8.41H4a1 1 0 0 0 0 2h4a1 1 0 0 0 1-1V5a1 1 0 0 0-2 0v1.59L3.71 3.71zM20.29 20.29a1 1 0 0 0 1.42-1.42L18.41 15.59H20a1 1 0 0 0 0-2h-4a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0v-1.59l3.29 3.29zM8 15H4a1 1 0 0 0 0 2h1.59l-3.3 3.29a1 1 0 0 0 1.42 1.42L7 18.41V20a1 1 0 0 0 2 0v-4a1 1 0 0 0-1-1z"/>
    </svg>
  );
};

export default Enlarge;