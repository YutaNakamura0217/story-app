import React, { useState, useMemo } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageHeroSection from '../components/themes_page/PageHeroSection';
import ThemeCategoryNavigation from '../components/themes_page/ThemeCategoryNavigation';
import ThemeGridArea from '../components/themes_page/ThemeGridArea';
import { ThemeCategory } from '../types';
import { useThemes } from '../hooks/useThemes';

const ThemesPage: React.FC = () => {
  const { themes, loading } = useThemes();
  const [selectedCategory, setSelectedCategory] = useState<ThemeCategory>('all');

  const filteredThemes = useMemo(() => {
    if (selectedCategory === 'all') {
      return themes;
    }
    return themes.filter(theme => theme.category === selectedCategory);
  }, [themes, selectedCategory]);


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
          <ThemeGridArea themes={filteredThemes} isLoading={loading} />
        </div>
      </main>
      <Footer variant="main" />
    </div>
  );
};

export default ThemesPage;