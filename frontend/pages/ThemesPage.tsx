import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageHeroSection from '../components/themes_page/PageHeroSection';
import ThemeCategoryNavigation from '../components/themes_page/ThemeCategoryNavigation';
import ThemeGridArea from '../components/themes_page/ThemeGridArea';
import { PhilosophyTheme, ThemeCategory } from '../types';
import { MOCK_THEMES }  from '../constants';

const ThemesPage: React.FC = () => {
  const [allThemes] = useState<PhilosophyTheme[]>(MOCK_THEMES);
  const [selectedCategory, setSelectedCategory] = useState<ThemeCategory>('all');
  const [isLoading, setIsLoading] = useState(false);

  const filteredThemes = useMemo(() => {
    setIsLoading(true); 
    if (selectedCategory === 'all') {
      return allThemes;
    }
    return allThemes.filter(theme => theme.category === selectedCategory);
  }, [allThemes, selectedCategory]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300); // Short delay to show loading state
    return () => clearTimeout(timer);
  }, [selectedCategory]);


  const handleSelectCategory = (category: ThemeCategory) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      <Header variant="main" />
      <main className="flex-grow">
        <PageHeroSection />
        <ThemeCategoryNavigation 
          activeCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
        <div className="container mx-auto max-w-screen-xl">
          <ThemeGridArea themes={filteredThemes} isLoading={isLoading} />
        </div>
      </main>
      <Footer variant="main" />
    </div>
  );
};

export default ThemesPage;