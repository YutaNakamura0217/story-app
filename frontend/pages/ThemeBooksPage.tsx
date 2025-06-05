import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ThemeHeaderSection from '../components/theme_books_page/ThemeHeaderSection';
import FilterAndSortSection from '../components/books_page/FilterAndSortSection'; // Reusing this
import BookListArea from '../components/books_page/BookListArea';
import PaginationControls from '../components/ui/PaginationControls';
import { Book, BookFilters, BookSortOption, PhilosophyTheme, RoutePath, BookTypeFilterOption } from '../types';
import { ITEMS_PER_PAGE } from '../constants';
import { useFavorites } from '../hooks/useFavorites';
import { api } from '../api';

const ThemeBooksPage: React.FC = () => {
  const { id: themeId } = useParams<{ id: string }>();
  const { favorites, toggleFavorite, loading: favoritesLoading } = useFavorites();

  const [currentTheme, setCurrentTheme] = useState<PhilosophyTheme | null | undefined>(undefined);
  const [themeBooks, setThemeBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [displayedBooks, setDisplayedBooks] = useState<Book[]>([]);

  const [filters, setFilters] = useState<BookFilters>({
    searchQuery: '',
    themeId: themeId || '', // Pre-fill themeId from URL, but it won't be changeable in UI here
    minAge: null,
    maxAge: null,
    type: BookTypeFilterOption.All,
  });
  const [sortOption, setSortOption] = useState<BookSortOption>(BookSortOption.Recommended);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const theme = await api<PhilosophyTheme>(`/themes/${themeId}`);
        setCurrentTheme(theme);
        const books = await api<Book[]>(`/themes/${themeId}/books`);
        setThemeBooks(books);
      } catch {
        setCurrentTheme(null);
        setThemeBooks([]);
      } finally {
        setIsLoading(false);
      }
    }
    if (themeId) fetchData();
  }, [themeId]);

  const parseAgeRange = (ageRangeString: string): [number, number] | null => {
    const match = ageRangeString.match(/(\d+)-(\d+)歳/);
    if (match) return [parseInt(match[1],10), parseInt(match[2],10)];
    const singleAgeMatch = ageRangeString.match(/(\d+)歳/);
    if (singleAgeMatch) { const age = parseInt(singleAgeMatch[1],10); return [age, age]; }
    return null;
  }

  const applyFiltersAndSort = useCallback(() => {
    setIsLoading(true);
    let books = [...themeBooks]; // Start with books already filtered by theme

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      books = books.filter(book => 
        book.title.toLowerCase().includes(query) ||
        book.authorName.toLowerCase().includes(query)
      );
    }
    
    if (filters.minAge !== null || filters.maxAge !== null) {
        books = books.filter(book => {
            const bookAgeRange = parseAgeRange(book.ageRange);
            if (!bookAgeRange) return true;
            const [bookMin, bookMax] = bookAgeRange;
            const filterMin = filters.minAge ?? 0;
            const filterMax = filters.maxAge ?? 99;
            return Math.max(filterMin, bookMin) <= Math.min(filterMax, bookMax);
        });
    }

    if (filters.type !== BookTypeFilterOption.All) {
      books = books.filter(book => {
        if (filters.type === BookTypeFilterOption.Premium) return book.isPremium;
        if (filters.type === BookTypeFilterOption.Free) return book.isFree;
        if (filters.type === BookTypeFilterOption.Subscription) return !book.isPremium && !book.isFree;
        return true;
      });
    }

    switch (sortOption) {
      case BookSortOption.Popularity:
        books.sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0));
        break;
      case BookSortOption.Newest:
        books.sort((a, b) => new Date(b.releaseDate || b.publishDate || 0).getTime() - new Date(a.releaseDate || a.publishDate || 0).getTime());
        break;
      // Add other sort cases as in BooksPage
      default:
        books.sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0));
        break;
    }
    setFilteredBooks(books);
    setCurrentPage(1);
    setIsLoading(false);
  }, [themeBooks, filters, sortOption]);

  useEffect(() => {
    if (themeBooks.length > 0 || currentTheme === null) { // Apply filters once themeBooks are loaded or if theme not found
        applyFiltersAndSort();
    }
  }, [themeBooks, currentTheme, applyFiltersAndSort]);


  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayedBooks(filteredBooks.slice(startIndex, endIndex));
  }, [filteredBooks, currentPage]);

  const handleFilterChange = (newFilters: Partial<BookFilters>) => {
    // Prevent changing themeId from this page's filter UI
    const { themeId: _, ...restFilters } = newFilters;
    setFilters(prev => ({ ...prev, ...restFilters }));
  };

  const handleSortChange = (newSortOption: BookSortOption) => {
    setSortOption(newSortOption);
  };

  const handleResetFilters = () => {
    setFilters({
        searchQuery: '',
        themeId: themeId || '', // Keep current theme
        minAge: null,
        maxAge: null,
        type: BookTypeFilterOption.All,
    });
    setSortOption(BookSortOption.Recommended);
  };
  
  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);

  if (currentTheme === undefined) { // Still loading theme info
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

  if (currentTheme === null) { // Theme not found
    return <Navigate to={RoutePath.Themes} replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      <Header variant="main" />
      <main className="flex-grow">
        <ThemeHeaderSection theme={currentTheme} />
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8">
          <FilterAndSortSection
            filters={filters}
            onFilterChange={handleFilterChange}
            sortOption={sortOption}
            onSortChange={handleSortChange}
            onResetFilters={handleResetFilters}
            // Disable theme filter as we are already in a theme context
            // This could be a prop to FilterAndSortSection like `disableThemeFilter={true}`
            // For now, it will show the current theme but won't be very useful to change.
          />
          <div className="text-amber-700 mb-4 text-sm">
            「{currentTheme.name}」のテーマには {filteredBooks.length} 冊の絵本が見つかりました。
          </div>
          <BookListArea
            books={displayedBooks}
            isLoading={isLoading || favoritesLoading}
            onFavoriteToggle={toggleFavorite}
            favorites={favorites}
          />
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={filteredBooks.length}
          />
        </div>
      </main>
      <Footer variant="main" />
    </div>
  );
};

export default ThemeBooksPage;