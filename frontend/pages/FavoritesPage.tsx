import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageTitleSection from '../components/favorites_page/PageTitleSection';
import FilterAndSortSection from '../components/favorites_page/FilterAndSortSection';
import BookListArea from '../components/books_page/BookListArea';
import PaginationControls from '../components/ui/PaginationControls';
import { Book, BookFilters, BookSortOption, BookTypeFilterOption } from '../types';
import { MOCK_BOOKS, ITEMS_PER_PAGE } from '../constants';
import { useFavorites } from '../hooks/useFavorites';
import { Link } from 'react-router-dom';
import { RoutePath } from '../types';
import Button from '../components/ui/Button';
import { HeartIcon } from '../assets/icons';

const FavoritesPage: React.FC = () => {
  const { favorites, toggleFavorite, loading: favoritesLoading } = useFavorites();
  
  const [allFavoriteBooks, setAllFavoriteBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [displayedBooks, setDisplayedBooks] = useState<Book[]>([]);

  const [filters, setFilters] = useState<BookFilters>({
    searchQuery: '', // Not used in current favorites filter section, but kept for type consistency
    themeId: '',
    minAge: null,
    maxAge: null,
    type: BookTypeFilterOption.All, // Not typically used for favorites, but can be adapted
  });
  const [sortOption, setSortOption] = useState<BookSortOption>(BookSortOption.Recommended); // Could be "Date Added"
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const favoriteBookDetails = MOCK_BOOKS.filter(book => favorites.has(book.id));
    setAllFavoriteBooks(favoriteBookDetails);
    // Initial filtering/sorting will be triggered by the next useEffect
  }, [favorites]);

  const parseAgeRange = (ageRangeString: string): [number, number] | null => {
    const match = ageRangeString.match(/(\d+)-(\d+)歳/);
    if (match) return [parseInt(match[1],10), parseInt(match[2],10)];
    const singleAgeMatch = ageRangeString.match(/(\d+)歳/);
    if (singleAgeMatch) { const age = parseInt(singleAgeMatch[1],10); return [age, age]; }
    return null;
  }

  const applyFiltersAndSort = useCallback(() => {
    setIsLoading(true);
    let books = [...allFavoriteBooks];

    // Apply filters (theme, age - simplified for favorites)
    // searchQuery and type are not typically primary filters on a favorites page
    // but can be added to the FilterAndSortSection for favorites if needed.

    if (filters.themeId) {
        // Placeholder: assumes MOCK_THEMES exist and books have tags
        // const selectedTheme = MOCK_THEMES.find(t => t.id === filters.themeId);
        // if (selectedTheme) {
        //     books = books.filter(book => book.tags?.includes(selectedTheme.name));
        // }
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
    
    // Apply sort (could include "Date Added" if timestamps were stored with favorites)
    switch (sortOption) {
      case BookSortOption.TitleAsc:
        books.sort((a, b) => a.title.localeCompare(b.title, 'ja'));
        break;
      case BookSortOption.TitleDesc:
        books.sort((a, b) => b.title.localeCompare(a.title, 'ja'));
        break;
      case BookSortOption.Popularity: // Popularity might not make sense for personal favorites
         books.sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0));
        break;
      case BookSortOption.Newest: // Could mean "newest favorited" if we had timestamps
         books.sort((a, b) => new Date(b.releaseDate || b.publishDate || 0).getTime() - new Date(a.releaseDate || a.publishDate || 0).getTime());
        break;
      case BookSortOption.Recommended: // "Date Added (Newest)" could be default for favorites
      default:
        // For now, just sort by title as a default for favorites if no specific sort
        books.sort((a, b) => a.title.localeCompare(b.title, 'ja'));
        break;
    }

    setFilteredBooks(books);
    setCurrentPage(1);
    setTimeout(() => setIsLoading(false), 200); // Shorter delay for local filtering
  }, [allFavoriteBooks, filters, sortOption]);

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

  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);

  if (favoritesLoading) {
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
  
  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      <Header variant="main" />
      <main className="flex-grow">
        <PageTitleSection />
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8">
          {allFavoriteBooks.length > 0 ? (
            <>
              <FilterAndSortSection
                filters={filters}
                onFilterChange={handleFilterChange}
                sortOption={sortOption}
                onSortChange={handleSortChange}
                totalItems={filteredBooks.length}
              />
              <BookListArea
                books={displayedBooks}
                isLoading={isLoading}
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
            </>
          ) : (
            <div className="text-center py-20 px-4 bg-white rounded-xl shadow-lg border border-amber-100">
              <HeartIcon className="w-24 h-24 text-amber-300 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-amber-800 mb-2">まだお気に入りの絵本はありません</h3>
              <p className="text-amber-700 mb-6">
                素敵な絵本を探しに行きましょう！きっと心に残る一冊が見つかります。
              </p>
              <Button as={Link} to={RoutePath.Books} variant="primary" size="lg" className="rounded-full">
                絵本を探す
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer variant="main" />
    </div>
  );
};

export default FavoritesPage;