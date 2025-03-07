import { AxiosResponse } from "axios";
import { API } from "../../providers/request";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface panVerifyDetail {
  is_verified: boolean;
  pan_no: string;
  pan_image: string;
  issued_local_date: string;
}

export interface companyVerifyDetail {
  is_verified: boolean;
  company_register_doc_image: string;
}

//store for pan verify
interface PanDetailStoreType {
  panVerify: panVerifyDetail[];
  setPanVerify: (data: panVerifyDetail[]) => void;
}

//store for company verify

export const usePanVerifyStore = create<PanDetailStoreType>()(
  persist(
  (set) => ({
  panVerify: [] as panVerifyDetail[],
  setPanVerify: (panVerify: panVerifyDetail[]) => {
    set({ panVerify });
  },
}),
{
  name: "outlet-pan-verification-storage",
  getStorage: () => localStorage,
  partialize: (state) => ({ panVerify: state.panVerify?.map((pan) => ({ pan_no: pan.pan_no, pan_image: pan.pan_image, issued_local_date: pan.issued_local_date })) }),
}
)
);
interface CompanyVerifyStoreType {
  companyVerify: companyVerifyDetail[];
  setCompanyVerify: (data: companyVerifyDetail[]) => void;
}

//outlet verify api hit

export const useCompanyVerifyStore = create<CompanyVerifyStoreType>()(
  persist(
  (set) => ({
  companyVerify: [] as companyVerifyDetail[],
  setCompanyVerify: (companyVerify: companyVerifyDetail[]) => {
    set({ companyVerify });
  },
}),
{
  name: "outlet-company-verification-storage",
  getStorage: () => localStorage,
  partialize: (state) => ({ companyVerify: state.companyVerify?.map((company) => ({ company_register_doc_image: company.company_register_doc_image })) }),
}
)
);
interface OutletVerifyDetails {
  verifySuccess: boolean;
  verifyPanDetail: (outlet: string) => Promise<void>;
  verifyRegisterCompany: (outlet: string) => Promise<void>;
}

export const useVerifyPanDetail = create<OutletVerifyDetails>((set) => ({
  verifySuccess: false,
  verifyPanDetail: async (outlet) => {
    const { setPanVerify } = usePanVerifyStore.getState();
    try {
      const response: AxiosResponse = await API.get(`/kyc/pan-details-retrieve/${outlet}`);
      set({ verifySuccess: true });
      setPanVerify(response?.data?.data);
    } catch (error) {
      setPanVerify([]);
    }
  },
  verifyRegisterCompany: async (outlet) => {
    const { setCompanyVerify } = useCompanyVerifyStore.getState();
    try {
      const response: AxiosResponse = await API.get(`/kyc/company-register-details/${outlet}`);
      set({ verifySuccess: true });
      setCompanyVerify(response?.data?.data);
    } catch (error) {
      setCompanyVerify([]);
    }
  },
}));
