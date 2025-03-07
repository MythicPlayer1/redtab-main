import { AxiosResponse } from "axios";
import { API } from "../../providers/request";
import { create } from "zustand";
import { toast } from "react-toastify";
import { persist } from "zustand/middleware";
import { useSelectedOutletUuidStore } from "../merchant-profile/use-merchant-profile-outlet-store";

interface OutletProfile {
  isLoading: boolean;
  error: null;
  verifySuccess: boolean;
  createOutletProfile: (parentId: Record<string, unknown>) => Promise<void>;
  verifyLocation: (parentId: Record<string, unknown>) => Promise<void>;
  verifyContact: (parentId: Record<string, unknown>) => Promise<void>;
}

interface OullteUUID {
  outletUUID: string;
  setOutletUUID: (outletUUID: string) => void;
}

export const useOulteUUID = create<OullteUUID>()(
  persist(
    (set) => ({
      outletUUID: "" as string,
      setOutletUUID: (outletUUID: string) => {
        set({ outletUUID });
      },
    }), {
    name: "outlet-uuid-storage",
    getStorage: () => localStorage,
    partialize: (state) => ({ outletUUID: state.outletUUID }),
  }
  )
)

export const useCreateOutletProfile = create<OutletProfile>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  createOutletProfile: async (payload: Record<string, unknown>) => {
    // const merchantUUIDData = localStorage.getItem('merchant-profile-storage');
    // const merchantUUID = JSON.parse(merchantUUIDData as string);
    // const merchantProfileUUID = merchantUUID?.state?.merchantProfileUUID;
    const toastStatus = localStorage.getItem('toastStatus');
    const { setSelectedOutletId, setSelectedOutletName } = useSelectedOutletUuidStore.getState();

    set({ isLoading: true, error: null });
    const { setOutletUUID } = useOulteUUID.getState();
    try {
      const response: AxiosResponse = await API.post(`/outlet/outlet-create/`, payload);
      if (response.data) {
        set({ verifySuccess: true });
          setOutletUUID(response?.data?.data?.uuid)
          setSelectedOutletId(response?.data?.data?.uuid);
          setSelectedOutletName(payload.outlet_name as string);
          if(toastStatus === 'true') {
            toast.success(response.data.message);
          }
        // toast.success(response.data.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
      set({ error: error?.message || "An error occurred" });
    } finally {
      set({ isLoading: false });
    }
  },
  verifyLocation: async (payload: Record<string, unknown>) => {

    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.post(`/kyc/location-submit/`, payload);
      console.log(response, 'response');
      set({ verifySuccess: true });
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
      set({ error: error?.message || "An error occurred" });
    } finally {
      set({ isLoading: false });
    }
  },
  verifyContact: async (payload: Record<string, unknown>) => {

    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.post(`/kyc/contact-submit/`, payload);
      set({ verifySuccess: true });
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
      set({ error: error?.message || "An error occurred" });
    } finally {
      set({ isLoading: false });
    }
  }
}));
