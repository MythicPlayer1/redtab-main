import { AxiosResponse } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { API } from "../../providers/request";
import { toast } from "react-toastify";

interface SubBusinessTypeStore {
  subBusinessType: string;
  setSubBusinessType: (subBusinessType: string) => void;
  subBusinessTypeList: Array<SubBusinessType>;
  setSubBusinessTypeList: (subBusinessTypeList: Array<SubBusinessType>) => void;
  subBusinessData: SubBusinessDataType;
  setSubBusinessData: (subBusinessData: SubBusinessDataType) => void;
  businessResponse: SubBusinessDataType;
  setBusinessResponse: (businessResponse: SubBusinessDataType) => void;
}
interface SubBusinessType {
  uuid: string;
  business_type_name: string;
  parent?: string;
  description?: string;
  is_leaf: boolean;
}
export interface SubBusinessDataType {
  label: string;
  value: string;
  is_leaf: boolean;
}

export const useSubBusinessTypeStore = create<SubBusinessTypeStore>()(
  persist(
    (set) => ({
      subBusinessData: {} as SubBusinessDataType,
      setSubBusinessData: (subBusinessData: SubBusinessDataType) => {
        set({ subBusinessData });
      },
      businessResponse: {} as SubBusinessDataType,
      setBusinessResponse: (businessResponse: SubBusinessDataType) => {
        set({ businessResponse });
      },
      subBusinessType: "",
      setSubBusinessType: (subBusinessType: string) => {
        set({ subBusinessType });
      },
      subBusinessTypeList: new Array(),
      setSubBusinessTypeList: (subBusinessTypeList: Array<SubBusinessType>) => {
        set({ subBusinessTypeList });
      },
    }),
    {
      name: "sub-business-type-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({
        subBusinessType: state.subBusinessType,
        subBusinessTypeList: state.subBusinessTypeList,
        businessResponse: state.businessResponse,
      }),
    },
  )
);

interface SubBusinessTypeList {
  isLoading: boolean;
  error: null;
  isSuccess: boolean;
  setIsSuccess: (isSuccess: boolean) => void;
  getSubBusinessTypeList: (parentId: string | null) => Promise<void>;
  postSubBusinessTypeList: (payload: Record<string, unknown>) => Promise<void>;
}

export const handleSubBusinessTypeList = create<SubBusinessTypeList>((set) => ({
  isLoading: false,
  error: null,
  isSuccess: false,
  setIsSuccess: (isSuccess: boolean) => {
    set({ isSuccess });
  },
  getSubBusinessTypeList: async (parentId: string | null) => {
    const setSubBusinessTypeList = useSubBusinessTypeStore.getState().setSubBusinessTypeList;
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.get(`/merchant-profile/business-types/${parentId}/sub-types/`);
      setSubBusinessTypeList(response.data.data);
      if (!response.data) {
        toast.error(response.data.message || "An error occurred");
        throw new Error(response.data.message || "Not receiving a message");
      }
    } catch (error: any) {
      toast.error(error.data.message || "An error occurred");
      set({ error: error.message || "An error occurred" });
    } finally {
      set({ isLoading: false });
    }
  },
  postSubBusinessTypeList: async (payload: Record<string, unknown>) => {
    const setBusinessResponse= useSubBusinessTypeStore?.getState().setBusinessResponse;
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.post(`/merchant-profile/business-type-create/`, payload);
      setBusinessResponse(response.data);
      if(response.data.data){
        set({ isSuccess: true });
        toast.success(response.data.message);
      }
      if (!response.data) {
        set({ isSuccess: false });
        toast.error(response.data.message || "An error occurred");
        throw new Error(response.data.message || "Not receiving a message");
       
      }
    } catch (error: any) {
      toast.error(error.data.message || "An error occurred");
      set({ error: error.message || "An error occurred" });
      set({ isSuccess: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));
