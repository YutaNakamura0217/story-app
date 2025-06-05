
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '../types';
import { api } from '../api';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Start with loading true

  // Check for stored session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    const token = localStorage.getItem('authToken');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      api<{ access_token: string; user: User }>('/auth/refresh', { method: 'POST' })
        .then(data => {
          localStorage.setItem('authToken', data.access_token);
          localStorage.setItem('authUser', JSON.stringify(data.user));
          setUser(data.user);
        })
        .catch(() => logout());
    }
    setLoading(false); // Finished loading
  }, []);

  const login = useCallback(async (email: string, pass: string): Promise<void> => {
    setLoading(true);
    try {
      const data = await api<{ access_token: string; user: User }>(
        '/auth/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ username: email, password: pass })
        }
      );
      localStorage.setItem('authToken', data.access_token);
      localStorage.setItem('authUser', JSON.stringify(data.user));
      setUser(data.user);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setLoading(true);
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
    setUser(null);
    setLoading(false);
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
