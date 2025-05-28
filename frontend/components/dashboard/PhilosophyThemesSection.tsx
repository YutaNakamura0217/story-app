
import React from 'react';
import { MOCK_THEMES } from '../../constants';
import ThemeCard from './ThemeCard';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import { RoutePath } from '../../types';

const PhilosophyThemesSection: React.FC = () => {
  const themes = MOCK_THEMES; 

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center px-4 pb-4 pt-2">
        <h3 className="text-amber-900 text-xl sm:text-2xl font-bold leading-tight tracking-[-0.015em]">おすすめのテーマ</h3>
        <Button variant="ghost" size="sm" as={Link} to={RoutePath.Themes} className="text-amber-600 hover:text-amber-700">
          すべてのテーマを見る
        </Button>
      </div>
      <div className="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&amp;::-webkit-scrollbar]:hidden pb-4">
        <div className="flex items-stretch p-4 gap-6"> {/* p-4 to give cards space from edge when scrolling */}
          {themes.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophyThemesSection;