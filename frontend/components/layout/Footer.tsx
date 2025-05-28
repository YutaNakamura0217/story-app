
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { FOOTER_LINKS_MAIN, FOOTER_LINKS_SIMPLE } from '../../constants';
import { NavLink, RoutePath } from '../../types';

interface FooterProps {
  variant?: 'simple' | 'main';
}

const Footer: React.FC<FooterProps> = ({ variant = 'main' }) => {
  if (variant === 'simple') {
    return (
      <footer className="bg-amber-100 text-amber-700">
        <div className="container mx-auto px-10 py-8 text-center">
          <div className="flex justify-center items-center space-x-6 mb-4">
            {FOOTER_LINKS_SIMPLE.map((link: NavLink) => (
              <Link key={link.label} to={link.path as string} className="text-sm hover:text-amber-900 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-amber-600">&copy; {new Date().getFullYear()} WonderWise. All rights reserved.</p>
        </div>
      </footer>
    );
  }

  // Main Footer (styled like the reference)
  return (
    <footer className="bg-amber-800 text-amber-100 py-8 px-10 text-center">
       <div className="container mx-auto">
          {/* The reference footer is very simple, this part could be expanded if needed */}
          {/* For now, replicating the simple text and copyright from reference */}
          <p className="text-sm mb-2">
            子供たちの「なぜ？」を育む、哲学絵本の世界へようこそ。
          </p>
          <p className="text-sm">&copy; {new Date().getFullYear()} WonderWise. 無断複写・転載を禁じます。</p>
          {/* Example of more structured footer if needed in future:
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
             ... (content like old footer but with new styling) ...
          </div>
          */}
       </div>
    </footer>
  );
};

export default Footer;