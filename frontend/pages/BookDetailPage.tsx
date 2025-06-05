
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import BookHeroSection from '../components/books/BookHeroSection';
import BookTabsComponent from '../components/books/BookTabs';
import { Book, PhilosophyQuestionItem, RoutePath } from '../types';
import { MOCK_BOOK_QUESTIONS } from '../constants';
import { api } from '../api';
import BookCard from '../components/books/BookCard'; 

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null | undefined>(undefined);
  const [questions, setQuestions] = useState<PhilosophyQuestionItem[]>([]);
  const [similarBooks, setSimilarBooks] = useState<Book[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (!id) {
        setBook(null);
        return;
      }
      setBook(undefined);
      try {
        const b = await api<Book>(`/books/${id}`);
        setBook(b);
        setQuestions(MOCK_BOOK_QUESTIONS);
        const all = await api<Book[]>(`/books`);
        setSimilarBooks(all.filter(book => book.id !== id && (b.relatedBookIds?.includes(book.id) || true)).slice(0,3));
      } catch (err) {
        console.error('Failed to load book:', err);
        setBook(null);
      }
    }
    fetchData();
  }, [id]);

  if (book === undefined) {
    return ( 
      <div className="flex flex-col min-h-screen bg-amber-50">
        <Header variant="main" />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        </main>
        <Footer variant="main" />
      </div>
    );
  }

  if (!book) {
    return <Navigate to={RoutePath.Home} replace />; 
  }

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      <Header variant="main" />
      <main className="flex-grow">
        <BookHeroSection book={book} />
        <div className="container mx-auto max-w-screen-lg px-4 sm:px-10 md:px-20 py-8">
          <BookTabsComponent book={book} questions={questions} />

          {similarBooks.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-amber-900 mb-6 tracking-tight">関連する絵本</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarBooks.map(b => <BookCard key={b.id} book={b} />)}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer variant="main" />
    </div>
  );
};

export default BookDetailPage;