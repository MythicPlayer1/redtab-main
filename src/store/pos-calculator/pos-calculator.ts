import { AxiosResponse } from "axios";
import { API, API2 } from "../../providers/request";
import { create } from "zustand";
import { toast } from "react-toastify";
import { UseInvoiceReviewDetailsStore } from "./pos-cal-store";
// import { UseInvoiceReviewDetailsStore } from "./pos-cal-store";
// import { QRDataStore, useSubmitBillingStore } from "./billing";

interface outletData {
    location: string;
    outlet_name: string;
    pan: string;
}
export interface OutletDetailsType {
    isLoading: boolean;
    error: null;
    verifySuccess: boolean;
    getOutletDetails: (outletUUID: string) => Promise<void>;
    outletDetails: any;
    setOutletDetails: (outletDetails: any) => void;

}
export interface MerchantProfileOutletType {
    contact_details: [];
    merchant_profile: string;
    outlet_contact: string;
    outlet_email: string;
    outlet_name: string;
    outlet_no: string;
    uuid: string;
}

export interface CustomerListType {
    uuid: string;
    customer_name: string;
    phone_number: string;

}
interface MerchantProfile {
    isLoading: boolean;
    error: null;
    verifySuccess: boolean;
    setVerifySuccess: (verifySuccess: boolean) => void;
    getCustomerList: (outletUUID:string) => Promise<void>;
    getMerchantProfileOuletList: () => Promise<void>;
    postForBilling: (data: any) => Promise<void>;

}
export interface CreateCustomerType {
    isLoading: boolean;
    error: null;
    verifySuccess: boolean;
    createNewCustomer: (data: any, outletId: string, englishDate: string, nepaliDate: string, calutatedAmount: number) => Promise<void>;

}
interface UsersListType {
    customerList: CustomerListType[];
    setCustomerList: (customerList: CustomerListType[]) => void;
    merchantOutletList: MerchantProfileOutletType[];
    setMerchantOutletList: (merchantList: MerchantProfileOutletType[]) => void;

}



export const useUsersListStore = create<UsersListType>((set) => ({

    customerList: [] as CustomerListType[],
    setCustomerList: (customerList: CustomerListType[]) => {
        set({ customerList });
    },
    merchantOutletList: [] as MerchantProfileOutletType[],
    setMerchantOutletList: (merchantOutletList: MerchantProfileOutletType[]) => {
        set({ merchantOutletList });
    },
}));


export const usePosCalculator = create<MerchantProfile>((set) => ({
    isLoading: false,
    error: null,
    verifySuccess: false,
    setVerifySuccess: (verifySuccess: boolean) => {
        set({ verifySuccess });
    },
    getCustomerList: async (outletUUID) => {
        set({ isLoading: true, error: null });
        try {
            const response: AxiosResponse = await API.get(`/customer-list/${outletUUID}`);
            useUsersListStore.getState().setCustomerList(response.data.data);
            set({ verifySuccess: true });
            toast.success(response.data.message);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "An error occurred");
            set({ error: error.message || "An error occurred" });
        } finally {
            set({ isLoading: false });
        }
    },
    getMerchantProfileOuletList: async () => {
        set({ isLoading: true, error: null });
        try {
            
            const response: AxiosResponse = await API.get(`/outlet/all-outlet-list/`);
            useUsersListStore.getState().setMerchantOutletList(response.data.data);
            set({ verifySuccess: true });
            toast.success(response.data.message);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "An error occurred");
            set({ error: error.message || "An error occurred" });
        } finally {
            set({ isLoading: false });
        }
    },
    postForBilling: async (data: any) => {
        set({ isLoading: true, error: null });
        try {
            const response: AxiosResponse = await API2.post(`/billing-create/`,data);
            // console.log(response.data.success);
            if (response.data.success === true) {               
                toast.success("Billing created successfully");
                set({ verifySuccess: true });
                UseInvoiceReviewDetailsStore.getState().setInvoiceReview(response.data.data);

            }
        } catch (error: any) {
            // console.log(error);
            set({verifySuccess: false});
            toast.error(error?.response?.data?.message || "An error occurred");
            set({ error: error?.message || "An error occurred" });
        } finally {
            set({ isLoading: false });
        }
    },

}));


export const useCreateNewCustomer = create<CreateCustomerType>((set) => ({
    isLoading: false,
    error: null,
    verifySuccess: false,
    createNewCustomer: async (data: any) => {
        set({ isLoading: true, error: null });
        try {
            const response: AxiosResponse = await API.post(`/customer-create/`, data);
            set({ verifySuccess: true });
            toast.success(response.data.message);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "An error occurred");
            set({ error: error.message || "An error occurred" });
        } finally {
            set({ isLoading: false });
        }
    },
}));



export const useGetOultetDetails =create<OutletDetailsType>((set) => ({
    isLoading: false,
    error: null,
    verifySuccess: false,
    outletDetails: {} as outletData,
    setOutletDetails: (outletDetails: outletData) => {
        set({ outletDetails });
    },
    getOutletDetails: async (outletUUID) => {
        set({ isLoading: true, error: null });
        try {
            const response: AxiosResponse = await API.get(`/outlet/basic-outlet-info/${outletUUID}`);
            set({ outletDetails: response.data.data });
            set({ verifySuccess: true });
            // toast.success(response.data.message);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "An error occurred");
            set({ error: error.message || "An error occurred" });
        } finally {
            set({ isLoading: false });
        }
    },
}));
