import { create } from "zustand";
import { persist } from "zustand/middleware";
interface StaffCreateState {
  fullName: string;
  setfullName: (fullName: string) => void;
  phoneNo: string;
  setPhoneNo: (phoneNo: string) => void;
  pin: string;
  setPin: (pin: string) => void;
  confirmPin: string;
  setConfirmPin: (confirmPin: string) => void;
  outlet: string;
  setOutlet: (outlet: string) => void;
}
export const useStaffCreateStore = create<StaffCreateState>()(
  persist(
    (set) => ({
      fullName: "",
      setfullName(fullName: string) {
        set({ fullName });
      },
      phoneNo: '',
      setPhoneNo(phoneNo: string){
        set({phoneNo})
      },
      pin: '',
      setPin(pin: string){
        set({pin})
      },
      confirmPin: '',
      setConfirmPin(confirmPin: string){
        set({confirmPin})
      },
      outlet: "",
      setOutlet(outlet: string) {
        set({ outlet });
      },
    }),
    {
      name: "staff-creation-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({
        phone: state.phoneNo,
        pin: state.pin,
        confirmPin: state.confirmPin,
        fullName: state.fullName,
      }),
    }
  )
);
