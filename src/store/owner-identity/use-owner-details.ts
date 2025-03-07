import { AxiosResponse } from "axios";
import { create } from "zustand";
import { toast } from "react-toastify";
import { API } from "../../providers/request";

interface OwnerDetails {
  isLoading: boolean;
  error: null | string;
  verifySuccess: boolean;
  verifyOwner: (payload: Record<string, unknown>) => Promise<void>;
}

export const useSubmitOwnerDetail = create<OwnerDetails>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  verifyOwner: async (payload: Record<string, unknown>) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.post(`/kyc/verify-owner/`, payload);
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
