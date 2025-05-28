
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '../types'; // Ensure this path is correct

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, pass: string) => Promise<void>; // Changed to Promise for async simulation
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER: User = {
  id: 'user123',
  name: '哲学者キッズ',
  email: 'test@example.com',
  avatarUrl: 'https://picsum.photos/seed/user123/100/100',
  tier: 'Premium',
};

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Start with loading true

  // Check for stored session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Finished loading
  }, []);

  const login = useCallback(async (email: string, pass: string): Promise<void> => {
    setLoading(true);
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'test@example.com' && pass === 'password') {
          localStorage.setItem('authUser', JSON.stringify(MOCK_USER));
          setUser(MOCK_USER);
          setLoading(false);
          resolve();
        } else {
          setLoading(false);
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  }, []);

  const logout = useCallback(() => {
    setLoading(true);
    localStorage.removeItem('authUser');
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
