
import React from 'react';

interface ProgressBarProps {
  value: number; // 0-100
  colorScheme?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  labelPrefix?: string;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  colorScheme = 'amber', // Default to amber to match new theme
  size = 'md',
  showLabel = false,
  labelPrefix = '',
  className = '',
}) => {
  const clampedValue = Math.max(0, Math.min(100, value));

  const colorClasses = {
    primary: 'bg-amber-500', // Mapped to amber
    amber: 'bg-amber-500',   // New default
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500',
  };

  const sizeClasses = {
    sm: 'h-1.5', // Reference uses h-3, so md is closer
    md: 'h-3',   // Adjusted to match reference's h-3
    lg: 'h-4',
  };
  
  const trackBgColor = 'bg-amber-100'; // From reference

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-xs font-medium text-amber-700">{labelPrefix}</span>
          <span className={`text-xs font-semibold ${colorScheme === 'amber' || colorScheme === 'primary' ? 'text-amber-600' : `text-${colorScheme}-600`}`}>{clampedValue}%</span>
        </div>
      )}
      <div className={`w-full ${trackBgColor} rounded-full ${sizeClasses[size]} overflow-hidden`}>
        <div
          className={`${colorClasses[colorScheme]} ${sizeClasses[size]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedValue}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;