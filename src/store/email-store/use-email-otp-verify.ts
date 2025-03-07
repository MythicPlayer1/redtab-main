import { create } from "zustand";
import { AxiosResponse } from "axios";
import { API } from "../../providers/request";
import { toast } from "react-toastify";

interface EmailOTPVerifyState {
  isLoading: boolean;
  error: string | null;
  verifySuccess: boolean;
  emailOPTVerify: (email: string, otp: string) => Promise<void>;
}

export const useEmailOTPVerifyStore = create<EmailOTPVerifyState>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  emailOPTVerify: async (email: string, otp: string) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.post("/authentication/email-otp-verify/", {
        email,
        otp,
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
