import { useEffect, useState } from 'react';
import { Book } from '../types';
import { api } from '../api';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const data = await api<Book[]>('/books');
        setBooks(data);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  return { books, loading };
}
