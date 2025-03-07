import { AxiosResponse } from "axios";
import { API } from "../../providers/request";
import { create } from "zustand";
import { toast } from "react-toastify";

export interface RefreshToken {
    isLoading: boolean;
    error: string | null;
    refreshToken: () => Promise<void>;
}

export const useRefreshToken = create<RefreshToken>((set) => ({
    isLoading: false,
    error: null,
    refreshToken: async () => {

      try {
        const token = localStorage.getItem("token-storage");
        const accessToken = JSON.parse(token || "{}")?.state?.accessToken;
        const payload= {
            refresh:accessToken
        }
        const response: AxiosResponse = await API.post(`/merchant-profile/business-types`, payload);
        if(response?.data?.success === true){
        if (!response.data?.success) {
          throw new Error(response?.data?.message || "Not receiving a message");
        }}}
       catch (error: any) {
        toast.error(error?.data?.message || "An error occurred");
        set({ error: error?.data?.message || "An error occurred" });
      } finally {
        set({ isLoading: false });
      }
    },
  }));