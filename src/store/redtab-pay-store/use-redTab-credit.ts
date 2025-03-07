import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { create } from 'zustand';
import { API } from '../../providers/request';
import { useRedTabCreditListStore } from './use-redTab-credit-store';

interface RedTabCreditState {
  isLoading: boolean;
  error: string | null;
  verifySuccess: boolean;
  getRedTabCredit: (outlet:string) => Promise<void>;
}

export const useRedTabCredit = create<RedTabCreditState>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  getRedTabCredit: async (outlet) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.get(`/outlet-credit/${outlet}/`);
      set({ verifySuccess: true });
      useRedTabCreditListStore?.getState()?.setRedTabCreditList(response?.data?.data);
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