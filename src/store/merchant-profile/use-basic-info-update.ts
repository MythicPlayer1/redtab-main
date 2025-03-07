import { AxiosResponse } from "axios";
import { API } from "../../providers/request";
import { create } from "zustand";
import { toast } from "react-toastify";

interface OutletProfile {
  isLoading: boolean;
  error: null;
  verifySuccess: boolean;
  updateLocation: (outlet: string, payload: Record<string, unknown>) => Promise<void>;
  updateContact: (outlet: string, payload: Record<string, unknown>) => Promise<void>;
}

export const useBasicInfoUpdate = create<OutletProfile>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  updateLocation: async (outlet, payload: Record<string, unknown>) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.patch(`/kyc/location-details-update/${outlet}`, payload);
      set({ verifySuccess: true });
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
      set({ error: error?.message || "An error occurred" });
    } finally {
      set({ isLoading: false });
    }
  },
  updateContact: async (outlet, payload: Record<string, unknown>) => {

    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.patch(`/kyc/contact-details-update/${outlet}`, payload);
      set({ verifySuccess: true });
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
      set({ error: error?.message || "An error occurred" });
    } finally {
      set({ isLoading: false });
    }
  }
}));
