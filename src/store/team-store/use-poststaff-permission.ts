import { AxiosResponse } from "axios";
import { create } from "zustand";
import { API } from "../../providers/request";
import { toast } from "react-toastify";

interface PostStaffPermissionState {
  isLoading: boolean;
  error: string | null;
  verifySuccess: boolean;
  postStaffPermission: (uuid: string, payload: string[]) => Promise<void>;
}

export const usePostStaffPermission = create<PostStaffPermissionState>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  postStaffPermission: async (uuid, payload) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.patch(`/staff-permission/${uuid}/`, {
        "permissions": payload
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
      set({ error: error.request || "An error occurred" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
