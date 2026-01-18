'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Staff } from '@prisma/client';
import { StaffMember } from '@/app/admin/staff/page';

interface StaffState {
  currentStaff: Staff | null;
  staffList: Staff[];
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<void>;
  registerStaff: (staffData: StaffMember, password: string | null ) => Promise<void>;
  logout: () => void;
  fetchStaff: (staffId: number, token: string) => Promise<void>;
  updateStaff: (staffId: number | undefined, updates: Partial<Staff>, token: string) => Promise<void>;
  deleteStaff: (staffId: number | undefined, token: string) => Promise<void>;
  fetchAllStaff: (token: string) => Promise<void>;
}

export const useStaffStore = create<StaffState>()(
  persist(
    (set, get) => ({
      currentStaff: null,
      staffList: [],
      isLoading: false,
      error: null,
      isAuthenticated: false,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch('/api/staff/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Login failed');
          }

          const { staff, token } = await res.json();
          set({ 
            currentStaff: staff,
            isAuthenticated: true,
            isLoading: false 
          });
          // You might want to store the token in cookies or secure storage
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Login failed';
          set({ error: errorMsg, isLoading: false });
        }
      },

      registerStaff: async (staffData, password) => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch('/api/staff/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...staffData, password }),
          });

          if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Registration failed');
          }

          const { staff } = await res.json();
          set({ 
            currentStaff: staff,
            isAuthenticated: true,
            isLoading: false 
          });
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Registration failed';
          set({ error: errorMsg, isLoading: false });
        }
      },

      logout: () => {
        set({ 
          currentStaff: null,
          isAuthenticated: false,
          staffList: [],
          error: null
        });
        // Clear token from cookies or storage
      },

      fetchStaff: async (staffId, token) => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch(`/api/staff/${staffId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Failed to fetch staff');
          }

          const staff = await res.json();
          set({ currentStaff: staff, isLoading: false });
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Unknown error';
          set({ error: errorMsg, isLoading: false });
        }
      },

      updateStaff: async (staffId, updates, token) => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch(`/api/staff/${staffId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updates),
          });

          if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Failed to update staff');
          }

          const updatedStaff = await res.json();
          set((state) => ({
            currentStaff: state.currentStaff?.id === staffId ? updatedStaff : state.currentStaff,
            staffList: state.staffList.map((s) => s.id === staffId ? updatedStaff : s),
            isLoading: false,
          }));
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Unknown error';
          set({ error: errorMsg, isLoading: false });
        }
      },

      deleteStaff: async (staffId, token) => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch(`/api/staff/${staffId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Failed to delete staff');
          }

          set((state) => ({
            currentStaff: state.currentStaff?.id === staffId ? null : state.currentStaff,
            staffList: state.staffList.filter(s => s.id !== staffId),
            isLoading: false,
          }));
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Unknown error';
          set({ error: errorMsg, isLoading: false });
        }
      },

      fetchAllStaff: async (token) => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch('/api/staff', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Failed to fetch staff list');
          }

          const staffList = await res.json();
          set({ staffList, isLoading: false });
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Unknown error';
          set({ error: errorMsg, isLoading: false });
        }
      },
    }),
    {
      name: 'staff-storage',
      partialize: (state) => ({ 
        currentStaff: state.currentStaff,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);