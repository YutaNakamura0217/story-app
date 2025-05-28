import React from 'react';
import { StarIcon } from '../../assets/icons'; // Using StarIcon as a representative icon

const PageTitleSection: React.FC = () => {
  return (
    <section className="py-10 text-center bg-gradient-to-b from-amber-200 via-amber-100 to-amber-50">
      <div className="container mx-auto px-4">
        <StarIcon className="w-16 h-16 text-amber-500 mx-auto mb-4" solid />
        <h1 className="text-4xl sm:text-5xl font-bold text-amber-900 mb-3 tracking-tight">
          あなたのお気に入り絵本
        </h1>
        <p className="text-lg text-amber-700 max-w-2xl mx-auto">
          いつでも読みたい、心に残る大切な絵本をここに集めよう。
        </p>
        {/* Optional: ChildSelector for parents can be added here later */}
      </div>
    </section>
  );
};

export default PageTitleSection;