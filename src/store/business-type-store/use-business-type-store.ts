import { AxiosResponse } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { API } from "../../providers/request";
import { toast } from "react-toastify";

interface BusinessTypeStore {
  businessType: string;
  setBusinessType: (businessType: string) => void;
  businessTypeList: Array<BusinessType>;
  setBusinessTypeList: (businessTypeList: Array<BusinessType>) => void;
}
interface BusinessType {
  uuid: string;
  business_type_name: string;
  parent?: string;
  description?: string;
  is_leaf: boolean;
}

export const useBusinessTypeStore = create<BusinessTypeStore>()(
  persist(
    (set) => ({
      businessType: "",
      setBusinessType: (businessType: string) => {
        set({ businessType });
      },
      businessTypeList: new Array(),
      setBusinessTypeList: (businessTypeList: Array<BusinessType>) => {
        set({ businessTypeList });
      },
    }),
    {
      name: "business-type-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({ businessType: state.businessType, businessTypeList: state.businessTypeList }),
    }
  )
);

interface BusinessTypeList {
  isLoading: boolean;
  error: null;
  getBusinessTypeList: () => Promise<void>;
}

export const handleBusinessTypeList = create<BusinessTypeList>((set) => ({
  isLoading: false,
  error: null,
  getBusinessTypeList: async () => {
    const { setBusinessTypeList } = useBusinessTypeStore.getState();
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.get(`/merchant-profile/business-types/`);
      if(response?.data?.success === true){
      setBusinessTypeList(response?.data?.data);}
      if (!response.data?.success) {
        toast.error(response?.data?.message || "An error occurred");
        throw new Error(response?.data?.message || "Not receiving a message");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "An error occurred");
      set({ error: error?.data?.message || "An error occurred" });
    } finally {
      set({ isLoading: false });
    }
  },
}));

