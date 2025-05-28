
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick, hoverEffect = false }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden border border-amber-100 
                  ${onClick ? 'cursor-pointer' : ''} 
                  ${hoverEffect ? 'transition-all duration-300 hover:shadow-xl hover:border-amber-200' : ''} 
                  ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}
export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => (
  <div className={`p-4 sm:p-6 border-b border-amber-100 ${className}`}>
    {children}
  </div>
);

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}
export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => (
  <div className={`p-4 sm:p-6 ${className}`}>
    {children}
  </div>
);

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}
export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => (
  <div className={`p-4 sm:p-6 bg-amber-50/50 border-t border-amber-100 ${className}`}>
    {children}
  </div>
);