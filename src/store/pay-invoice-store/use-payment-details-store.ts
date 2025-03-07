import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the interface for paid transaction data
export interface PaidTransactionData {
  redtab_transaction_id: string;
  transaction_time: string;
  amount: number;
  seller_name:string;
  buyer_name: string;
}

// Define the interface for the store
interface PaidTransactionStoreType {
  paidAmount:  PaidTransactionData | null;
  setPaidAmount: (data:  PaidTransactionData) => void;
}

// Persist the paid transaction data in localStorage
export const usePaidTransactionStore = create<PaidTransactionStoreType>()(
  persist(
    (set) => ({
        paidAmount: null,
        setPaidAmount: (data:  PaidTransactionData) => {
        set({ paidAmount: data });
      },
    }),
    {
      name: "paid-transaction-details-storage", 
      getStorage: () => localStorage,
      partialize: (state) => ({paidAmount: state.paidAmount }),
    }
  )
);

