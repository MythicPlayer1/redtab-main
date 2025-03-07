import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { create } from 'zustand';
import { API } from '../../providers/request';
import { useOutletStore } from './use-basic-outlet-info-store';

interface OutletInfoState {
  isLoading: boolean;
  error: string | null;
  verifySuccess: boolean;
  sellerOutletInfo: (sellerUUID:string) => Promise<void>;
  buyerOutletInfo: (buyerUUID:string) => Promise<void>;
}

export const useOutletInfo = create<OutletInfoState>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  sellerOutletInfo: async (sellerUUID) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.get(`/outlet/basic-outlet-info/${sellerUUID}`);
      set({ verifySuccess: true });
      useOutletStore?.getState()?.setSellerInfo(response?.data?.data)
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
  buyerOutletInfo: async (buyerUUID) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.get(`/outlet/basic-outlet-info/${buyerUUID}`);
      set({ verifySuccess: true });
      useOutletStore?.getState()?.setBuyerInfo(response?.data?.data)
    } catch (error: any) {
        toast.error(error.response);
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
  }
}));