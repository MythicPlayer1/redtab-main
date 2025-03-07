import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the interface for RedTabCreditData
export interface RedTabCreditData {
  outlet: string;
  credit_limit: number;
  credit_used: number;
  credit_remaining: number;
}

// Define the interface for the store
interface RedTabCreditStoreType {
  redTabCreditList: RedTabCreditData | null;
  setRedTabCreditList: (data: RedTabCreditData) => void;
}

// Persist the redTabCreditList in localStorage
export const useRedTabCreditListStore = create<RedTabCreditStoreType>()(
  persist(
    (set) => ({
      redTabCreditList: null,
      setRedTabCreditList: (data: RedTabCreditData) => {
        set({ redTabCreditList: data });
      },
    }),
    {
      name: "redtab-credit-storage", 
      getStorage: () => localStorage,
      partialize: (state) => ({ redTabCreditList: state.redTabCreditList }),
    }
  )
);

