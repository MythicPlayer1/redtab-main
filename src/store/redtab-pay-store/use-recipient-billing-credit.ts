import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { create } from 'zustand';
import { API1 } from '../../providers/request';

interface BillingDetails {
  uuid:string;
  product_name: string;
}

export interface RecipientBillingData {
  uuid: string;
  buyer_name: string;
  billing_details: BillingDetails[];
  total_sales: number;  
  datetime_client: string;
}
interface RecipientBillingCreditState {
  isLoading: boolean;
  error: string | null;
  verifySuccess: boolean;
  getRecipientBillingCredit: (uuid: string) => Promise<RecipientBillingData[]>;
}

export const useRecipientBillingCredit = create<RecipientBillingCreditState>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  getRecipientBillingCredit: async (uuid) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API1.get(`/recipient-billing/credit/?outlet__uuid=${uuid}`);
      set({ verifySuccess: true });
      return response?.data?.data;
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred");
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