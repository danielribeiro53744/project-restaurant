'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Costumer } from '@prisma/client';
import { useAuth } from '@/contexts/AuthContext';

interface CostumerState {
  currentCostumer: Costumer | null;
  Costumers: Costumer[];
  isLoading: boolean;
  error: string | null;

  fetchCostumer: (costumerId: Number, token: string) => Promise<void>;
  updateCostumer: (costumerId: Number, updates: Partial<Costumer>, token: string) => Promise<void>;
  deleteCostumer: (costumerId: Number, token: string) => Promise<void>;
  fetchAllCostumers: () => Promise<void>;
}

export const useCostumerStore = create<CostumerState>()(
  persist(
    (set, get) => ({
      currentCostumer: null,
      Costumers: [],
      isLoading: false,
      error: null,

      fetchCostumer: async (costumerId, token) => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch(`/api/costumer/${costumerId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Failed to fetch customer');
          }

          const costumer = await res.json();
          set({ currentCostumer: costumer, isLoading: false });
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Unknown error';
          set({ error: errorMsg, isLoading: false });
        }
      },

      updateCostumer: async (costumerId, updates, token) => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch(`/api/costumer/${costumerId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updates),
          });

          if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Failed to update customer');
          }

          const updatedCostumer = await res.json();
          set((state) => ({
            currentCostumer: state.currentCostumer?.id === costumerId ? updatedCostumer : state.currentCostumer,
            Costumers: state.Costumers.map((c) => c.id === costumerId ? updatedCostumer : c),
            isLoading: false,
          }));
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Unknown error';
          set({ error: errorMsg, isLoading: false });
        }
      },

      deleteCostumer: async (costumerId, token) => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch(`/api/costumer/${costumerId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Failed to delete customer');
          }

          set((state) => ({
            currentCostumer: state.currentCostumer?.id === costumerId ? null : state.currentCostumer,
            Costumers: state.Costumers.filter(c => c.id !== costumerId),
            isLoading: false,
          }));
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Unknown error';
          set({ error: errorMsg, isLoading: false });
        }
      },

      fetchAllCostumers: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch('/api/costumer', {
            headers: {
              'Authorization': `Bearer `,
            },
          });

          if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Failed to fetch customers');
          }

          const costumers = await res.json();
          set({ Costumers: costumers, isLoading: false });
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Unknown error';
          set({ error: errorMsg, isLoading: false });
        }
      },
    }),
    {
      name: 'costumer-storage',
    }
  )
);
