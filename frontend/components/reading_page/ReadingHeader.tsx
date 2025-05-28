import React from 'react';
import { ChevronLeftIcon, Cog6ToothIcon } from '../../assets/icons'; // Using existing icons

interface ReadingHeaderProps {
  bookTitle: string;
  currentPage: number;
  totalPages: number;
  onBack: () => void;
  onSettings: () => void;
}

const ReadingHeader: React.FC<ReadingHeaderProps> = ({
  bookTitle,
  currentPage,
  totalPages,
  onBack,
  onSettings,
}) => {
  const progressPercent = totalPages > 0 ? (currentPage / totalPages) * 100 : 0;

  return (
    <header className="bg-gray-800/80 backdrop-blur-sm text-white p-3 shadow-md fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16">
      <button
        onClick={onBack}
        className="p-2 rounded-full hover:bg-gray-700 transition-colors"
        aria-label="書籍詳細へ戻る"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>

      <div className="flex flex-col items-center text-center max-w-[calc(100%-160px)]">
        <h1 className="text-sm font-semibold truncate" title={bookTitle}>{bookTitle}</h1>
        {totalPages > 0 && (
          <span className="text-xs text-gray-300">
            {currentPage} / {totalPages} ページ
          </span>
        )}
      </div>
        
      {/* Progress Bar (optional, could be part of the page indicator too) */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-700">
        <div 
          className="h-full bg-amber-500 transition-all duration-300" 
          style={{ width: `${progressPercent}%`}}
        ></div>
      </div> */}

      <button
        onClick={onSettings}
        className="p-2 rounded-full hover:bg-gray-700 transition-colors"
        aria-label="読書設定"
      >
        <Cog6ToothIcon className="w-6 h-6" />
      </button>
    </header>
  );
};

export default ReadingHeader;