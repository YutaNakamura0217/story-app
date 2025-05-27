import React from 'react';
import type { Book } from '../types';
import type { View } from '../constants'; // For navigation

interface FavoriteBookCardProps {
  book: Book;
  onRemoveFavorite: (bookId: string) => void;
  onNavigate?: (view: View, data?: any) => void; // For navigation
}

const FavoriteBookCard: React.FC<FavoriteBookCardProps> = ({ book, onRemoveFavorite, onNavigate }) => {
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
    // Prevent navigation if the favorite button itself was clicked
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    if (onNavigate) {
      onNavigate('bookDetail', book);
    }
  };
  
  return (
    <div 
      className="flex flex-col gap-3 pb-3 group cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-out" 
      role="listitem" 
      aria-label={`View details for Favorite book: ${book.title} by ${book.author}`}
      onClick={handleCardClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick(e); }}
      tabIndex={0}
    >
      <div className="relative">
        <div 
          className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow" 
          style={{ backgroundImage: `url("${book.imageUrl}")` }}
          aria-hidden="true"
        ></div>
        <button 
          aria-label={`Remove ${book.title} from favorites`}
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-1.5 text-red-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click event
            onRemoveFavorite(book.id);
          }}
        >
          <i className="material-icons !text-xl">favorite</i>
        </button>
      </div>
      <div>
        <p className="text-amber-800 text-sm sm:text-base font-semibold leading-tight truncate group-hover:text-amber-600 transition-colors" title={book.title}>
          {book.title}
        </p>
        {book.author && (
          <p className="text-amber-500 text-xs sm:text-sm font-normal leading-normal truncate" title={book.author}>
            {book.author}
          </p>
        )}
      </div>
    </div>
  );
};

export default FavoriteBookCard;