import { AxiosResponse } from "axios";
import { API } from "../../providers/request";
import { create } from "zustand";
import { toast } from "react-toastify";
import { useMerchantProfileStore } from "./use-merchant-profile-store";

interface MerchantProfile {
  isLoading: boolean;
  error: null;
  verifySuccess: boolean;
  getMerchantProfile: (uuid: string) => Promise<void>;
}
export const useGetMerchantProfile = create<MerchantProfile>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  getMerchantProfile: async (uuid) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.get(`/merchant-profile/profile-retrieve/${uuid}`);
      useMerchantProfileStore?.getState()?.setMerchantProfile(response?.data?.data);
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
}));
