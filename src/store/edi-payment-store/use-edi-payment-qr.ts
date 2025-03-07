import { create } from "zustand";
import { toast } from "react-toastify";
import { API1 } from "../../providers/request";
import { AxiosResponse } from "axios";
import { persist } from "zustand/middleware";

// store for edi qr payment
interface QrData {
    Payload: string;
    Status: string;
}

interface QrDetailsState {
    qrData: QrData;
    setQrData: (edi: QrData) => void;
    transactionId: string;
    setTransactionId: (transactionId: string) => void;
}

export const useEdiQrPaymentStore = create<QrDetailsState>()(
    persist(
      (set) => ({
        transactionId: "",
        setTransactionId: (transactionId: string) => {
          set({ transactionId });
        },
        qrData: { Payload: "", Status: "" },
        setQrData: (qrData: QrData) => {
          set({ qrData });
        },
      }),
      {
        name: "edi-qr-payment-storage",
        getStorage: () => localStorage,
        partialize: (state) => ({
          transactionId: state.transactionId,
          qrData: state.qrData,
        }),
      }
    )
);


interface EdiQrPaymentDetails {
  isLoading: boolean;
  error: null | string;
  verifySuccess: boolean;
  ediPaymentQr: (payload: Record<string, unknown>) => Promise<void>;
}

export const useEdiQrPayment = create<EdiQrPaymentDetails>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  ediPaymentQr: async (payload) => {
   const {setTransactionId, setQrData} = useEdiQrPaymentStore.getState();
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API1.post(`/credit-edi-payment-qr/`, payload);
      setTransactionId(response?.data?.data.data.transaction_id);
      setQrData(response?.data?.data.data.qr_data);
      set({ verifySuccess: true });
      toast.success(response.data.data.data.qr_data.Message)
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
