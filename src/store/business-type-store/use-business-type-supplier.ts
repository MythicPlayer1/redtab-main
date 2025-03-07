import { AxiosResponse } from "axios";
import { API, API1 } from "../../providers/request";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SubTypeData{
  uuid: string;
  business_type_name: string;
}
// BusinessTypeSupplierUUID interface
interface BusinessTypeSupplierUUID {
  supplierUUID: string;
  setSupplierUUID: (supplierUUID: string) => void;
  subType: SubTypeData[];
  setSubType: (subType: SubTypeData[]) => void;
}

export const useBusinessSupplierStore = create<BusinessTypeSupplierUUID>()(
  persist(
    (set) => ({
      supplierUUID: "",
      setSupplierUUID: (supplierUUID: string) => {
        set({ supplierUUID });
      },
      subType: [],
      setSubType: (subType: SubTypeData[]) => {
        set({ subType });
      },
    }),
    {
      name: "businesstype-supplier-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({
        supplierUUID: state.supplierUUID, subType: state.subType
      }),
    }
  )
);

// BusinessTypeSupplierData interface
export interface BusinessTypeSupplierData {
  business_type_name: string;
  uuid: string;
}

export interface SupplierProductData {
  uuid: string;
name: string;
fk_outlet_uuid: string;
short_description: string;
product_image: string;
}

interface StoreLocation {
  district: string;
}
export interface OutletData {
  uuid: string;
  outlet_name: string;
  store_location: StoreLocation[];
}

interface BusinessTypeSupplier {
  isLoading: boolean;
  error: null | string;
  getBusinessTypeSupplier: () => Promise<BusinessTypeSupplierData[]>;
  getSubTypeSupplier: (uuid: string) => Promise<{outlets: OutletData[], products:SupplierProductData[]}>;
}

// create a store for business type supplier
export const businessTypeSupplier = create<BusinessTypeSupplier>((set) => ({
  isLoading: false,
  error: null,
  getBusinessTypeSupplier: async () => {
    const { setSupplierUUID, setSubType } = useBusinessSupplierStore.getState();
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.get(`/merchant-profile/business-types/`);

      // find business type details with the name "Supplier"
      const supplierBusinessType = response?.data?.data.find((type: any) => type.business_type_name === "Supplier");

      //uuid of the supplier business type
      const supplierUUID = supplierBusinessType.uuid;
      setSupplierUUID(supplierUUID);

      // Get all the sub types of the supplier business type
      const subTypeResponse: AxiosResponse = await API.get(
        `/merchant-profile/business-types/${supplierUUID}/sub-types/`
      );
      setSubType(subTypeResponse?.data?.data);
      return subTypeResponse?.data?.data;
    } catch (error: any) {
      set({ error: error.message || "An error occurred" });
      return [];
    } finally {
      set({ isLoading: false });
    }
  },
  getSubTypeSupplier: async (uuid): Promise<{outlets: OutletData[], products:SupplierProductData[]}> => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.get(`/outlet/all-outlet-list/?business_type_uuid=${uuid}`);
      const outlets = response?.data?.data;
      console.log("outlets from store", outlets);
      const productList = outlets.map(async (outlet: any) => {
        const response: AxiosResponse = await API1.get(`/product/list/?fk_outlet_uuid=${outlet.uuid}`);
        return response.data.data;
      });
      const products = await Promise.all(productList);
      const product = products.flat();
      return { outlets, products: product }
    } catch (error: any) {
      set({ error: error.message || "An error occurred" });
      return { outlets: [], products: [] };
    } finally {
      set({ isLoading: false });
    }
  },
}));
