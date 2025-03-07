import { AxiosResponse } from "axios";
import { API } from "../../providers/request";
import { create } from "zustand";
import { toast } from "react-toastify";
import { useMerchantContactStore } from "./use-merchant-contact-store";
import { persist } from "zustand/middleware";
import { useLoginStatusStore } from "../login-status-store/use-login-status-store";
import { useCreateOutletProfile } from "../kyc/use-create-outlet-profile";
import { useSelectedOutletUuidStore } from "./use-merchant-profile-outlet-store";

interface MerchantProfile {
  isLoading: boolean;
  error: null;
  verifySuccess: boolean;
  createMerchantProfile: (payload: Record<string, unknown>) => Promise<void>;
  updateMerchantProfile: (payload: Record<string, unknown>, uuid: string) => Promise<void>;
}

interface MerchantProfileType {
  merchantProfileUUID: string;
  setMerChantProfileUUID: (merchantProfileUUID: string) => void;
}

export const useMerchantProfile = create<MerchantProfileType>()(
  persist(
    (set) => ({
      merchantProfileUUID: "" as string,
      setMerChantProfileUUID: (merchantProfileUUID: string) => {
        set({ merchantProfileUUID });
      },
    }),
    {
      name: "merchant-profile-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({ merchantProfileUUID: state.merchantProfileUUID }),
    }
  )
);

export const useCreateMerchantProfile = create<MerchantProfile>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  createMerchantProfile: async (payload: Record<string, unknown>) => {
    set({ isLoading: true, error: null });
    const { bizTypeValue, setMerchantProfile, setMerchantName } = useMerchantContactStore.getState();
    const { setMerChantProfileUUID } = useMerchantProfile.getState();
    const { createOutletProfile } = useCreateOutletProfile.getState();

    try {
      const response: AxiosResponse = await API.post(`/merchant-profile/profile-create/`, payload);
      setMerchantProfile(response?.data?.data?.uuid);
      setMerChantProfileUUID(response?.data?.data?.uuid);
      setMerchantName(payload.merchant_name as string);
        await createOutletProfile({business_type: bizTypeValue, outlet_name: payload.merchant_name, merchant_profile: response?.data?.data?.uuid});
      useLoginStatusStore.getState().setMerchantProfileUUID([response?.data?.data]);
      useLoginStatusStore.getState().setMerchantProfileUUID(response?.data?.data?.uuid);
      set({ verifySuccess: true });
     // toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isLoading: false });
    }
  },
  updateMerchantProfile: async (payload: Record<string, unknown>, uuid) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.put(`/merchant-profile/self-profile-update/${uuid}`, payload);
      set({ verifySuccess: true });
      toast.success(response.data.message);
      useSelectedOutletUuidStore?.getState()?.setSelectedOutletName(response?.data?.data.merchant_name);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isLoading: false });
    }
  }
}));




