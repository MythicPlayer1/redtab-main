import { AxiosResponse } from "axios";
import { API } from "../../providers/request";
import { create } from "zustand";
import { toast } from "react-toastify";

interface OwnerProfile {
  isLoading: boolean;
  error: null;
  verifySuccess: boolean;
  updateOwnerInfo: (outlet: string, payload: Record<string, unknown>) => Promise<void>;
}

export const useOwnerInfoUpdate = create<OwnerProfile>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  updateOwnerInfo: async (outlet, payload: Record<string, unknown>) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.patch(`/kyc/owner-details-update/${outlet}`, payload);
      set({ verifySuccess: true });
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
      set({ error: error?.message || "An error occurred" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
