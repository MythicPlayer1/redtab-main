import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { create } from 'zustand';
import { API } from '../../providers/request';
import { useStaffPermissionStore } from './use-staff-permission-store';

interface Permission {
  uuid: string;
}
interface GetStaffPermissionState {
  isLoading: boolean;
  error: string | null;
  verifySuccess: boolean;
  permissionUuids: string[];
  getStaffPermission: () => Promise<void>;
  getUpdatedStaffPermission: (uuid: string) => Promise<string[]>;
}

export const useGetStaffPermission = create<GetStaffPermissionState>((set) => ({
  isLoading: false,
  error: null,
  permissionUuids: [],
  verifySuccess: false,
  getStaffPermission: async () => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.get(`/staff-permission/`);
      useStaffPermissionStore?.getState().setPermissionList(response?.data?.data);
      set({ verifySuccess: true });
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
  getUpdatedStaffPermission: async (uuid) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.get(`/staff-permission/${uuid}`);
      const permissions = response.data.data.permissions;
      const uuids = permissions.map((perm: { permission: Permission }) => perm.permission.uuid);
      set({ verifySuccess: true });
      return uuids;
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