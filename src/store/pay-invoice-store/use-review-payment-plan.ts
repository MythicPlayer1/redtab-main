import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { create } from 'zustand';
import { API1 } from '../../providers/request';
import { usePaymentPlanStore } from './use-review-payment-plan-store';

interface PaymentPlanState {
  isLoading: boolean;
  error: string | null;
  verifySuccess: boolean;
  paymentPlan: (payload: Record<string, unknown>) => Promise<void>;
}

export const usePaymentPlan = create<PaymentPlanState>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  paymentPlan: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API1.post(`/calculate-edi/`, {...payload});
      usePaymentPlanStore?.getState()?.setPaymentPlan(response?.data?.data)
      set({ verifySuccess: true });
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred");
      } else if (error.request) {
        toast.error("No response received from the server");
      } else {
        toast.error("Error setting up the request");
      }
      set({ error: error.message || "An error occurred" });
    } finally {
      set({ isLoading: false });
    }
  },
}));