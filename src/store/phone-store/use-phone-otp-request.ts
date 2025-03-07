import { create } from "zustand";
import { AxiosResponse } from "axios";
import { API } from "../../providers/request";
import { toast } from "react-toastify";
import { usePhoneNumberStore } from "./use-phone-store";

interface PhoneNumberOTPRequestState {
  isLoading: boolean;
  error: string | null;
  phoneNumberOTPRequest: (phoneNumber: string, countryCode: string) => Promise<void>;
}

export const usePhoneNumberOTPRequestStore = create<PhoneNumberOTPRequestState>((set) => ({
  isLoading: false,
  error: null,
  phoneNumberOTPRequest: async (phoneNumber: string, countryCode: string) => {
    const { setPhoneNumber } = usePhoneNumberStore.getState();
    setPhoneNumber(phoneNumber);
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.post("/authentication/phone-otp-request/", {
        phone: phoneNumber,
        country_code: countryCode,
      });
      toast.success(response.data.message);
      if (!response.data) {
        throw new Error(response.data.message || "Failed to request OTP");
      }
    } catch (error: any) {
      set({ error: error.response.data.message || "An error occurred" });
      toast.error(error.response.data.message || "An error occurred");
    } finally {
      set({ isLoading: false });
    }
  },
}));
