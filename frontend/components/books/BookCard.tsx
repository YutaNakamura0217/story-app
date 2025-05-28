import React from 'react';
import { Book } from '../../types';
import Card from '../ui/Card'; 
import Button from '../ui/Button';
import Badge from '../ui/Badge'; // Import Badge
import { Link } from 'react-router-dom';
import { RoutePath } from '../../types';
import { HeartIcon, SparklesIcon, BookIcon } from '../../assets/icons'; 

interface BookCardProps {
  book: Book;
  onFavoriteToggle?: (bookId: string) => void;
  isFavorite?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, onFavoriteToggle, isFavorite }) => {
  const imageUrl = book.coverUrl || "https://picsum.photos/seed/book-placeholder/300/400"; // Generic placeholder
  
  return (
    <Card className="flex flex-col gap-0 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border-amber-100 p-0 h-full">
      <Link to={`${RoutePath.Books}/${book.id}`} className="block group">
        <div 
          className="w-full h-64 sm:h-72 md:h-80 bg-center bg-no-repeat bg-cover relative overflow-hidden group-hover:opacity-90 transition-opacity duration-300"
          style={{ backgroundImage: `url("${imageUrl}")` }}
          aria-label={book.title}
        >
           {book.isPremium && (
            <Badge colorScheme="amber" variant="solid" size="sm" className="absolute top-2 right-2 shadow">
              <SparklesIcon className="w-3 h-3 mr-1" /> Premium
            </Badge>
          )}
           {book.isFree && !book.isPremium && (
             <Badge colorScheme="success" variant="solid" size="sm" className="absolute top-2 right-2 shadow">
                無料
            </Badge>
           )}
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`${RoutePath.Books}/${book.id}`} className="block mb-1">
          <h4 className="text-amber-900 text-lg font-semibold leading-tight line-clamp-2 hover:text-amber-700 transition-colors" title={book.title}>
            {book.title}
          </h4>
        </Link>
        <p className="text-amber-700 text-xs font-medium mb-2">作: {book.authorName}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          <Badge colorScheme="info" variant="subtle" size="sm">{book.ageRange}</Badge>
          {book.tags && book.tags.slice(0, 2).map(tag => ( // Show up to 2 theme tags
            <Badge key={tag} colorScheme="secondary" variant="subtle" size="sm">{tag}</Badge>
          ))}
        </div>

        <p className="text-amber-700 text-sm font-normal leading-normal mt-1 flex-grow line-clamp-3 mb-3">{book.description}</p>
        
        <div className="mt-auto pt-3 border-t border-amber-100 flex items-center justify-between gap-2">
          <Button 
            variant="primary" 
            size="sm" 
            as={Link} 
            to={`${RoutePath.Books}/${book.id}/read`}
            className="flex-grow rounded-full !px-3 !py-1.5 !text-sm !font-bold transition-colors"
            leftIcon={<BookIcon className="w-4 h-4"/>}
          >
            読む
          </Button>
          {onFavoriteToggle && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onFavoriteToggle(book.id)}
              aria-label={isFavorite ? "お気に入りから削除" : "お気に入りに追加"}
              className={`p-2 rounded-full ${isFavorite ? "!text-red-500 hover:!bg-red-100" : "!text-amber-500 hover:!bg-amber-100"}`}
            >
              <HeartIcon className={`w-5 h-5 ${isFavorite ? 'fill-red-500 stroke-red-500' : 'stroke-amber-500'}`} />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default BookCard;