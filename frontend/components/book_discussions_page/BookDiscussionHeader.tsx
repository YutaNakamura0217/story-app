import React from 'react';
import { Link } from 'react-router-dom';
import { Book, RoutePath } from '../../types';
import { ArrowUturnLeftIcon, BookIcon } from '../../assets/icons';

interface BookDiscussionHeaderProps {
  book: Book;
}

const BookDiscussionHeader: React.FC<BookDiscussionHeaderProps> = ({ book }) => {
  return (
    <section className="bg-amber-100 py-6 shadow-sm border-b border-amber-200">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <Link 
          to={`${RoutePath.Books}/${book.id}`}
          className="inline-flex items-center text-sm text-amber-600 hover:text-amber-800 mb-3 transition-colors group"
        >
          <ArrowUturnLeftIcon className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" />
          「{book.title}」の書籍詳細へ戻る
        </Link>
        
        <div className="flex items-center gap-4">
            <img src={book.coverUrl} alt={book.title} className="w-16 h-20 sm:w-20 sm:h-28 object-cover rounded-md shadow-md border border-amber-200" />
            <div>
                <p className="text-xs text-amber-700 mb-0.5">ディスカッションテーマ:</p>
                <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 tracking-tight">
                    {book.title}
                </h1>
                <p className="text-sm text-amber-700">作: {book.authorName}</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default BookDiscussionHeader;