import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the interface for credit pay data
export interface CreditPayData {
  redtab_transaction_id: string;
  transaction_time: string;
  transaction_amount: number;
  receiver_name:string;
}

// Define the interface for the store
interface CreditPayStoreType {
  creditPay: CreditPayData | null;
  setCreditPay: (data: CreditPayData) => void;
}

// Persist the credit pay data in localStorage
export const usecreditPayStore = create<CreditPayStoreType>()(
  persist(
    (set) => ({
      creditPay: null,
        setCreditPay: (data: CreditPayData) => {
        set({ creditPay: data });
      },
    }),
    {
      name: "credit-pay-storage", 
      getStorage: () => localStorage,
      partialize: (state) => ({ creditPay: state.creditPay }),
    }
  )
);

