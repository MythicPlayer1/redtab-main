import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { create } from 'zustand';
import { API } from '../../providers/request';

interface StaffListState {
  isLoading: boolean;
  error: string | null;
  verifySuccess: boolean;
 getStaffList: (outlet_uuid: string) => Promise<any[]>;
}

export const useHandleStaffList = create<StaffListState>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  getStaffList: async (outlet_uuid) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.get(`/staff-list/?outlet_uuid=${outlet_uuid}`);
    set({ verifySuccess: true });
    return response?.data?.data;   
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred");
      } else if (error.request) {
        toast.error("No response received from the server");
      } else {
        toast.error("Error setting up the request");
      }
      set({ error: error.message || "An error occurred" });
      return [];
    } finally {
      set({ isLoading: false });
    }
  },
}));