'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Dish {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface FavoritesContextType {
  favorites: Dish[];
  addToFavorites: (dish: Dish) => void;
  removeFromFavorites: (dishId: string) => void;
  isFavorite: (dishId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Dish[]>([]);

  useEffect(() => {
    // Load favorites from localStorage on mount
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    // Save favorites to localStorage whenever favorites change
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (dish: Dish) => {
    setFavorites(prev => {
      if (!prev.some(fav => fav.id === dish.id)) {
        return [...prev, dish];
      }
      return prev;
    });
  };

  const removeFromFavorites = (dishId: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== dishId));
  };

  const isFavorite = (dishId: string) => {
    return favorites.some(fav => fav.id === dishId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};