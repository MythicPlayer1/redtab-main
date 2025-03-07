import { create } from "zustand";
import { toast } from "react-toastify";
import { API1 } from "../../providers/request";
import { AxiosResponse } from "axios";

// OrderPlaceDetails interface
interface OrderPlaceDetails {
  isLoading: boolean;
  error: null | string;
  verifySuccess: boolean;
  orderCreate: (payload: Record<string, unknown>) => Promise<void>;
}

export const useOrderCreate = create<OrderPlaceDetails>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  orderCreate: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API1.post(`/order-create/`, {
        ...payload,
      });
      set({ verifySuccess: true });
      toast.success(response.data.message);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred");
      } else if (error.request) {
        toast.error("No response received from the server");
      } else {
        toast.error("Error setting up the request");
      }
      set({ error: error.message || "An error occurred" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
