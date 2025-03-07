import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the interface for basic-outlet-info
export interface OutletInfoData {
  outlet_name: string;
  location?: string;
  pan?: string;
}

// Define the interface for the seller-info and buyer info
interface OutletInfoStoreType {
  sellerInfo: OutletInfoData | null;
  setSellerInfo: (data: OutletInfoData) => void;
  buyerInfo: OutletInfoData | null;
  setBuyerInfo: (data: OutletInfoData) => void;
}

// Persist the basic-outlet-info in localStorage
export const useOutletStore = create<OutletInfoStoreType>()(
  persist(
    (set) => ({
      sellerInfo: null,
      setSellerInfo: (data: OutletInfoData) => {
        set({ sellerInfo: data });
      },
      buyerInfo: null,
      setBuyerInfo: (data: OutletInfoData) => {
        set({ buyerInfo: data });
      },
    }),
    {
      name: "basic-outlet-info-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({ sellerInfo: state.sellerInfo, buyerInfo: state.buyerInfo }),
    }
  )
);
