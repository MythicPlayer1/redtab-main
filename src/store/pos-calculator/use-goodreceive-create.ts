import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { API2 } from "../../providers/request";

export interface GoodReceiveType {
    isLoading: boolean;
    error: null;
    verifySuccess: boolean;
    postForGoodReceipt: (payload: Record<string, unknown>) => Promise<void>;
}

export const useGoodReceiveCreateStore = create<GoodReceiveType >((set) => ({
    isLoading: false,
    error: null,
    verifySuccess: false,
    postForGoodReceipt: async (payload) => {
        set({ isLoading: true, error: null });
        try {
            const response: AxiosResponse = await API2.post(`/goodreceive-create/`, {...payload});
            set({ verifySuccess: true });
            toast.success(response.data.message);
        } catch (error: any) {
            set({ verifySuccess: false });
            toast.error(error?.response?.data?.message || "An error occurred");
            set({ error: error.message || "An error occurred" });
        } finally {
            set({ isLoading: false });
        }
    }
}));