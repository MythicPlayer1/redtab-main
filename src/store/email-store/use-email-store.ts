import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useStatusStore } from "./use-status-store";

interface EmailState {
  email: string;
  setEmail: (email: string) => void;
}

export const useEmailStore = create<EmailState>()(
  persist(
    (set) => ({
      email: "",
      setEmail: (email: string) => {
        set({ email });
        const { setStatus } = useStatusStore.getState();
        setStatus("check");
      },
    }),
    {
      name: "email-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({ email: state.email }),
    }
  )
);
