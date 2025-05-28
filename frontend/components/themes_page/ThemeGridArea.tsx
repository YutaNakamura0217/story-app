import React from 'react';
import { PhilosophyTheme } from '../../types';
import ThemesPageThemeCard from './ThemeCard'; // Use the new ThemeCard
import { SparklesIcon } from '../../assets/icons'; // Placeholder icon

interface ThemeGridAreaProps {
  themes: PhilosophyTheme[];
  isLoading: boolean;
}

const ThemeGridArea: React.FC<ThemeGridAreaProps> = ({ themes, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-amber-700 text-lg">テーマを読み込んでいます...</p>
      </div>
    );
  }

  if (themes.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <SparklesIcon className="w-24 h-24 text-amber-300 mx-auto mb-6" />
        <h3 className="text-2xl font-semibold text-amber-800 mb-2">テーマが見つかりませんでした</h3>
        <p className="text-amber-700">
          選択したカテゴリに該当するテーマは現在ありません。
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 py-8 px-4 sm:px-6 lg:px-8">
      {themes.map((theme) => (
        <ThemesPageThemeCard key={theme.id} theme={theme} />
      ))}
    </div>
  );
};

export default ThemeGridArea;