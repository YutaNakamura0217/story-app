import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageTitleSection from '../components/books_page/PageTitleSection';
import FilterAndSortSection from '../components/books_page/FilterAndSortSection';
import BookListArea from '../components/books_page/BookListArea';
import PaginationControls from '../components/ui/PaginationControls';
import { Book, BookFilters, BookSortOption, BookTypeFilterOption, PhilosophyTheme } from '../types';
import { MOCK_BOOKS, MOCK_THEMES, ITEMS_PER_PAGE } from '../constants';
import { useFavorites } from '../hooks/useFavorites'; // Import useFavorites

const BooksPage: React.FC = () => {
  const [allBooks] = useState<Book[]>(MOCK_BOOKS);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(allBooks);
  const [displayedBooks, setDisplayedBooks] = useState<Book[]>([]);
  
  const [filters, setFilters] = useState<BookFilters>({
    searchQuery: '',
    themeId: '', // This ID will be used to find the theme name for tag matching
    minAge: null,
    maxAge: null,
    type: BookTypeFilterOption.All,
  });
  const [sortOption, setSortOption] = useState<BookSortOption>(BookSortOption.Recommended);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const { favorites, toggleFavorite, loading: favoritesLoading } = useFavorites(); // Use global favorites

  const parseAgeRange = (ageRangeString: string): [number, number] | null => {
      const match = ageRangeString.match(/(\d+)-(\d+)歳/);
      if (match) {
          return [parseInt(match[1],10), parseInt(match[2],10)];
      }
      const singleAgeMatch = ageRangeString.match(/(\d+)歳/);
       if (singleAgeMatch) {
           const age = parseInt(singleAgeMatch[1], 10);
           return [age, age];
       }
      return null; 
  }

  const applyFiltersAndSort = useCallback(() => {
    setIsLoading(true);
    let books = [...allBooks];

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      books = books.filter(book => 
        book.title.toLowerCase().includes(query) ||
        book.authorName.toLowerCase().includes(query) ||
        (book.tags && book.tags.some(tag => tag.toLowerCase().includes(query))) ||
        (book.description && book.description.toLowerCase().includes(query))
      );
    }

    if (filters.themeId) {
        const selectedTheme = MOCK_THEMES.find(t => t.id === filters.themeId);
        if (selectedTheme) {
             // Filter books whose tags include the selected theme's name
             // This is a simplification; a real app might have a direct theme_id on books or a join table.
            books = books.filter(book => book.tags?.some(tag => tag.toLowerCase().includes(selectedTheme.name.toLowerCase())));
        }
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
      case BookSortOption.TitleAsc:
        books.sort((a, b) => a.title.localeCompare(b.title, 'ja'));
        break;
      case BookSortOption.TitleDesc:
        books.sort((a, b) => b.title.localeCompare(a.title, 'ja'));
        break;
      case BookSortOption.Recommended:
      default:
        books.sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0)); 
        break;
    }

    setFilteredBooks(books);
    setCurrentPage(1); 
    // Simulate API delay
    setTimeout(() => setIsLoading(false), 300);
  }, [allBooks, filters, sortOption]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [applyFiltersAndSort]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayedBooks(filteredBooks.slice(startIndex, endIndex));
  }, [filteredBooks, currentPage]);

  const handleFilterChange = (newFilters: Partial<BookFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleSortChange = (newSortOption: BookSortOption) => {
    setSortOption(newSortOption);
  };
  
  const handleResetFilters = () => {
    setFilters({
        searchQuery: '',
        themeId: '',
        minAge: null,
        maxAge: null,
        type: BookTypeFilterOption.All,
    });
    setSortOption(BookSortOption.Recommended);
  };

  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      <Header variant="main" />
      <main className="flex-grow">
        <PageTitleSection />
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8">
          <FilterAndSortSection
            filters={filters}
            onFilterChange={handleFilterChange}
            sortOption={sortOption}
            onSortChange={handleSortChange}
            onResetFilters={handleResetFilters}
          />
          <BookListArea 
            books={displayedBooks} 
            isLoading={isLoading || favoritesLoading} // Consider favorites loading state
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

export default BooksPage;