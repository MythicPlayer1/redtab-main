import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { create } from 'zustand';
import { API } from '../../providers/request';
import { useStaffListStore } from './use-staff-list-store';

interface StaffListState {
  isLoading: boolean;
  error: string | null;
  verifySuccess: boolean;
  deleteStaff: (uuid:string) => Promise<void>;
}

export const useDeleteStaff = create<StaffListState>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  deleteStaff: async (uuid) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.delete(`/staff/${uuid}`);

        //check for successful response
        if(response.status === 200){
          const updatedStaffList = useStaffListStore?.getState().staffList.filter(staffList => staffList.uuid !== uuid);  
       
       //update the staffList after delete
        useStaffListStore?.getState().setStaffList(updatedStaffList)
      }
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