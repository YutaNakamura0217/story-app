import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface FavoritesContextType {
  favorites: Set<string>;
  isFavorite: (bookId: string) => boolean;
  toggleFavorite: (bookId: string) => void;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_STORAGE_KEY = 'wonderwise_favorites';

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavorites) {
        setFavorites(new Set(JSON.parse(storedFavorites)));
      }
    } catch (error) {
      console.error("Failed to load favorites from localStorage:", error);
      // Initialize with an empty set if parsing fails
      setFavorites(new Set());
    }
    setLoading(false);
  }, []);

  const updateFavorites = useCallback((newFavorites: Set<string>) => {
    setFavorites(newFavorites);
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(Array.from(newFavorites)));
    } catch (error) {
      console.error("Failed to save favorites to localStorage:", error);
    }
  }, []);

  const toggleFavorite = useCallback((bookId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(bookId)) {
      newFavorites.delete(bookId);
    } else {
      newFavorites.add(bookId);
    }
    updateFavorites(newFavorites);
  }, [favorites, updateFavorites]);

  const isFavorite = useCallback((bookId: string) => {
    return favorites.has(bookId);
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};