import { create } from "zustand";
import { AxiosResponse } from "axios";
import { API } from "../../providers/request";
import { useStatusStore } from "./use-status-store";
import { useEmailStore } from "./use-email-store";

interface HandleEmailCheckState {
  isLoading: boolean;
  error: string | null;
  handleEmailCheck: (email: string) => Promise<void>;
}

export const useHandleEmailCheckStore = create<HandleEmailCheckState>((set) => ({
  isLoading: false,
  error: null,
  handleEmailCheck: async (email: string) => {
    const { setStatus } = useStatusStore.getState();
    const { setEmail } = useEmailStore.getState();
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.post("/authentication/email-check/", {
        email,
      });
      setEmail(email);
      setStatus("login");
      if (!response.data) {
        throw new Error(response.data.message || "Email does not exist");
      }
    } catch (error: any) {
      setStatus("signup");
    } finally {
      set({ isLoading: false });
    }
  },
}));
