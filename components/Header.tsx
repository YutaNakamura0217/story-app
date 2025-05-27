import React from 'react';
import { APP_TITLE, View } from '../constants';
import { IconBell } from './icons/PhosphorIcons'; 

interface HeaderProps {
  currentView: View;
  onNavigate: (view: View, data?: any) => void;
}

const StoryTimeLogoSvg: React.FC<{ className?: string }> = ({ className = "size-8" }) => ( // Default size updated
  <div className={className}>
    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_storytime_logo_account)">
        <path 
          clipRule="evenodd" 
          d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" 
          fill="currentColor" 
          fillRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="clip0_storytime_logo_account"><rect fill="white" height="48" width="48"></rect></clipPath>
      </defs>
    </svg>
  </div>
);


const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const navLinks: { view: View; label: string }[] = [
    { view: 'home', label: 'Home' },
    { view: 'explore', label: 'Explore' }, // Renamed from Categories
    { view: 'library', label: 'My Library' },
    { view: 'account', label: 'Account' },   // New Account link
  ];

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-amber-200 px-10 py-4 bg-white shadow-sm">
      <div 
        className="flex items-center gap-4 text-amber-500 cursor-pointer" // Logo color from mockup
        onClick={() => onNavigate('home')}
        role="button"
        tabIndex={0}
        aria-label="Go to homepage"
      >
        <StoryTimeLogoSvg />
        <h2 className="text-amber-900 text-2xl font-bold leading-tight tracking-[-0.015em]">{APP_TITLE}</h2>
      </div>
      <div className="flex flex-1 justify-end items-center gap-8">
        <nav className="flex items-center gap-8"> {/* Adjusted gap for nav items */}
          {navLinks.map((link) => (
            <a
              key={link.view}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate(link.view);
              }}
              className={`text-base font-medium leading-normal transition-colors duration-200 ${
                currentView === link.view
                  ? 'nav-item-active' // Use new active class from mockup
                  : 'text-amber-600 hover:text-amber-500' // Default link colors from mockup
              }`}
              aria-current={currentView === link.view ? 'page' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button 
            aria-label="Notifications" 
            className="flex items-center justify-center rounded-full h-10 w-10 bg-amber-100 hover:bg-amber-200 text-amber-700 transition-colors"
        >
          <IconBell size={24} /> {/* Bell icon size from mockup */}
        </button>
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-white shadow-md" // Profile image style from mockup
          style={{
            backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuADPjsbvjseC3js1NPLSmy_RABtFZJIhN4af6YcEWcrIIRszRvB6S-pHpEjy_qck47ig8xJ9XrpyPICmhwZV_J7E_CIeWg060YctsH0WP83gFueRhH9DhF5W7bJthU7MQCEFAdc3DeMJwptb11HDy9jXuID74xrNHJKU_SvpFdkwDKZcw8cZSIL8ldtZj-ER_a2vBR7iqrpqjIO-mAB9ErFOToolnBP29_u7hxKE21D9IIRfIleJ-c1p2A2zWeEVu2waNc2NvFzywqs")`,
          }}
          role="img"
          aria-label="User profile picture"
        ></div>
        {/* Mobile menu button removed as per mockup */}
      </div>
    </header>
  );
};

export default Header;