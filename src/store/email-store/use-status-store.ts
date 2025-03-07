import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StatusState {
  status: string;
  setStatus: (status: string) => void;
}

export const useStatusStore = create<StatusState>()(
  persist(
    (set) => ({
      status: "check",
      setStatus: (status: string) => set({ status }),
    }),
    {
      name: "status-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({ status: state.status }),
    }
  )
)