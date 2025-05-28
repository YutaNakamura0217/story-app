
import React from 'react';

interface CustomButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

type ButtonProps<C extends React.ElementType> = CustomButtonProps &
  Omit<React.ComponentPropsWithoutRef<C>, keyof CustomButtonProps> & {
    as?: C;
  };

const Button = <C extends React.ElementType = 'button'>({
  as,
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  ...rest
}: ButtonProps<C>) => {
  const Component = as || 'button';

  const baseStyles = "font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150 ease-in-out inline-flex items-center justify-center";

  const variantStyles = {
    primary: 'bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500',
    secondary: 'bg-amber-100 text-amber-700 hover:bg-amber-200 focus:ring-amber-500', // Adjusted for new theme
    outline: 'border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white focus:ring-amber-500',
    ghost: 'text-amber-700 hover:bg-amber-100 focus:ring-amber-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500', // Danger remains red
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs sm:text-sm', // Adjusted for potentially smaller text like reference
    md: 'px-5 py-2.5 text-sm sm:text-base',
    lg: 'px-6 py-3 text-base sm:text-lg',
  };
  
  const effectiveDisabled = isLoading || (rest as any).disabled;
  const loadingStyles = effectiveDisabled ? 'opacity-75 cursor-not-allowed' : '';

  const { disabled: _, ...otherRest } = rest as any;

  return (
    <Component
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${loadingStyles} ${className}`}
      disabled={Component === 'button' && effectiveDisabled ? true : undefined}
      aria-disabled={effectiveDisabled ? true : undefined}
      {...otherRest} 
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        if (effectiveDisabled) {
          e.preventDefault(); 
          return;
        }
        if (typeof (otherRest as any).onClick === 'function') {
          (otherRest as any).onClick(e);
        }
      }}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {leftIcon && !isLoading && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && !isLoading && <span className="ml-2">{rightIcon}</span>}
    </Component>
  );
};

export default Button;