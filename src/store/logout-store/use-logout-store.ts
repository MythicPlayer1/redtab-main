import { API } from "../../providers/request";
import { create } from "zustand";
import { toast } from "react-toastify";

interface LogoutState {
  isLoading: boolean;
  error: null;
  verifySuccess: boolean;
  logout: (payload: Record<string, unknown>) => Promise<void>;
}

export const useHandleLogout = create<LogoutState>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  logout: async (payload: Record<string, unknown>) => {
    set({ isLoading: true, error: null });
    try {
      await API.post(`/authentication/logout/`, payload);
      set({ verifySuccess: true });
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));
