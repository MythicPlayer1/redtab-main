import { create } from "zustand";
import { toast } from "react-toastify";
import { API1 } from "../../providers/request";
import { AxiosResponse } from "axios";
import { persist } from "zustand/middleware";

interface EdiData {
    total: number;
    daily_amount: number;
}

interface EdiDetailsState {
    edi: EdiData;
    setEdi: (edi: EdiData) => void;
}

export const useEdiCalculateStore = create<EdiDetailsState>()(
    persist(
      (set) => ({
        edi: { total: 0, daily_amount: 0 },
        setEdi: (edi: EdiData) => {
          set({ edi });
        },
      }),
      {
        name: "edi-calculate-storage",
        getStorage: () => localStorage,
        partialize: (state) => ({
          edi: state.edi,
        }),
      }
    )
);

interface EdiDetails {
  isLoading: boolean;
  error: null | string;
  verifySuccess: boolean;
  calculateEdi: (outlet: string) => Promise<void>;
}

export const useCalculateEdi = create<EdiDetails>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  calculateEdi: async (outlet) => {
    const {setEdi} = useEdiCalculateStore.getState();
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API1.get(`/credit-edi-calculate/${outlet}`);
      setEdi(response?.data?.data);
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
