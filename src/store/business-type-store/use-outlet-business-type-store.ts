import { AxiosResponse } from "axios";
import { API } from "../../providers/request";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BusinessTypeName {
  businessTypeName: string;
  setBusinessTypeName: (businessTypeName: string) => void;
}

export const useOutletBusinessType = create<BusinessTypeName>()(
  persist(
    (set) => ({
      businessTypeName: "",
      setBusinessTypeName: (businessTypeName: string) => {
        set({ businessTypeName });
      }
    }),
    {
      name: "outlet-business-selection-type",
      getStorage: () => localStorage,
      partialize: (state) => ({ businessTypeName: state.businessTypeName }),
    }
  )
);

interface OutletBusinessType {
  isLoading: boolean;
  error: string | null;
  verifySuccess: boolean;
  getOutletBusinessType: (uuid: string) => Promise<void>;
}

export const useGetOutletBusinessType = create<OutletBusinessType>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  getOutletBusinessType: async (uuid) => {
    const { setBusinessTypeName } = useOutletBusinessType.getState();
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.get(`/outlet/outlet-business-type/${uuid}`);
      set({ verifySuccess: true });
      setBusinessTypeName(response?.data.data.business_type_name);
    } catch (error: any) {
      set({ verifySuccess: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));
