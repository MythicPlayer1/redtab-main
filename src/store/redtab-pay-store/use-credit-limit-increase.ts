import { create } from "zustand";
import { toast } from "react-toastify";
import { API } from "../../providers/request";
import { AxiosResponse } from "axios";

interface creditLimitDetails {
  isLoading: boolean;
  error: null | string;
  verifySuccess: boolean;
  creditLimitIncrease: (payload: Record<string, unknown>) => Promise<void>;
}

export const useCreditLimitIncrease = create<creditLimitDetails>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  creditLimitIncrease: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.post(`/credit-request/`, {
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
