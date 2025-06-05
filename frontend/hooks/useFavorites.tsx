import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { api } from '../api';
import { Book } from '../types';

interface FavoritesContextType {
  favorites: Set<string>;
  isFavorite: (bookId: string) => boolean;
  toggleFavorite: (bookId: string) => Promise<void>;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);

  const fetchFavorites = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api<Book[]>("/users/me/favorites");
      setFavorites(new Set(data.map(b => b.id)));
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
      setFavorites(new Set());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const toggleFavorite = useCallback(async (bookId: string) => {
    try {
      if (favorites.has(bookId)) {
        await api(`/users/me/favorites/${bookId}`, { method: 'DELETE' });
        setFavorites(prev => {
          const newSet = new Set(prev);
          newSet.delete(bookId);
          return newSet;
        });
      } else {
        await api(`/users/me/favorites/${bookId}`, { method: 'POST' });
        setFavorites(prev => new Set(prev).add(bookId));
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  }, [favorites]);

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