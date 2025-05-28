
import React from 'react';
import { Link } from 'react-router-dom';
import { RoutePath } from '../../types';
import { LogoSymbol } from '../../assets/icons';

interface LogoProps {
  variant?: 'simple' | 'full';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'full', className }) => {
  return (
    <Link to={RoutePath.Home} className={`flex items-center gap-3 text-amber-900 hover:text-amber-700 transition-colors ${className}`}>
      <LogoSymbol className="h-8 w-8 sm:h-10 sm:w-10" /> {/* Color is set in LogoSymbol directly */}
      {variant === 'full' && (
        <span className="text-xl font-bold leading-tight tracking-[-0.015em]">
          WonderWise
        </span>
      )}
    </Link>
  );
};

export default Logo;