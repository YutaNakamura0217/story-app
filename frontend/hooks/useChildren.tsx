import React, { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';
import { api } from '../api';
import { Child } from '../types';

interface ChildrenContextType {
  children: Child[];
  loading: boolean;
  refreshChildren: () => Promise<void>;
  addChild: (child: Omit<Child, 'id'>) => Promise<void>;
  updateChild: (id: string, child: Partial<Child>) => Promise<void>;
  deleteChild: (id: string) => Promise<void>;
}

const ChildrenContext = createContext<ChildrenContextType | undefined>(undefined);

export const ChildrenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [childList, setChildList] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshChildren = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api<Child[]>('/users/me/children');
      setChildList(data);
    } catch (err) {
      console.error('Failed to fetch children:', err);
      setChildList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshChildren();
  }, [refreshChildren]);

  const addChild = useCallback(async (child: Omit<Child, 'id'>) => {
    const newChild = await api<Child>('/users/me/children', {
      method: 'POST',
      body: JSON.stringify(child)
    });
    setChildList(prev => [...prev, newChild]);
  }, []);

  const updateChild = useCallback(async (id: string, child: Partial<Child>) => {
    const updated = await api<Child>(`/users/me/children/${id}`, {
      method: 'PUT',
      body: JSON.stringify(child)
    });
    setChildList(prev => prev.map(c => c.id === id ? updated : c));
  }, []);

  const deleteChild = useCallback(async (id: string) => {
    await api(`/users/me/children/${id}`, { method: 'DELETE' });
    setChildList(prev => prev.filter(c => c.id !== id));
  }, []);

  return (
    <ChildrenContext.Provider value={{ children: childList, loading, refreshChildren, addChild, updateChild, deleteChild }}>
      {children}
    </ChildrenContext.Provider>
  );
};

export const useChildren = (): ChildrenContextType => {
  const ctx = useContext(ChildrenContext);
  if (!ctx) throw new Error('useChildren must be used within a ChildrenProvider');
  return ctx;
};
