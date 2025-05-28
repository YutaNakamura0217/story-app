import React from 'react';
import Select from '../ui/Select';
import { BookFilters, BookSortOption, SelectOption } from '../../types';
import { MOCK_THEMES } from '../../constants'; // For theme filter options
import { SparklesIcon } from '../../assets/icons';

interface FavoritesFilterAndSortProps {
  filters: Pick<BookFilters, 'themeId' | 'minAge' | 'maxAge'>; // Simplified filters for favorites
  onFilterChange: (filters: Partial<Pick<BookFilters, 'themeId' | 'minAge' | 'maxAge'>>) => void;
  sortOption: BookSortOption;
  onSortChange: (sortOption: BookSortOption) => void;
  totalItems: number;
}

const FilterAndSortSection: React.FC<FavoritesFilterAndSortProps> = ({
  filters,
  onFilterChange,
  sortOption,
  onSortChange,
  totalItems,
}) => {
  const themeOptions: SelectOption[] = [
    { value: '', label: 'すべてのテーマ' },
    ...MOCK_THEMES.map(theme => ({ value: theme.id, label: theme.name })),
  ];

  const sortOptions: SelectOption[] = [
    // Customize sort options for favorites, e.g., "Date Added" could be mocked
    { value: BookSortOption.TitleAsc, label: 'タイトル昇順' },
    { value: BookSortOption.TitleDesc, label: 'タイトル降順' },
    { value: BookSortOption.Newest, label: '追加した順 (新しい順)' }, // Placeholder for now
    { value: BookSortOption.Recommended, label: '追加した順 (古い順)' }, // Placeholder
  ];

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  // Simplified age input for now, could be a slider or more complex component
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value === '' ? null : parseInt(value, 10) });
  };


  return (
    <section className="py-6 px-4 sm:px-0 bg-transparent mb-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 p-4 bg-white rounded-xl shadow-md border border-amber-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-grow">
          <Select
            id="themeId"
            name="themeId"
            label="テーマで絞り込み"
            options={themeOptions}
            value={filters.themeId}
            onChange={handleSelectChange}
            IconComponent={SparklesIcon}
            placeholder="テーマを選択"
          />
          
          {/* Simplified Age Filter for Favorites */}
          <div className="sm:col-span-1">
            <label htmlFor="ageRangeFavorites" className="block text-sm font-medium text-amber-700 mb-1">対象年齢</label>
            <div className="flex gap-2">
                 <input 
                    type="number" 
                    name="minAge" 
                    placeholder="最小" 
                    value={filters.minAge === null ? '' : filters.minAge.toString()} 
                    onChange={handleAgeChange}
                    className="w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm bg-white text-amber-900 border-amber-300 focus:ring-amber-500 focus:border-amber-500"
                />
                 <input 
                    type="number" 
                    name="maxAge" 
                    placeholder="最大" 
                    value={filters.maxAge === null ? '' : filters.maxAge.toString()} 
                    onChange={handleAgeChange}
                    className="w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm bg-white text-amber-900 border-amber-300 focus:ring-amber-500 focus:border-amber-500"
                />
            </div>
          </div>

          <Select
            id="sortOptionFavorites"
            name="sortOption"
            label="並び替え"
            options={sortOptions}
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as BookSortOption)}
            placeholder="並び順を選択"
          />
        </div>
        <div className="text-sm text-amber-700 md:text-right pt-2 md:pt-0 md:pl-4 shrink-0">
          {totalItems} 件のお気に入り
        </div>
      </div>
    </section>
  );
};

export default FilterAndSortSection;