import { AxiosResponse } from "axios";
import { API, API1 } from "../../providers/request";
import { create } from "zustand";
import { useBusinessSupplierStore } from "./use-business-type-supplier";
import { persist } from "zustand/middleware";

interface StoreLocation {
    district: string;
    country?: string;
  }
// BusinessTypeSupplierProductData interface
export interface SupplierProductData {
  uuid: string;
  name: string;
  fk_outlet_uuid: string;
  base_price?: number;
  short_description: string;
  product_image: string;
}

interface SupplierData {
  uuid: string;
  outlet_name: string;
  store_location: StoreLocation[];
}
interface SupplierProductList {
  selectedSupplierUUID: string;
  setSelectedSupplierUUID: (uuid: string) => void;
  selectedSupplierName: string;
  setSelectedSupplierName: (name: string) => void;
  products: SupplierProductData[];
  setProducts: (products: SupplierProductData[]) => void;
  outletDetail: SupplierData[];
  setOutletDetail: (products: SupplierData[]) => void;
}

export const useSupplierProductListStore = create<SupplierProductList>()(
  persist(
    (set) => ({
      selectedSupplierUUID: "",
      setSelectedSupplierUUID: (uuid: string) => {
        set({ selectedSupplierUUID: uuid });
      },
      selectedSupplierName: "",
      setSelectedSupplierName: (name: string) => {
        set({ selectedSupplierName: name });
      },
      products: [],
      setProducts: (products: SupplierProductData[]) => {
        set({ products });
      },
      outletDetail: [],
      setOutletDetail: (outletDetail: SupplierData[]) => {
        set({ outletDetail });
      },
    }),
    {
      name: "supplier-product-list-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({
        products: state.products,
        outletDetail: state.outletDetail,
        selectedSupplierUUID: state.selectedSupplierUUID,
        selectedSupplierName: state.selectedSupplierName,
      }),
    }
  )
);
export interface OutletData {
    uuid: string;
    outlet_name: string;
    store_location: StoreLocation[];
}

interface BusinessTypeSupplier {
  isLoading: boolean;
  error: null | string;
  getAllSupplierProducts: () => Promise<{outlets: OutletData[], products:SupplierProductData[]}>;
}

// create a store for business type supplier
export const businessTypeSupplierProduct = create<BusinessTypeSupplier>((set) => ({
  isLoading: false,
  error: null,
  getAllSupplierProducts: async (): Promise<{outlets: OutletData[], products:SupplierProductData[]}> => {
    const { supplierUUID } = useBusinessSupplierStore.getState();
    const { setProducts, setOutletDetail } = useSupplierProductListStore.getState();
    set({ isLoading: true, error: null });
    try {
      const allOutletListResponse: AxiosResponse = await API.get(
        `/outlet/all-outlet-list/?business_type_uuid=${supplierUUID}`
      );
      const outlets = allOutletListResponse?.data?.data;
      // set outlet details
      setOutletDetail(outlets);


      // iterate over each outlet uuid and fetch products
      const productList = outlets.map(async (outlet: any) => {
        const response: AxiosResponse = await API1.get(`/product/list/?fk_outlet_uuid=${outlet.uuid}`);
        return response.data.data;
      });

      const products = await Promise.all(productList);
      const product = products.flat();
      setProducts(product);
      return { outlets, products: product }
    } catch (error: any) {
      set({ error: error.message || "An error occurred" });
      return { outlets: [], products: [] };
    } finally {
      set({ isLoading: false });
    }
  },
}));
