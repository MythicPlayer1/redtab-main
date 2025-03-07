import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MerchantProfileData {
  uuid: string;
  merchant_name: string;
}
interface MerchantProfileState {
  merchantProfile: MerchantProfileData;
  setMerchantProfile: (data: MerchantProfileData) => void;
}

export const useMerchantProfileStore = create<MerchantProfileState>()(
  persist(
    (set) => ({
      merchantProfile: {} as MerchantProfileData,
      setMerchantProfile(merchantProfile: MerchantProfileData) {
        set({ merchantProfile });
      },
    }),

    {
      name: "merchant-getProfile-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({
        merchantProfile: state.merchantProfile,
      }),
    }
  )
);
