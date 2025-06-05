import { useEffect, useState, useCallback } from 'react';
import { api } from '../api';
import { Review } from '../types';

export function useReviews(bookId: string) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api<any[]>(`/books/${bookId}/reviews`);
      const mapped: Review[] = data.map(r => ({
        id: r.id,
        userId: r.user_id,
        bookId: r.book_id,
        userName: r.user?.name ?? '匿名ユーザー',
        userAvatarUrl: r.user?.avatar_url,
        rating: r.rating,
        text: r.text ?? '',
        date: r.created_at,
      }));
      setReviews(mapped);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const addReview = useCallback(async (rating: number, text: string) => {
    const data = await api<any>(`/books/${bookId}/reviews`, {
      method: 'POST',
      body: JSON.stringify({ rating, text })
    });
    const newReview: Review = {
      id: data.id,
      userId: data.user_id,
      bookId: data.book_id,
      userName: data.user?.name ?? '匿名ユーザー',
      userAvatarUrl: data.user?.avatar_url,
      rating: data.rating,
      text: data.text ?? '',
      date: data.created_at,
    };
    setReviews(prev => [...prev, newReview]);
  }, [bookId]);

  return { reviews, loading, addReview, fetchReviews };
}
