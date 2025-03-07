import { create } from "zustand";
import { toast } from "react-toastify";
import { API } from "../../providers/request";
import { AxiosResponse } from "axios";

interface staffDetails {
  uuid: string | null;
  isLoading: boolean;
  error: null | string;
  verifySuccess: boolean;
  createStaff: (payload: Record<string, unknown>) => Promise<void>;
  staffName: string;
  setStaffName: (staffName: string) => void;
  staffPhone: string;
  setStaffPhone: (staffPhone: string) => void;
}

export const useCreateStaffDetail = create<staffDetails>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  staffName: "",
  setStaffName: (staffName: string) => {
    set({ staffName });
  },
  staffPhone: "",
  setStaffPhone: (staffPhone: string) => {
    set({ staffPhone });
  },
  uuid: null,
  createStaff: async (payload: Record<string, unknown>) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.post(`/staff-create/`, {
        ...payload,
      });
      set({ verifySuccess: true });
      sessionStorage.setItem('staffUuid', response?.data?.data.uuid);
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
