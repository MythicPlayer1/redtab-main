import { AxiosResponse } from "axios";
import { API } from "../../providers/request";
import { create } from "zustand";
import { toast } from "react-toastify";

interface OutletDocsProfile {
  isLoading: boolean;
  error: null;
  verifySuccess: boolean;
  updatePanInfo: (outlet: string, payload: Record<string, unknown>) => Promise<void>;
  updateCompanyDocs: (outlet: string, payload: Record<string, unknown>) => Promise<void>;
}

export const useOutletInfoUpdate = create<OutletDocsProfile>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  updatePanInfo: async (outlet, payload: Record<string, unknown>) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.patch(`/kyc/pan-details-retrieve-update/${outlet}`, payload);
      set({ verifySuccess: true });
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
      set({ error: error?.message || "An error occurred" });
    } finally {
      set({ isLoading: false });
    }
  },
  updateCompanyDocs: async (outlet, payload: Record<string, unknown>) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.patch(`/kyc/company-register-details-update/${outlet}`, payload);
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
