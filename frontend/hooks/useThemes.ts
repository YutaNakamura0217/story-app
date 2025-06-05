import { useEffect, useState } from 'react';
import { PhilosophyTheme } from '../types';
import { api } from '../api';

export function useThemes() {
  const [themes, setThemes] = useState<PhilosophyTheme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchThemes() {
      try {
        const data = await api<PhilosophyTheme[]>('/themes');
        setThemes(data);
      } finally {
        setLoading(false);
      }
    }
    fetchThemes();
  }, []);

  return { themes, loading };
}
