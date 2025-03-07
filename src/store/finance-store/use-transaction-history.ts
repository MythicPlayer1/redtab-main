import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { create } from 'zustand';
import { API1 } from '../../providers/request';

interface ProductDetails {
  uuid: string;
  product_name: string;
}
export interface TransactionHistoryData {
  status: string;
  uuid: string;
  amount: number;
  paid_with: string;
  products: ProductDetails[];
  updated_at: string;
}
interface TransactionHistoryState {
  isLoading: boolean;
  error: string | null;
  verifySuccess: boolean;
  getTransactionHistory: (uuid:string) => Promise<TransactionHistoryData[]>;
}

export const useTransactionHistory = create<TransactionHistoryState>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  getTransactionHistory: async (uuid) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API1.get(`/transaction/transaction-history/?outlet__uuid=${uuid}`);
      set({ verifySuccess: true });
      return response?.data?.data;
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message || 'An error occurred');
      } else if (error.request) {
        toast.error("No response received from the server");
      } else {
        toast.error("Error setting up the request");
      }
      set({ error: error.message || "An error occurred" });
      return [];
    } finally {
      set({ isLoading: false });
    }
  },
}));