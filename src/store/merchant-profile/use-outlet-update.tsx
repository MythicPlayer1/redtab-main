import { AxiosResponse } from "axios";
import { API } from "../../providers/request";
import { create } from "zustand";
import { toast } from "react-toastify";
import { useSelectedOutletUuidStore } from "./use-merchant-profile-outlet-store";

interface OutletProfile {
  isLoading: boolean;
  error: null;
  verifySuccess: boolean;
  updateOutletProfile: (payload: Record<string, unknown>, uuid: string) => Promise<void>;
}

export const useOutletProfileUpdate = create<OutletProfile>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  updateOutletProfile: async (payload: Record<string, unknown>, uuid) => {
   // const { setSelectedOutletName } = useSelectedOutletUuidStore();
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.put(`/outlet/outlet-update/${uuid}`, payload);
      set({ verifySuccess: true });
      toast.success(response.data.message);
      useSelectedOutletUuidStore?.getState()?.setSelectedOutletName(response?.data?.data.outlet_name);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isLoading: false });
    }
  }
}));




