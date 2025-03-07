import { create } from "zustand";
import { persist } from "zustand/middleware";
import { API, API1, API2 } from "../../providers/request";

export interface MerchantProfileUUID {
  uuid: string;
  merchant_name: string;
}
// export interface MerchantProfileUUID {
//   uuid: string;
// }
interface LoginStatusStore {
  isLoggedIn: boolean;
  accessToken: string | null;
  setToken: (email: string) => void;
  setIsLoggedIn: (value: boolean) => void;
  merchantProfileUUID: MerchantProfileUUID[];
  setMerchantProfileUUID: (data: MerchantProfileUUID[]) => void;
  refreshToken: string;
  setRefreshToken: (token: string) => void;
  updateMerchantName: string;
  setUpdateMerchantName: (updateMerchantName: string) => void;
}

export const useLoginStatusStore = create<LoginStatusStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: "",
      setToken: (token: string) => {
        set({ accessToken: token });
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        API1.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        API2.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      },
      refreshToken: "",
      setRefreshToken: (token: string) => {
        set({ refreshToken: token });
      },
      setIsLoggedIn: (value: boolean) => {
        set({ isLoggedIn: value });
      },
      merchantProfileUUID: [] as MerchantProfileUUID[],
      setMerchantProfileUUID: (merchantProfileUUID: MerchantProfileUUID[]) => {
        set({ merchantProfileUUID });
      },
      updateMerchantName: "",
      setUpdateMerchantName: (updateMerchantName: string) => {
        set({ updateMerchantName });
      },
    }),
    {
      name: "token-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        merchantProfileUUID: state.merchantProfileUUID,
        updateMerchantName: state.updateMerchantName,
      }),
    }
  )
);
