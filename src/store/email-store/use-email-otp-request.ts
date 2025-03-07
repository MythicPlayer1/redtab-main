import { create } from "zustand";
import { AxiosResponse } from "axios";
import { API } from "../../providers/request";
import { toast } from "react-toastify";
import { useEmailStore } from "./use-email-store";

interface EmailOTPRequestState {
  isLoading: boolean;
  error: string | null;
  emailOPTRequest: (email: string) => Promise<void>;
}

export const useEmailOTPRequestStore = create<EmailOTPRequestState>((set) => ({
  isLoading: false,
  error: null,
  emailOPTRequest: async (email: string) => {
    const { setEmail } = useEmailStore.getState();
    setEmail(email);
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.post("/authentication/email-otp-request/", {
        email,
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
