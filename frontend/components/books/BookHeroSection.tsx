
import React from 'react';
import { Book } from '../../types';
import BookCover from './BookCover';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { HeartIcon, ShareIcon, DownloadIcon, SparklesIcon } from '../../assets/icons';
import { Link } from 'react-router-dom';
import { RoutePath } from '../../types';
import { useFavorites } from '../../hooks/useFavorites';


interface BookHeroSectionProps {
  book: Book;
}

const BookHeroSection: React.FC<BookHeroSectionProps> = ({ book }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="bg-gradient-to-b from-amber-100 via-amber-50 to-amber-50 py-8 md:py-12">
      <div className="container mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          <BookCover src={book.coverUrl} alt={book.title} size="lg" className="mx-auto md:mx-0 shadow-2xl !border-amber-200" />
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2 tracking-tight">{book.title}</h1>
            <p className="text-lg text-amber-700 mb-3">著者: <span className="font-medium text-amber-600">{book.authorName}</span></p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge colorScheme="info">{book.ageRange}</Badge>
              <Badge colorScheme="gray">{book.readingTime}</Badge>
              {book.isPremium && <Badge colorScheme="warning" icon={<SparklesIcon className="w-4 h-4"/>}>Premium</Badge>}
              {book.tags && book.tags.map(tag => <Badge key={tag} colorScheme="secondary">{tag}</Badge>)}
            </div>

            <p className="text-amber-700 leading-relaxed mb-6 line-clamp-4 md:line-clamp-none">{book.description}</p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <Button 
                size="lg" 
                className="w-full sm:w-auto rounded-full" // Ensure primary button is rounded full
                as={Link}
                to={`${RoutePath.Books}/${book.id}/read`}
              >
                この本を読む
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => toggleFavorite(book.id)}
                  aria-label={isFavorite(book.id) ? 'お気に入りから削除' : 'お気に入りに追加'}
                  className={`rounded-full ${isFavorite(book.id) ? '!border-red-500 !text-red-500 hover:!bg-red-500/10' : '!border-amber-500 !text-amber-500 hover:!bg-amber-500/10'}`}
                >
                  <HeartIcon className={`w-5 h-5 ${isFavorite(book.id) ? 'fill-red-500' : ''}`} />
                </Button>
                <Button variant="outline" size="lg" aria-label="共有する" className="rounded-full !border-amber-500 !text-amber-500 hover:!bg-amber-500/10">
                  <ShareIcon />
                </Button>
                {book.isPremium && (
                  <Button variant="outline" size="lg" aria-label="ダウンロード (Premium)" className="rounded-full !border-amber-500 !text-amber-500 hover:!bg-amber-500/10">
                    <DownloadIcon />
                  </Button>
                )}
              </div>
            </div>
            {book.publisher && book.publishDate && (
              <p className="text-xs text-amber-600 mt-4">
                出版社: {book.publisher} ({new Date(book.publishDate).toLocaleDateString('ja-JP')})
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookHeroSection;