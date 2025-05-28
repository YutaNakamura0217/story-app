import React, { useState, useEffect } from 'react';
import { MOCK_BOOKS } from '../../constants';
import BookCard from '../books/BookCard';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import { RoutePath, Book } from '../../types';
import { useFavorites } from '../../hooks/useFavorites'; // Import useFavorites

const RecommendedBooksSection: React.FC = () => {
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const { favorites, toggleFavorite, loading: favoritesLoading } = useFavorites();

  useEffect(() => {
    // Simulate fetching recommended books - here we just take a slice
    // In a real app, this might be an API call
    setRecommendedBooks(MOCK_BOOKS.sort((a,b) => (b.popularityScore || 0) - (a.popularityScore || 0)).slice(0, 4));
  }, []);

  if (favoritesLoading && recommendedBooks.length === 0) { // Show loading only if books aren't ready
    return (
      <section className="mb-8 px-4">
        <div className="flex justify-between items-center pb-4 pt-2">
          <h3 className="text-amber-900 text-xl sm:text-2xl font-bold leading-tight tracking-[-0.015em]">注目の本</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-lg animate-pulse">
              <div className="w-full h-72 bg-amber-100 rounded-md mb-4"></div>
              <div className="h-6 bg-amber-100 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-amber-100 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-amber-100 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }


  return (
    <section className="mb-8">
      <div className="flex justify-between items-center px-4 pb-4 pt-2">
        <h3 className="text-amber-900 text-xl sm:text-2xl font-bold leading-tight tracking-[-0.015em]">注目の本</h3>
        <Button variant="ghost" size="sm" as={Link} to={RoutePath.Books} className="text-amber-600 hover:text-amber-700">
          すべての絵本を見る
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {recommendedBooks.map((book) => (
          <BookCard 
            key={book.id} 
            book={book} 
            onFavoriteToggle={toggleFavorite}
            isFavorite={favorites.has(book.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default RecommendedBooksSection;