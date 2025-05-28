import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import LanguageSelector from './LanguageSelector';
import Button from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { NavLink as NavLinkType, RoutePath } from '../../types';
import { MAIN_NAVIGATION_LINKS, USER_PROFILE_LINKS } from '../../constants';
import { SearchIcon, NotificationIcon, ChevronDownIcon, LogoutIcon, MenuIcon, XIcon, UserCircleIcon as ProfileIconFallback } from '../../assets/icons';
import Avatar from '../ui/Avatar';


interface HeaderProps {
  variant?: 'simple' | 'main';
}

const Header: React.FC<HeaderProps> = ({ variant = 'main' }) => {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate(RoutePath.Login);
  };
  
  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${RoutePath.Search}?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Clear search bar after navigation if desired
      setMobileMenuOpen(false); // Close mobile menu if open
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && !((event.target as HTMLElement).closest('#mobile-menu-button'))) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  if (variant === 'simple') {
    return (
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-solid border-amber-200">
        <div className="container mx-auto px-10">
          <div className="flex items-center justify-between h-16">
            <Logo variant="full" />
            <LanguageSelector />
          </div>
        </div>
      </header>
    );
  }

  // Main Header from reference
  return (
    <header className="bg-white whitespace-nowrap border-b border-solid border-amber-200 px-4 sm:px-10 py-3 sm:py-4 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Logo variant="full" className="mr-4"/>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex flex-grow max-w-xl mr-6">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input 
              type="search" 
              placeholder="絵本やテーマを検索..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-full focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:bg-white transition-colors"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="w-5 h-5 text-amber-500" />
            </div>
          </form>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          {MAIN_NAVIGATION_LINKS.filter(link => !link.isProtected || isAuthenticated).map((link) => (
            <Link
              key={link.label}
              to={link.path as string}
              className="text-amber-700 hover:text-amber-900 text-sm font-medium leading-normal transition-colors"
            >
              {link.label}
            </Link>
          ))}
        
          {isAuthenticated && !loading && user ? (
            <>
              <button 
                aria-label="Notifications" 
                className="flex items-center justify-center rounded-full h-10 w-10 bg-amber-100 hover:bg-amber-200 text-amber-700 hover:text-amber-900 transition-colors"
              >
                <NotificationIcon className="h-5 w-5" />
              </button>
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 rounded-full hover:opacity-80 transition-opacity"
                >
                  <Avatar src={user.avatarUrl} alt={user.name || 'User'} size="md" className="border-2 border-amber-200 hover:border-amber-400 transition-colors" />
                </button>
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-amber-100 ring-opacity-5 py-1 z-50">
                    <div className="px-4 py-3">
                      <p className="text-sm font-medium text-amber-900">{user.name}</p>
                      <p className="text-xs text-amber-700 truncate">{user.email}</p>
                    </div>
                    <div className="border-t border-amber-100"></div>
                    {USER_PROFILE_LINKS.map((link) => (
                      <Link
                        key={link.label}
                        to={link.path as string}
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-amber-700 hover:bg-amber-50 hover:text-amber-900 w-full text-left transition-colors"
                      >
                        {React.isValidElement(link.icon) ? React.cloneElement(link.icon, {className: "w-5 h-5 mr-2 text-amber-500"}) : null}
                        {link.label}
                      </Link>
                    ))}
                     <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                    >
                      <LogoutIcon className="w-5 h-5 mr-2" />
                      ログアウト
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : !loading && (
            <div className="hidden md:flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => navigate(RoutePath.Login)}>ログイン</Button>
              <Button variant="primary" size="sm" onClick={() => navigate(RoutePath.Register)}>会員登録</Button>
            </div>
          )}
           {loading && <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>}
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          {isAuthenticated && !loading && user && (
             <button 
                aria-label="Notifications" 
                className="mr-2 flex items-center justify-center rounded-full h-9 w-9 bg-amber-100 hover:bg-amber-200 text-amber-700 hover:text-amber-900 transition-colors"
              >
                <NotificationIcon className="h-5 w-5" />
              </button>
          )}
          <button
            id="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-amber-700 hover:text-amber-900 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
          >
            {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 z-40 border-b border-amber-200">
          <div className="p-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input 
                type="search" 
                placeholder="絵本やテーマを検索..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-full focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:bg-white transition-colors"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="w-5 h-5 text-amber-500" />
              </div>
            </form>
          </div>
          <nav className="px-3 pt-0 pb-3 space-y-1">
            {MAIN_NAVIGATION_LINKS.filter(link => !link.isProtected || isAuthenticated).map((link) => (
              <Link
                key={`mobile-${link.label}`}
                to={link.path as string}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-amber-700 hover:bg-amber-50 hover:text-amber-900 transition-colors"
              >
                 {React.isValidElement(link.icon) ? React.cloneElement(link.icon, {className: "w-5 h-5 mr-3 text-amber-500"}) : null}
                {link.label}
              </Link>
            ))}
            <div className="border-t border-amber-100 my-2"></div>
            {isAuthenticated && user && (
              <>
                {USER_PROFILE_LINKS.map((link) => (
                  <Link
                    key={`mobile-profile-${link.label}`}
                    to={link.path as string}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-amber-700 hover:bg-amber-50 hover:text-amber-900 transition-colors"
                  >
                    {React.isValidElement(link.icon) ? React.cloneElement(link.icon, {className: "w-5 h-5 mr-3 text-amber-500"}) : <ProfileIconFallback className="w-5 h-5 mr-3 text-amber-500" />}
                    {link.label}
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                >
                  <LogoutIcon className="w-5 h-5 mr-3" />
                  ログアウト
                </button>
              </>
            )}
             {!isAuthenticated && !loading && (
                <>
                  <Button variant="outline" size="md" className="w-full my-1" onClick={() => { navigate(RoutePath.Login); setMobileMenuOpen(false); }}>ログイン</Button>
                  <Button variant="primary" size="md" className="w-full my-1" onClick={() => { navigate(RoutePath.Register); setMobileMenuOpen(false); }}>会員登録</Button>
                </>
              )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;