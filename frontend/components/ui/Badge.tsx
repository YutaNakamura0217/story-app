
import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  colorScheme?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'gray' | 'amber';
  variant?: 'solid' | 'outline' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  colorScheme = 'gray',
  variant = 'subtle',
  size = 'md',
  className = '',
  icon,
}) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full";

  // Adjusted color schemes for amber theme
  const colorStyles = {
    solid: {
      primary: 'bg-amber-500 text-white',
      amber: 'bg-amber-500 text-white',
      secondary: 'bg-amber-700 text-white', // Darker amber for secondary solid
      success: 'bg-green-500 text-white',
      warning: 'bg-yellow-500 text-amber-900', // Original uses yellow, keep for warning
      danger: 'bg-red-500 text-white',
      info: 'bg-amber-400 text-amber-900', // Info can be a lighter amber
      gray: 'bg-gray-500 text-white',
    },
    outline: {
      primary: 'border border-amber-500 text-amber-600',
      amber: 'border border-amber-500 text-amber-600',
      secondary: 'border border-amber-700 text-amber-700',
      success: 'border border-green-500 text-green-600',
      warning: 'border border-yellow-500 text-yellow-600',
      danger: 'border border-red-500 text-red-600',
      info: 'border border-amber-400 text-amber-500',
      gray: 'border border-gray-500 text-gray-600',
    },
    subtle: {
      primary: 'bg-amber-100 text-amber-700',
      amber: 'bg-amber-100 text-amber-700',
      secondary: 'bg-amber-50 text-amber-600', // Lighter amber for subtle secondary
      success: 'bg-green-100 text-green-700',
      warning: 'bg-yellow-100 text-yellow-700', // Original uses yellow
      danger: 'bg-red-100 text-red-700',
      info: 'bg-amber-100 text-amber-600', // Subtle info with amber
      gray: 'bg-gray-100 text-gray-700',
    }
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base',
  };

  return (
    <span className={`${baseStyles} ${colorStyles[variant][colorScheme]} ${sizeStyles[size]} ${className}`}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;