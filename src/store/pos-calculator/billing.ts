import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { API2 } from "../../providers/request";
import { persist } from "zustand/middleware";
import { UseInvoiceReviewDetailsStore } from "./pos-cal-store";




// interface outletData {
//     location: string;
//     outlet_name: string;
//     pan: string;
// }

export interface OutletDetailsType {
    isLoading: boolean;
    error: null;
    verifySuccess: boolean;
    setVerifySuccess: (verifySuccess: boolean) => void;
    postBillingForQr: (data: any) => Promise<void>;
    postForReceipt: (data: any) => Promise<void>;

}

export const useSubmitBillingStore = create<OutletDetailsType>((set) => ({
    isLoading: false,
    error: null,
    verifySuccess: false,
    setVerifySuccess: (verifySuccess: boolean) => { set({ verifySuccess }) },
    postBillingForQr: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const { setQRData } = UseQrResponseDataStore.getState();
            const response: AxiosResponse = await API2.post(`/billing-qr/`, data);
            setQRData(response.data);
            set({ verifySuccess: true });
            toast.success(response.data?.data?.qr_data?.Message);
        } catch (error: any) {
            set({ verifySuccess: false });
            toast.error(error?.response?.data?.message || "An error occurred");
            set({ error: error.message || "An error occurred" });
        } finally {
            set({ isLoading: false });
        }
    },
    postForReceipt: async (data: any) => {
        set({ isLoading: true, error: null });
        try {
            const response: AxiosResponse = await API2.post(`/send-receipt/`, data);
            set({ verifySuccess: true });
            toast.success(response.data.message);
            UseInvoiceReviewDetailsStore.getState().setInvoiceReview(response.data.data);
        } catch (error: any) {
            set({ verifySuccess: false });
            toast.error(error?.response?.data?.message || "An error occurred");
            set({ error: error.message || "An error occurred" });
        } finally {
            set({ isLoading: false });
        }
    }
}));


interface useTransactionType {
    isLoading: boolean;
    error: null;
    verifySuccess: boolean;
    postForTransactionVerification: (data: any) => Promise<void>;
}
export const useTransactionCheck = create<useTransactionType>((set) => ({
    isLoading: false,
    error: null,
    verifySuccess: false,
    postForTransactionVerification: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const {setQrResponse}= UseQrResponseDataStore.getState();
            const response: AxiosResponse = await API2.post(`/transaction/check-transaction/`, data);
            set({ verifySuccess: true });
            toast.success(response.data?.data?.qr_data?.Message);
            setQrResponse(response.data);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "An error occurred");
            set({ error: error.message || "An error occurred" });
        } finally {
            set({ isLoading: false });
        }
    },
}));

interface payLoadData {
    fk_outlet_uuid?: string;
    invoice_english_date?: string,
    invoice_nepali_date?: string,
    buyer_name?: string,
    buyer_uuid?: string,
    buyer_pan?: string,
    total_sales?: string,
    merchant_or_customer?: string,
    customer_name?: string,
}


interface DataForPayload {
    dataForPayload: payLoadData;
    setDataForPayload: (dataForPayload: any) => void;
    dataForPayLoad1: any;
    setDataForPayload1: (dataForPayLoad1: any) => void;
    selectedPaymentMethod: string;
    setSelectedPaymentMethod: (selectedPaymentMethod: string) => void;
    clearPayload: () => void;
    clearPayload1: () => void;
    phone: string;
    setPhone: (phone: string) => void;
    name: string;
    setName: (name: string) => void;
    isFromSelectFeild:boolean;
    setIsFromSelectFeild:(isFromSelectFeild:boolean)=>void;
}

export const UseDataForPayload = create<DataForPayload>()(
    persist(
        (set) => ({
            isFromSelectFeild:false,
            setIsFromSelectFeild:(isFromSelectFeild:boolean)=>{
                set({isFromSelectFeild})
            },
            dataForPayload: {} as payLoadData,
            setDataForPayload: (dataForPayload: payLoadData) => {
                set({ dataForPayload });
            },
            dataForPayLoad1: {} as any,
            setDataForPayload1: (dataForPayLoad1: any) => {
                set({ dataForPayLoad1 });
            },
            clearPayload: () => {
                set({ dataForPayload: {} });
            },
            clearPayload1: () => {
                set({ dataForPayLoad1: {} });
            },
            selectedPaymentMethod: "qr" as string,
            setSelectedPaymentMethod: (selectedPaymentMethod: string) => {
                set({ selectedPaymentMethod });
            },
            phone: "" as string,
            setPhone: (phone: string) => {
                set({ phone });
            },
            name: "" as string,
            setName: (name: string) => {
                set({ name });
            }
        }),
        {
            name: "data-for-payload",
            getStorage: () => localStorage,
            partialize: (state) => ({ dataForPayload: state.dataForPayload, dataForPayLoad1: state.dataForPayLoad1, selectedPaymentMethod: state.selectedPaymentMethod }),
        }
    )
);

interface QRData {
    data: {
        qr_data: {
            Payload: string;
            Message: string;
            Status: string;
        },
        transaction_id: string
    };
    success: boolean;
}


interface QRResponse {
    Message: string;
    Status: string;
    TranId: string;
    success: boolean;
}
interface QRDataType {
    qrData: QRData;
    setQRData: (qrData: QRData) => void;
    qrResponse: QRResponse;
    setQrResponse: (qrResponse: QRResponse) => void;

}

export const UseQrResponseDataStore = create<QRDataType>()(
    persist(
        (set) => ({
            qrData: {} as QRData,
            setQRData: (qrData: QRData) => {
                set({ qrData });
            },
            qrResponse: {} as any,
            setQrResponse: (qrResponse: any) => {
                set({ qrResponse });
            }

        }),
        {
            name: "qr-response-data",
            getStorage: () => localStorage,
            partialize: (state) => ({ qrData: state.qrData }),
        }
    )
)





