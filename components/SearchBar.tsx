import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, placeholder = "Search for books, authors, or genres" }) => {
  return (
    <div className="px-4 py-3 mb-6">
      <label htmlFor="search-input" className="sr-only">{placeholder}</label>
      <div className="flex flex-col min-w-40 h-14 w-full">
        <div className="flex w-full flex-1 items-stretch rounded-full h-full shadow-sm border border-amber-200">
          <div className="text-slate-400 flex bg-white items-center justify-center pl-5 rounded-l-full">
            <span className="material-icons-outlined text-2xl">search</span>
          </div>
          <input
            id="search-input"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-full text-slate-900 focus:outline-0 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 border-none bg-white h-full placeholder:text-slate-400 px-4 text-base font-normal leading-normal"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="search"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
