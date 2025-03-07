import { create } from "zustand";
import { AxiosResponse } from "axios";
import { API } from "../../providers/request";
import { toast } from "react-toastify";

interface PhoneNumberOTPVerifyState {
  isLoading: boolean;
  error: string | null;
  verifySuccess: boolean;
  phoneNumberOTPVerify: (phoneNumber: string, otp: string, prefix: string) => Promise<void>;
}

export const usePhoneNumberOTPVerifyStore = create<PhoneNumberOTPVerifyState>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  phoneNumberOTPVerify: async (phoneNumber: string, otp: string, prefix: string) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.post("/authentication/phone-otp-verify/", {
        phone: phoneNumber,
        otp,
        country_code: prefix,
      });
      set({ verifySuccess: true });
      toast.success(response.data.message);
      if (!response.data) {
        throw new Error(response.data.message || "Failed to verify OTP");
      }
    } catch (error: any) {
      set({ error: error.response.data.message || "An error occurred" });
      toast.error(error.response.data.message || "An error occurred");
    } finally {
      set({ isLoading: false });
    }
  },
}));
