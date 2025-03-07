import { AxiosResponse } from "axios";
import { API } from "../../providers/request";
import { create } from "zustand";
import { toast } from "react-toastify";
import { useMerchantProfileOutletListStore } from "./use-merchant-profile-outlet-store";

interface MerchantProfile {
  isLoading: boolean;
  error: null;
  verifySuccess: boolean;
  getMerchantProfileOutlet: (merchant_profile_uuid: string) => Promise<void>;
}
export const useGetMerchantProfileOutlet = create<MerchantProfile>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  getMerchantProfileOutlet: async (merchant_profile_uuid) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.get(`/outlet/merchant-profile-outlet-list/${merchant_profile_uuid}`);
      useMerchantProfileOutletListStore?.getState()?.setMerchantOutletList(response.data.data);
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
