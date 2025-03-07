import { AxiosResponse } from "axios";
import { API } from "../../providers/request";
import { create } from "zustand";
import { toast } from "react-toastify";

interface PanDetails {
  isLoading: boolean;
  error: null;
  verifySuccess: boolean;
  submitPanDetail: (payload: Record<string, unknown>) => Promise<void>;
  registerCompany: (payload: Record<string, unknown>) => Promise<void>
  createIRDProfile: (payload: Record<string, unknown>) => Promise<void>
}

export const useSubmitPanDetail = create<PanDetails>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  submitPanDetail: async (payload: Record<string, unknown>) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.post(`/kyc/pan-details/`, {
        ...payload
      });
      set({ verifySuccess: true });
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error?.response?.data.message || "An error occurred");
      set({ error: error.message || "An error occurred" });
      set({ verifySuccess: false });
    } finally {
      set({ isLoading: false });
    }
  },
  registerCompany: async (payload: Record<string, unknown>) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.post(`/kyc/company-register/`, {
        ...payload
      });
      set({ verifySuccess: true });
      toast.success(response.data.message);
    } catch (error: any) {
      console.log(error.response.data.message)
      toast.error(error.response.data.message || "An error occurred");
      set({ error: error.message || "An error occurred" });
      set({ verifySuccess: false });
    } finally {
      set({ isLoading: false });
    }
  },
  createIRDProfile: async (payload: Record<string, unknown>) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.post(`/ird-profile/create/`, {
        ...payload
      });
      set({ verifySuccess: true });
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.data.message || "An error occurred");
      set({ error: error.message || "An error occurred" });
      set({ verifySuccess: false });
    } finally {
      set({ isLoading: false });
    }
  }
}));
