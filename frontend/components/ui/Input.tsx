import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '../../assets/icons';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  IconComponent?: React.ElementType;
  containerClassName?: string; 
}

const Input: React.FC<InputProps> = ({ label, id, type = 'text', error, IconComponent, className = '', containerClassName, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === 'password';

  const togglePasswordVisibility = () => {
    if (isPasswordType) {
      setShowPassword(!showPassword);
    }
  };
  
  const currentType = isPasswordType && showPassword ? 'text' : type;

  return (
    <div className={`w-full ${containerClassName || ''}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-amber-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {IconComponent && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IconComponent className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          id={id}
          type={currentType}
          className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm 
            bg-white text-amber-900
            ${IconComponent ? 'pl-10' : ''}
            ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                   : 'border-amber-300 focus:ring-amber-500 focus:border-amber-500'}
            ${className}`}
          {...props}
        />
        {isPasswordType && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-amber-700"
            aria-label={showPassword ? "パスワードを隠す" : "パスワードを表示"}
          >
            {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Input;