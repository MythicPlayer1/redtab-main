import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { create } from 'zustand';
import { API1 } from '../../providers/request';
import { useRecipientBillingPendingStore } from './use-recipient-billing-pending.store';

interface RecipientBillingPendingState {
  isLoading: boolean;
  error: string | null;
  verifySuccess: boolean;
  getRecipientBillingPending: (outlet__uuid: string) => Promise<void>;
}

export const useRecipientBillingPending = create< RecipientBillingPendingState>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  getRecipientBillingPending: async (outlet__uuid) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API1.get(`/receipt-to-pay/${outlet__uuid}`);
      set({ verifySuccess: true });
      useRecipientBillingPendingStore?.getState()?.setRecipientBillingPending(response?.data?.data);
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