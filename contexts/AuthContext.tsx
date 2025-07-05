'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'customer' | 'waitress' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem('restaurant-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication with role assignment
    if (email && password) {
      let role: 'customer' | 'waitress' | 'admin' = 'customer';
      
      if (email.includes('waitress')) {
        role = 'waitress';
      } else if (email.includes('admin')) {
        role = 'admin';
      }
      
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email: email,
        avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=f59e0b&color=fff`,
        role: role
      };
      
      setUser(mockUser);
      localStorage.setItem('restaurant-user', JSON.stringify(mockUser));
    } else {
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user creation
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: name,
      email: email,
      avatar: `https://ui-avatars.com/api/?name=${name}&background=f59e0b&color=fff`,
      role: 'customer'
    };
    
    setUser(mockUser);
    localStorage.setItem('restaurant-user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('restaurant-user');
    localStorage.removeItem('favorites');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};