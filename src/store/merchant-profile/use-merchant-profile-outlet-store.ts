import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface MerchantProfileOutletData {
  uuid: string;
  merchant_profile: string;
  outlet_name: string;
}

interface MerchantOutletListStoreType {
  merchantOutletList: MerchantProfileOutletData[];
  setMerchantOutletList: (data: MerchantProfileOutletData[]) => void;
}

//persist merchant profile outlet list
export const useMerchantProfileOutletListStore = create<MerchantOutletListStoreType>()(
  persist(
    (set) => ({
      merchantOutletList: [] as MerchantProfileOutletData[],
      setMerchantOutletList: (merchantOutletList: MerchantProfileOutletData[]) => {
        set({ merchantOutletList });
      },
    }),

    {
      name: "merchant-profile-outlet-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({
        merchantOutletList: state.merchantOutletList,
      }),
    }
  )
);

//store selected-outlet-uuid
interface SelectedOutletUuid {
  selectedOutletId: string;
  setSelectedOutletId: (id: string) => void;
  selectedOutletName: string;
  setSelectedOutletName: (name: string) => void;
}

//persist selected-outlet-uuid
export const useSelectedOutletUuidStore = create<SelectedOutletUuid>()(
  persist(
    (set) => ({
      selectedOutletId: '',
      setSelectedOutletId: ( selectedOutletId: string) => {
        set({ selectedOutletId });
      },
      selectedOutletName: '',
      setSelectedOutletName: ( selectedOutletName: string) => {
        set({ selectedOutletName });
      },
      
    }),

    {
      name: "selected-outlet-uuid-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({
        selectedOutletId: state.selectedOutletId,
        selectedOutletName: state.selectedOutletName
      }),
    }
  )
);
