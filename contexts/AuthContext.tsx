'use client';

import { User } from '@/lib/generated/prisma';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';



interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: true; user: User } | { success: false; error: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: true; user: User }  | { success: false; error: string }>;
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

  const login = async (email: string, password: string): Promise<{ success: true; user: User } | { success: false; error: string }> => {
    setIsLoading(true);
    
    // API call
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          // Include other headers if needed (like authorization)
        },
        body: JSON.stringify({
          email: email,
          password: password
          // Consider adding client-side validation before sending
        }),
      });
      console.log('ola')
      if (!res.ok) {
        const errorData = await res.json();
        return { success: false, error: errorData.error };
      }

      const data = await res.json();
      // Handle successful response
      console.log("Login successful:", data.user);
      // Mock authentication with role assignment
      if (email && password) {
        let role: 'customer' | 'waitress' | 'admin' = 'customer';
        
        if (email.includes('waitress')) {  // TODO change verification 
          role = 'waitress';
        } else if (email.includes('admin')) {
          role = 'admin';
        }
        
        // const mockUser: User = {  //necessary??
        //   id: Math.random().toString(36).substr(2, 9),
        //   name: email.split('@')[0],
        //   email: email,
        //   avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=f59e0b&color=fff`,
        //   role: role
        // };
        
        setUser(data.user);
        localStorage.setItem('restaurant-user', JSON.stringify(data.user));
        return { success: true, user: data.user };
      } else {
        return { success: false, error : 'Invalid credentials'}; 
      }
      
    } catch (error) {
      // Handle network errors or API errors
      console.error("Login error:", error);
      // Show user-friendly error message to the user
      return { success: false, error: "Problem contacting the api" };
      // Show user-friendly error message to the user
    }finally {
      setIsLoading(false);
    }
    
    
  };

  const signup = async (name: string, email: string, password: string): Promise<{ success: true; user: User } | { success: false; error: string }> => {
    setIsLoading(true);
    // API call
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          // Include other headers if needed (like authorization)
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name
          // Consider adding client-side validation before sending
        }),
      });

      if (!res.ok) {
        
        const errorData = await res.json();
        return { success: false, error: errorData.error };
      }

      const data = await res.json();
      // Handle successful response
      console.log("Signup successful:", data);
      // Mock authentication with role assignment
      if (email && password) {
        let role: 'customer' | 'waitress' | 'admin' = 'customer';
        
        if (email.includes('waitress')) {  // TODO change verification 
          role = 'waitress';
        } else if (email.includes('admin')) {
          role = 'admin';
        }
        
        // const mockUser: User = {  //necessary??
        //   // id: Math.random().toString(36).substr(2, 9),
        //   firstName: name,
        //   email: email,
        //   avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=f59e0b&color=fff`,
        //   role: role
        // };
        
        setUser(data.user);
        localStorage.setItem('restaurant-user', JSON.stringify(data.user));
        setIsLoading(false);
        return { success: true, user: data.user };
      } else {
        return { success: false, error : 'Invalid credentials'}; 
      }
      
      
      
    } catch (error) {
      // Handle network errors or API errors
      console.error("Signup error:", error);
      setIsLoading(false);
      return { success: false, error: "Problem contacting the api" };
      // Show user-friendly error message to the user
    }finally {
      setIsLoading(false);
    }
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