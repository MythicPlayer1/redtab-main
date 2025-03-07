import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the interface for payment plan data
export interface PaymentPlanData {
  interest: number;
  service_fee: number;
  total: number;
  per_day: number;
}

// Define the interface for the store
interface PaymentPlanStoreType {
  paymentPlan: PaymentPlanData | null;
  setPaymentPlan: (data: PaymentPlanData) => void;
}

// Persist the payment plan data in localStorage
export const usePaymentPlanStore = create<PaymentPlanStoreType>()(
  persist(
    (set) => ({
        paymentPlan: null,
        setPaymentPlan: (data: PaymentPlanData) => {
        set({ paymentPlan: data });
      },
    }),
    {
      name: "payment-plan-storage", 
      getStorage: () => localStorage,
      partialize: (state) => ({ paymentPlan: state.paymentPlan }),
    }
  )
);

