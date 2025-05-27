import React from 'react';
import type { Book } from '../types';
import type { View } from '../constants';

interface BookCardProps {
  book: Book;
  onNavigate?: (view: View, data?: any) => void; // Optional: for navigation from card
}

const BookCard: React.FC<BookCardProps> = ({ book, onNavigate }) => {
  const handleCardClick = () => {
    if (onNavigate) {
      onNavigate('bookDetail', book);
    } else {
      console.warn('BookCard: onNavigate handler not provided.');
      // Potentially navigate using window.location or a global navigation context if available
    }
  };

  return (
    <div 
      className="flex flex-col gap-3 rounded-lg group cursor-pointer" 
      role="listitem" 
      aria-label={`View details for Book: ${book.title}`}
      onClick={handleCardClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick(); }}
      tabIndex={0}
    >
      <div 
        className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl shadow-md group-hover:shadow-xl transition-shadow duration-300 border border-amber-100" 
        style={{ backgroundImage: `url("${book.imageUrl}")` }}
        aria-hidden="true"
      ></div>
      <p className="text-slate-700 text-sm font-medium leading-normal group-hover:text-amber-600 transition-colors">{book.title}</p>
    </div>
  );
};

export default BookCard;