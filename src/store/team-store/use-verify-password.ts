import { create } from "zustand";
import { toast } from "react-toastify";
import { API } from "../../providers/request";
import { AxiosResponse } from "axios";

interface staffDetails {
  isLoading: boolean;
  error: null | string;
  verifySuccess: boolean;
  setVerifySuccess: (value: boolean) => void;
  verifyPassword: (payload: Record<string, unknown>) => Promise<void>;
}

export const useVerifyPassword = create<staffDetails>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  verifyPassword: async (payload: Record<string, unknown>) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.post(`/verify-password/`, {
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
  setVerifySuccess: (value) => set({ verifySuccess: value })
}));
