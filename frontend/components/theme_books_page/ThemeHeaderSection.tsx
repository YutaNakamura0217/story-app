import React from 'react';
import { Link } from 'react-router-dom';
import { PhilosophyTheme, RoutePath } from '../../types';
import { ArrowUturnLeftIcon } from '../../assets/icons';

interface ThemeHeaderSectionProps {
  theme: PhilosophyTheme;
}

const ThemeHeaderSection: React.FC<ThemeHeaderSectionProps> = ({ theme }) => {
  const coverImage = theme.coverImageUrl || `https://picsum.photos/seed/${theme.id}/1200/300`; // Placeholder for a banner

  return (
    <section className="bg-amber-100 py-8 md:py-12 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${coverImage})`}}
      ></div>
      <div className="container mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 relative z-10">
        <Link 
          to={RoutePath.Themes} 
          className="inline-flex items-center text-sm text-amber-600 hover:text-amber-800 mb-4 transition-colors group"
        >
          <ArrowUturnLeftIcon className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" />
          テーマ一覧へ戻る
        </Link>
        
        <div className="flex flex-col md:flex-row items-center text-center md:text-left">
          {theme.iconElement && (
            React.cloneElement(theme.iconElement, { className: "w-16 h-16 md:w-24 md:h-24 text-amber-500 mb-4 md:mb-0 md:mr-6 shrink-0" })
          )}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2 tracking-tight">
              {theme.name}
            </h1>
            <p className="text-amber-700 leading-relaxed max-w-2xl mx-auto md:mx-0">
              {theme.description || 'このテーマに関連する絵本を探求しましょう。'}
            </p>
            {theme.question && (
                 <p className="text-sm text-amber-600 mt-2 italic">
                    考えてみよう: 「{theme.question}」
                 </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThemeHeaderSection;