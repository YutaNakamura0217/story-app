import { useCallback, useEffect, useState } from 'react';
import { api } from '../api';
import { UserBookProgress, UserBookBookmark, UserBookNote } from '../types';

export function useProgress(bookId: string) {
  const [progress, setProgress] = useState<UserBookProgress | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api<UserBookProgress>(`/users/me/books/${bookId}/progress`);
      setProgress(data);
    } catch (err) {
      console.error('Failed to load progress', err);
      setProgress(null);
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const updatePage = useCallback(async (page: number) => {
    const data = await api<UserBookProgress>(`/users/me/books/${bookId}/progress`, {
      method: 'PUT',
      body: JSON.stringify({ current_page: page })
    });
    setProgress(data);
  }, [bookId]);

  const addBookmark = useCallback(async (page: number) => {
    const bm = await api<UserBookBookmark>(`/users/me/books/${bookId}/bookmarks`, {
      method: 'POST',
      body: JSON.stringify({ page_number: page })
    });
    setProgress(prev => prev ? { ...prev, bookmarks: [...prev.bookmarks, bm] } : prev);
  }, [bookId]);

  const removeBookmark = useCallback(async (page: number) => {
    await api(`/users/me/books/${bookId}/bookmarks/${page}`, { method: 'DELETE' });
    setProgress(prev => prev ? { ...prev, bookmarks: prev.bookmarks.filter(b => b.pageNumber !== page) } : prev);
  }, [bookId]);

  const addNote = useCallback(async (page: number, text: string) => {
    const note = await api<UserBookNote>(`/users/me/books/${bookId}/notes`, {
      method: 'POST',
      body: JSON.stringify({ page_number: page, text })
    });
    setProgress(prev => prev ? { ...prev, notes: [...prev.notes, note] } : prev);
  }, [bookId]);

  const deleteNote = useCallback(async (noteId: string) => {
    await api(`/users/me/books/${bookId}/notes/${noteId}`, { method: 'DELETE' });
    setProgress(prev => prev ? { ...prev, notes: prev.notes.filter(n => n.id !== noteId) } : prev);
  }, [bookId]);

  return { progress, loading, updatePage, addBookmark, removeBookmark, addNote, deleteNote, fetchProgress };
}
