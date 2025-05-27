import React from 'react';
import type { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <a
      href={category.href}
      onClick={(e) => e.preventDefault()} // Placeholder action
      className="category-card group flex flex-col items-center gap-3 rounded-xl border border-amber-200 bg-white p-4 sm:p-6 text-center shadow-sm hover:shadow-lg hover:border-amber-400 transition-all duration-300"
      aria-label={category.name}
    >
      <div className="flex items-center justify-center size-16 sm:size-20 rounded-full bg-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
        <span className="material-icons-outlined !text-3xl sm:!text-4xl">
          {category.icon}
        </span>
      </div>
      <h2 className="text-gray-700 text-sm sm:text-base font-semibold group-hover:text-amber-600 transition-colors duration-300">
        {category.name}
      </h2>
    </a>
  );
};

export default CategoryCard;