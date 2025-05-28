
import React from 'react';

const LanguageSelector: React.FC = () => {
  return (
    <div className="relative">
      <select 
        defaultValue="ja"
        className="bg-white text-amber-700 py-2 pl-3 pr-8 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm border border-amber-200 hover:border-amber-300 transition-colors"
        aria-label="言語を選択"
      >
        <option value="ja" className="text-amber-900">日本語</option>
        <option value="en" className="text-amber-900">English</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-amber-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSelector;