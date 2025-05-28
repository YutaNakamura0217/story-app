import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon } from '../../assets/icons';
import { RoutePath } from '../../types';
import Button from '../ui/Button';

interface SearchHeaderSectionProps {
  initialQuery: string;
  resultsCount: number;
  onSearchQueryChange: (query: string) => void; // Callback to update parent's filter state
}

const SearchHeaderSection: React.FC<SearchHeaderSectionProps> = ({ initialQuery, resultsCount, onSearchQueryChange }) => {
  const [currentQuery, setCurrentQuery] = useState(initialQuery);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (currentQuery.trim() !== initialQuery) { // Only navigate if query changed from URL
        navigate(`${RoutePath.Search}?q=${encodeURIComponent(currentQuery.trim())}`);
    }
    onSearchQueryChange(currentQuery.trim()); // Always call to re-trigger filter in parent
  };

  return (
    <section className="py-8 text-center bg-gradient-to-b from-amber-100 via-amber-50 to-transparent">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-3 tracking-tight">
          検索結果
        </h1>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-4">
          <div className="relative flex items-center">
            <input
              type="search"
              value={currentQuery}
              onChange={(e) => setCurrentQuery(e.target.value)}
              placeholder="キーワードを入力して再検索..."
              className="w-full pl-12 pr-4 py-3 text-base text-amber-900 bg-white border-2 border-amber-300 rounded-full focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors shadow-sm"
              aria-label="再検索"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="w-6 h-6 text-amber-500" />
            </div>
            <Button 
                type="submit"
                variant="primary" 
                className="absolute inset-y-0 right-0 my-1.5 mr-1.5 rounded-full !px-6"
                size="md"
            >
              検索
            </Button>
          </div>
        </form>
        <p className="text-md text-amber-700">
          {initialQuery ? (
            <>「<span className="font-semibold">{initialQuery}</span>」の検索結果: <span className="font-semibold">{resultsCount}</span> 件の絵本が見つかりました。</>
          ) : (
            <>検索キーワードを入力してください。</>
          )}
        </p>
      </div>
    </section>
  );
};

export default SearchHeaderSection;