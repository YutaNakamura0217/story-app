import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import CategoryPage from './components/CategoryPage';
import FavoritePage from './components/FavoritePage';
import BookDetailPage from './components/BookDetailPage';
import AccountPage from './components/AccountPage'; // New component
import Footer from './components/Footer';
import type { View } from './constants';
import type { Book } from './types';
import { APP_TITLE } from './constants';


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleNavigate = (view: View, data?: any) => {
    if (view === 'bookDetail' && data) {
      setSelectedBook(data as Book);
    } else {
      setSelectedBook(null); 
    }
    setCurrentView(view);
    window.scrollTo(0, 0); 
  };
  
  useEffect(() => {
    let title = APP_TITLE;
    switch (currentView) {
      case 'home':
        title = `Home | ${APP_TITLE}`;
        break;
      case 'explore':
        title = `Explore | ${APP_TITLE}`;
        break;
      case 'library':
        title = `My Library | ${APP_TITLE}`;
        break;
      case 'bookDetail':
        if (selectedBook) {
          title = `${selectedBook.title} | ${APP_TITLE}`;
        }
        break;
      case 'account':
        title = `Account Settings | ${APP_TITLE}`;
        break;
    }
    document.title = title;
  }, [currentView, selectedBook]);


  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <MainContent onNavigate={handleNavigate} />;
      case 'explore':
        return <CategoryPage />; 
      case 'library':
        return <FavoritePage onNavigate={handleNavigate} />;
      case 'bookDetail':
        if (selectedBook) {
          return <BookDetailPage book={selectedBook} onNavigate={handleNavigate} />;
        }
        setCurrentView('home'); 
        return <MainContent onNavigate={handleNavigate} />; 
      case 'account':
        return <AccountPage />;
      default:
        return <MainContent onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Header currentView={currentView} onNavigate={handleNavigate} />
        {/* Main content area's background will be amber-50 from body, text from body or overridden */}
        <div className="flex-1"> {/* This div will ensure main content also gets body styles by default */}
          {renderContent()}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;