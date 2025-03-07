import { create } from "zustand";
import { AxiosResponse } from "axios";
import { API } from "../../providers/request";
import { toast } from "react-toastify";
import { useLoginStore } from "./use-phone-login-store";

interface SignupState {
  isLoading: boolean;
  error: string | null;
  signupSuccess: boolean;
  signup: (phoneNumber: string, password: string, confirmPassword: string, countryCode: string) => Promise<void>;
}

export const useSignupStore = create<SignupState>((set) => ({
  isLoading: false,
  error: null,
  signupSuccess: false,
  signup: async (phoneNumber: string, password: string, confirmPassword: string, countryCode: string) => {
    set({ isLoading: true, error: null });
    const { login } = useLoginStore.getState();
    try {
      const response: AxiosResponse = await API.post("/authentication/phone-signup/", {
        phone: phoneNumber,
        password,
        confirm_password: confirmPassword,
        country_code: countryCode,
      });
      if (response.data) {
        try {
          await login(countryCode, phoneNumber, password);
          set({ signupSuccess: true });
          // toast.success(response.data.message);
        } catch (loginError: any) {
          toast.error(loginError.response.data.message || "Login failed after signup");
          set({ error: loginError.response.data.message || "Login failed after signup" });
        }
      } else {
        throw new Error(response.data.message || "Failed to sign up");
      }
    } catch (signupError: any) {
      toast.error(signupError.response.data.message || "An error occurred during signup");
      set({ error: signupError.response.data.message || "An error occurred during signup" });
    } finally {
      set({ isLoading: false });
      setTimeout(() => {
        set({ signupSuccess: false });
      }, 500);
    }
  },
}));
