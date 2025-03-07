import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MerchantContactState {
  phoneNumber: string;
  email: string;
  name: string;
  setMerchantPhoneNumber: (phoneNumber: string) => void;
  setMerchantEmail: (email: string) => void;
  setMerchantName: (name: string) => void;
  merchantProfile: string;
  setMerchantProfile: (merchantProfile: string) => void;
  types: string[];
  setTypes: (types: string[])=>void; 
  bizTypeValue: string;
  setBizTypeValue: (bizTypeValue: string) => void;
  merchantUpdateStatus: boolean;
  setMerchantUpdateStatus: (merchantUpdateStatus: boolean) => void;
}

export const useMerchantContactStore = create<MerchantContactState>()(
  persist(
    (set) => ({
      phoneNumber: "",
      setMerchantPhoneNumber: (phoneNumber: string) => {
        set({ phoneNumber });
      },
      email: "",
      setMerchantEmail(email: string) {
        set({ email });
      },
      name: "",
      setMerchantName(name: string) {
        set({ name });
      },
      merchantProfile: "",
      setMerchantProfile(merchantProfile: string) {
        set({ merchantProfile });
      },
      bizTypeValue: "",
      setBizTypeValue(bizTypeValue: string) {
       set({ bizTypeValue })   
      },
      types: [] as string[],
      setTypes: (types: string[]) => set({types}),
      merchantUpdateStatus: false,
      setMerchantUpdateStatus: (merchantUpdateStatus: boolean) => set({merchantUpdateStatus}),
    }),

    {
      name: "merchant-contact-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({
        phoneNumber: state.phoneNumber,
        email: state.email,
        merchantProfile: state.merchantProfile,
        name: state.name,
        bizTypeValue: state.bizTypeValue,
        merchantUpdateStatus: state.merchantUpdateStatus,
      }),
    }
  )
);
