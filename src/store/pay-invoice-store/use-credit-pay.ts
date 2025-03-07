import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { create } from 'zustand';
import { API, API1 } from '../../providers/request';
import { usecreditPayStore } from './use-credit-pay-store';

interface CreditPayState {
  isLoading: boolean;
  error: string | null;
  verifySuccess: boolean;
  creditPay: (payload: Record<string, unknown>) => Promise<void>;
  creditCheck: (payload: Record<string, unknown>) => Promise<void>;
}

export const useCreditPay = create<CreditPayState>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  creditPay: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API1.post(`/pay-with-credit/`, {...payload});
      set({ verifySuccess: true });
      usecreditPayStore?.getState()?.setCreditPay(response?.data?.data);
      toast.success(response.data.message);
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
  creditCheck: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.post(`/credit-check/`, {
        ...payload,
      });
      set({ verifySuccess: true });
      toast.success(response.data.message);
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