import React from 'react';
import { Tools } from '@/utils';

interface AlertProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
  isVisible: boolean
}

const { cn } = Tools

const Alert: React.FC<AlertProps> = ({ 
  message, 
  type = 'error', 
  isVisible,
  onClose
}) => {

  const alertStyles = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
  };

  const iconColors = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500',
  };

  return (
    <div
      className={cn(`fixed top-4 right-4 z-50 border px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform min-w-[300px] max-w-md 
      ${alertStyles[type]}`, 
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'
    )}
      role="alert"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="block flex-1">{message}</span>
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:opacity-70 transition-opacity"
          aria-label="Close"
        >
          <svg
            className={`fill-current h-5 w-5 ${iconColors[type]}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Alert;