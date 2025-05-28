import React, { ChangeEvent } from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { BookFilters, BookSortOption, PhilosophyTheme, SelectOption, BookTypeFilterOption } from '../../types';
import { MOCK_THEMES, BOOK_SORT_OPTIONS, BOOK_TYPE_FILTER_OPTIONS } from '../../constants';
import { SearchIcon, FilterIcon, AdjustmentsHorizontalIcon, SparklesIcon } from '../../assets/icons';

interface FilterAndSortSectionProps {
  filters: BookFilters;
  onFilterChange: (filters: Partial<BookFilters>) => void;
  sortOption: BookSortOption;
  onSortChange: (sortOption: BookSortOption) => void;
  onResetFilters: () => void;
}

const FilterAndSortSection: React.FC<FilterAndSortSectionProps> = ({
  filters,
  onFilterChange,
  sortOption,
  onSortChange,
  onResetFilters,
}) => {
  const themeOptions: SelectOption[] = [
    { value: '', label: 'すべてのテーマ' },
    ...MOCK_THEMES.map(theme => ({ value: theme.id, label: theme.name })),
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'minAge' || name === 'maxAge') {
      onFilterChange({ [name]: value === '' ? null : parseInt(value, 10) });
    } else {
      onFilterChange({ [name]: value });
    }
  };
  
  const handleBookTypeChange = (type: BookTypeFilterOption) => {
    onFilterChange({ type });
  };

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 bg-white shadow-md rounded-xl border border-amber-100 mb-8">
      <div className="space-y-4">
        {/* Row 1: Search and Main Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
          <Input
            id="searchQuery"
            name="searchQuery"
            placeholder="キーワードで検索 (例: 勇気、友情)"
            value={filters.searchQuery}
            onChange={handleInputChange}
            IconComponent={SearchIcon}
            className="!py-2.5"
            containerClassName="lg:col-span-2"
          />
          <Select
            id="themeId"
            name="themeId"
            label="哲学テーマ"
            options={themeOptions}
            value={filters.themeId}
            onChange={handleInputChange}
            IconComponent={SparklesIcon}
          />
          <Select
            id="sortOption"
            name="sortOption"
            label="並び替え"
            options={BOOK_SORT_OPTIONS}
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as BookSortOption)}
          />
        </div>

        {/* Row 2: Age and Type Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
           <div className="flex gap-2 items-end md:col-span-1">
             <Input
                id="minAge"
                name="minAge"
                type="number"
                label="対象年齢 (最小)"
                placeholder="例: 3"
                value={filters.minAge === null ? '' : filters.minAge.toString()}
                onChange={handleInputChange}
                min="0" max="18"
                className="!py-2.5"
              />
              <Input
                id="maxAge"
                name="maxAge"
                type="number"
                label="対象年齢 (最大)"
                placeholder="例: 7"
                value={filters.maxAge === null ? '' : filters.maxAge.toString()}
                onChange={handleInputChange}
                min="0" max="18"
                className="!py-2.5"
              />
           </div>
          
           <div className="md:col-span-2 lg:col-span-2">
             <label className="block text-sm font-medium text-amber-700 mb-1">書籍タイプ</label>
             <div className="flex flex-wrap gap-2">
                {BOOK_TYPE_FILTER_OPTIONS.map(opt => (
                     <Button
                        key={opt.value}
                        variant={filters.type === opt.value ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => handleBookTypeChange(opt.value as BookTypeFilterOption)}
                        className="rounded-full !px-3 !py-1.5"
                    >
                        {opt.label}
                    </Button>
                ))}
             </div>
           </div>
           
           <div className="flex items-end space-x-2">
             <Button 
                variant="ghost" 
                onClick={onResetFilters} 
                className="text-amber-600 hover:text-amber-700 rounded-md flex-grow"
                size="md"
              >
                リセット
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => alert('More filters coming soon!')} 
                className="rounded-md flex-grow" 
                size="md" 
                leftIcon={<AdjustmentsHorizontalIcon />}
              >
                詳細フィルター
              </Button>
           </div>
        </div>
      </div>
    </section>
  );
};

export default FilterAndSortSection;