import { create } from "zustand";
import { AxiosResponse } from "axios";
import { API } from "../../providers/request";
import { useStatusStore } from "./use-phone-status-store";
import { usePhoneNumberStore } from "./use-phone-store";
import { usePrefixStore } from "./use-prefix-store";

interface HandlePhoneNumberCheckState {
  isLoading: boolean;
  error: string | null;
  message: string | null;
  handlePhoneNumberCheck: (phoneNumber: string) => Promise<void>;
}

export const useHandlePhoneNumberCheckStore = create<HandlePhoneNumberCheckState>((set) => ({
  isLoading: false,
  error: null,
  message: null,
  handlePhoneNumberCheck: async (phoneNumber: string) => {
    const { setStatus } = useStatusStore.getState();
    const { setPhoneNumber, setMerchantOrStaff } = usePhoneNumberStore.getState();
    const { prefix } = usePrefixStore.getState();
    set({ isLoading: true, error: null, message: null });
    try {
      const response: AxiosResponse = await API.post("/authentication/phone-check/", {
        country_code: prefix,
        phone: phoneNumber,
      });
      setPhoneNumber(phoneNumber);
      setStatus("login");
      if (response.data) {
        setMerchantOrStaff(response.data.merchant_or_staff);
      } else if (response.data && response.data.success === true) {
        set({ message: response.data.message });
      }
      if (!response.data) {
        throw new Error(response.data.message || "Phone does not exist");
      }
    } catch (error: any) {
      setStatus("signup");
    } finally {
      set({ isLoading: false });
    }
  },
}));
