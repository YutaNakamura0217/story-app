import React from 'react';
import CategoryCard from './CategoryCard';
import type { Category } from '../types';

const categoriesData: Category[] = [
  { id: 'cat1', name: 'どうぶつ', icon: 'pets', href: '#' },
  { id: 'cat2', name: 'のりもの', icon: 'directions_car', href: '#' },
  { id: 'cat3', name: 'きせつ (なつ)', icon: 'wb_sunny', href: '#' },
  { id: 'cat4', name: 'おでかけ', icon: 'beach_access', href: '#' },
  { id: 'cat5', name: 'よるのえほん', icon: 'nights_stay', href: '#' },
  { id: 'cat6', name: 'おうち', icon: 'home', href: '#' },
  { id: 'cat7', name: 'まなび', icon: 'menu_book', href: '#' },
  { id: 'cat8', name: 'あそび', icon: 'extension', href: '#' },
  { id: 'cat9', name: 'イベント', icon: 'celebration', href: '#' },
  { id: 'cat10', name: 'キャラクター', icon: 'face_retouching_natural', href: '#' },
];

const CategoryPage: React.FC = () => {
  return (
    <main className="flex-1 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-8 sm:py-12">
      <div className="layout-content-container mx-auto flex max-w-5xl flex-col gap-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight">
          カテゴリを探す
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6" role="list">
          {categoriesData.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;