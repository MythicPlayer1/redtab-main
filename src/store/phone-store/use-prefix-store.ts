import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useStatusStore } from "./use-phone-status-store";

interface PrefixState {
  prefix: string;
  setPrefix: (prefix: string) => void;
}

export const usePrefixStore = create<PrefixState>()(
  persist(
    (set) => ({
      prefix: "+977",
      setPrefix: (prefix: string) => {
        set({ prefix });
        const { setStatus } = useStatusStore.getState();
        setStatus("check");
      },
    }),
    {
      name: "phone-prefix-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({ prefix: state.prefix }),
    }
  )
);
