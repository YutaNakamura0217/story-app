import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SearchHeaderSection from '../components/search_page/SearchHeaderSection';
import FilterAndSortSection from '../components/books_page/FilterAndSortSection';
import BookListArea from '../components/books_page/BookListArea';
import PaginationControls from '../components/ui/PaginationControls';
import { Book, BookFilters, BookSortOption, RoutePath, BookTypeFilterOption } from '../types';
import { MOCK_BOOKS, MOCK_THEMES, ITEMS_PER_PAGE } from '../constants';
import { useFavorites } from '../hooks/useFavorites';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { favorites, toggleFavorite, loading: favoritesLoading } = useFavorites();

  const [allBooks] = useState<Book[]>(MOCK_BOOKS); // Assuming search is across all books
  const [searchedBooks, setSearchedBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [displayedBooks, setDisplayedBooks] = useState<Book[]>([]);
  
  const [filters, setFilters] = useState<BookFilters>({
    searchQuery: query, // Pre-fill from URL
    themeId: '',
    minAge: null,
    maxAge: null,
    type: BookTypeFilterOption.All,
  });
  const [sortOption, setSortOption] = useState<BookSortOption>(BookSortOption.Recommended);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Update filters.searchQuery if URL query changes
  useEffect(() => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  }, [query]);

  const parseAgeRange = (ageRangeString: string): [number, number] | null => {
    const match = ageRangeString.match(/(\d+)-(\d+)歳/);
    if (match) return [parseInt(match[1],10), parseInt(match[2],10)];
    const singleAgeMatch = ageRangeString.match(/(\d+)歳/);
    if (singleAgeMatch) { const age = parseInt(singleAgeMatch[1],10); return [age, age]; }
    return null;
  }

  const performSearchAndFilter = useCallback(() => {
    setIsLoading(true);
    let books = [...allBooks];
    const currentQuery = filters.searchQuery.toLowerCase();

    if (currentQuery) {
      books = books.filter(book => 
        book.title.toLowerCase().includes(currentQuery) ||
        book.authorName.toLowerCase().includes(currentQuery) ||
        (book.tags && book.tags.some(tag => tag.toLowerCase().includes(currentQuery))) ||
        (book.description && book.description.toLowerCase().includes(currentQuery))
      );
    }
    setSearchedBooks(books); // Store initial search results before further filtering

    // Apply additional filters from FilterAndSortSection
    if (filters.themeId) {
        const selectedTheme = MOCK_THEMES.find(t => t.id === filters.themeId);
        if (selectedTheme) {
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
      // Add other sort cases
      default:
        books.sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0));
        break;
    }

    setFilteredBooks(books);
    setCurrentPage(1);
    setTimeout(() => setIsLoading(false), 300);
  }, [allBooks, filters, sortOption]);

  useEffect(() => {
    performSearchAndFilter();
  }, [performSearchAndFilter]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayedBooks(filteredBooks.slice(startIndex, endIndex));
  }, [filteredBooks, currentPage]);

  const handleFilterChange = (newFilters: Partial<BookFilters>) => {
    // For search page, searchQuery in filters is updated by SearchHeaderSection directly or URL
    const { searchQuery: _searchQuery, ...restFilters } = newFilters;
    setFilters(prev => ({ ...prev, ...restFilters }));
  };
  
  const handleSearchQueryChange = (newQuery: string) => {
      setFilters(prev => ({ ...prev, searchQuery: newQuery }));
  }

  const handleSortChange = (newSortOption: BookSortOption) => {
    setSortOption(newSortOption);
  };
  
  const handleResetFilters = () => {
    setFilters({
        searchQuery: query, // Keep the original URL query on reset of other filters
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
        <SearchHeaderSection 
          initialQuery={query} 
          resultsCount={filteredBooks.length} 
          onSearchQueryChange={handleSearchQueryChange} // Allow SearchHeader to update query for re-filtering
        />
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
            isLoading={isLoading || favoritesLoading}
            onFavoriteToggle={toggleFavorite}
            favorites={favorites}
          />
          {totalPages > 0 && (
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={ITEMS_PER_PAGE}
                totalItems={filteredBooks.length}
            />
          )}
        </div>
      </main>
      <Footer variant="main" />
    </div>
  );
};

export default SearchPage;