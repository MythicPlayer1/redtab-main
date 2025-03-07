import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { create } from 'zustand';
import { API } from '../../providers/request';

// Interface for the staff list state
interface StaffListState {
  isLoading: boolean;
  error: string | null;
  verifySuccess: boolean;
  setVerifySuccess: (value: boolean) => void;
  editStaffUsername: (uuid:string, payload: Record<string, unknown>) => Promise<void>;
}

// Create the store for the staff list state
export const useEditStaffUsername = create<StaffListState>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  editStaffUsername: async (uuid, payload) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.put(`/staff-pin-change/${uuid}`, {...payload});
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
  setVerifySuccess: (value) => set({ verifySuccess: value }), 
}));