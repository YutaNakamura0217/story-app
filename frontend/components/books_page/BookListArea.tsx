import React from 'react';
import { Book } from '../../types';
import BookCard from '../books/BookCard';
import { BookIcon } from '../../assets/icons'; // Using BookIcon as a placeholder

interface BookListAreaProps {
  books: Book[];
  isLoading: boolean;
  onFavoriteToggle: (bookId: string) => void;
  favorites: Set<string>;
}

const BookListArea: React.FC<BookListAreaProps> = ({ books, isLoading, onFavoriteToggle, favorites }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-4 text-amber-700 text-lg">絵本を読み込んでいます...</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <BookIcon className="w-24 h-24 text-amber-300 mx-auto mb-6" />
        <h3 className="text-2xl font-semibold text-amber-800 mb-2">絵本が見つかりませんでした</h3>
        <p className="text-amber-700">
          検索条件を変更するか、フィルターをリセットしてみてください。
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8 px-4 sm:px-0">
      {books.map((book) => (
        <BookCard 
          key={book.id} 
          book={book}
          onFavoriteToggle={onFavoriteToggle}
          isFavorite={favorites.has(book.id)}
        />
      ))}
    </div>
  );
};

export default BookListArea;