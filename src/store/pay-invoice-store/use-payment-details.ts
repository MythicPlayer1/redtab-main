import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { API1 } from "../../providers/request";
import { usePaidTransactionStore } from "./use-payment-details-store";

interface PaymentDetailsState {
  isLoading: boolean;
  error: string | null;
  verifySuccess: boolean;
  paidTransaction: (invoice_number: string, outlet_uuid: string) => Promise<void>;
}

export const usePaidTransactionDetails = create<PaymentDetailsState>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  paidTransaction: async (invoice_number, outlet_uuid) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API1.get(`/transaction/transaction-retrieve/${invoice_number}/${outlet_uuid}`);
      set({ verifySuccess: true });
      usePaidTransactionStore?.getState()?.setPaidAmount(response?.data?.data)
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
