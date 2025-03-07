import { create } from "zustand";
import { toast } from "react-toastify";
import { API1 } from "../../providers/request";
import { AxiosResponse } from "axios";
import { persist } from "zustand/middleware";

interface TransactionDetails {
  sctId: string;
  setSctId: (sctId: string) => void;
  txnTime: string;
  setTxnTime: (txnTime: string) => void;
}

export const useSuccessTransactionDataStore = create<TransactionDetails>() (
  persist(
    (set) => ({
      sctId: "",
      setSctId: (sctId) => set({ sctId }),
      txnTime: "",
      setTxnTime: (txnTime) => set({ txnTime }),
    }),
    {
      name: "success-transaction-data",
    }
  ) 
)

// store for creating edi transaction
interface EdiTransactionDetail {
  isLoading: boolean;
  error: null | string;
  verifySuccess: boolean;
  createEdiTransaction: (payload: Record<string, unknown>) => Promise<void>;
}

export const useCreateEdiTransaction = create<EdiTransactionDetail>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  createEdiTransaction: async (payload) => {
    const {setSctId, setTxnTime} = useSuccessTransactionDataStore.getState();
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API1.post(`/create-edi-transaction/`, payload);
      set({ verifySuccess: true });
      setSctId(response?.data?.data.sct_txn_id);
      setTxnTime(response?.data?.data.txn_time);
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
