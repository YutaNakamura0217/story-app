import React from 'react';
import { THEME_CATEGORIES } from '../../constants';
import { ThemeCategory } from '../../types';
import Button from '../ui/Button';

interface ThemeCategoryNavigationProps {
  activeCategory: ThemeCategory;
  onSelectCategory: (category: ThemeCategory) => void;
}

const ThemeCategoryNavigation: React.FC<ThemeCategoryNavigationProps> = ({ activeCategory, onSelectCategory }) => {
  return (
    <nav className="py-4 px-4 sm:px-6 lg:px-8 bg-amber-50 border-b border-amber-200">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {THEME_CATEGORIES.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'primary' : 'outline'}
              onClick={() => onSelectCategory(category.id)}
              className={`rounded-full !px-4 !py-2 !text-sm sm:!text-base ${activeCategory === category.id ? 'shadow-md' : 'border-amber-300 text-amber-700 hover:bg-amber-100 hover:border-amber-400'}`}
              leftIcon={category.icon ? React.cloneElement(category.icon, { className: `w-4 h-4 sm:w-5 sm:h-5 ${activeCategory === category.id ? 'text-white': 'text-amber-500'}`}) : undefined}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default ThemeCategoryNavigation;