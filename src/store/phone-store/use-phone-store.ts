import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useStatusStore } from "./use-phone-status-store";

interface PhoneNumberState {
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  staffOutletPhoneNumber: string;
  setStaffOutletPhoneNumber: (staffOutletPhoneNumber: string) => void;
  merchantOrStaff: string;
  setMerchantOrStaff: (merchant_or_staff: string) => void;
}

export const usePhoneNumberStore = create<PhoneNumberState>()(
  persist(
    (set) => ({
      phoneNumber: "",
      setPhoneNumber: (phoneNumber: string) => {
        set({ phoneNumber });
        const { setStatus } = useStatusStore.getState();
        setStatus("check");
      },
      staffOutletPhoneNumber: "",
      setStaffOutletPhoneNumber: (staffOutletPhoneNumber: string) => {
        set({ staffOutletPhoneNumber });
      },
      merchantOrStaff: "",
      setMerchantOrStaff: (merchantOrStaff: string) => {
        set({ merchantOrStaff });
      }
    }),
    {
      name: "phone-number-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({ phoneNumber: state.phoneNumber, merchantOrStaff: state.merchantOrStaff, staffOutletPhoneNumber: state.staffOutletPhoneNumber }),
    }
  )
);
