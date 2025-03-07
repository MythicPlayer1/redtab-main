import { create } from "zustand";
import { toast } from "react-toastify";
import { API1 } from "../../providers/request";
import { AxiosResponse } from "axios";
import { persist } from "zustand/middleware";

// persist response of check edi transaction
interface EdiTransactionData {
  status: string;
  setStatus: (status: string) => void;
}

export const useEdiTransactionResponse = create<EdiTransactionData>()(
  persist(
    (set) => ({
      status: "",
      setStatus: (status: string) => {
        set({ status });
      },
    }),
    {
      name: "edi-check-transaction-response",
      getStorage: () => localStorage,
      partialize: (state) => ({
        status: state.status,
      }),
    }
  )
);

// store for check edi transaction
interface EdiTransactionDetails {
  isLoading: boolean;
  error: null | string;
  verifySuccess: boolean;
  checkEdiTransaction: (payload: Record<string, unknown>) => Promise<void>;
}

export const useCheckEdiTransaction = create<EdiTransactionDetails>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  checkEdiTransaction: async (payload) => {
    const {setStatus} = useEdiTransactionResponse.getState();
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API1.post(`/check-edi-transaction/`, payload);
      setStatus(response?.data?.data.Status);
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
