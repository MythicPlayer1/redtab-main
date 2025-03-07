import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { API } from "../../providers/request";
import { useSelectedOutletUuidStore } from "../merchant-profile/use-merchant-profile-outlet-store";
import { useOulteUUID } from "../kyc/use-create-outlet-profile";
import { useLoginStatusStore } from "../login-status-store/use-login-status-store";

// Interface for the staff outlet state
interface StaffOutletState {
  isLoading: boolean;
  error: string | null;
  verifySuccess: boolean;
  staffOutlet: (uuid: string) => Promise<void>;
}

// Create the store for the staff outlet state
export const useStaffOutlet = create<StaffOutletState>((set) => ({
  isLoading: false,
  error: null,
  verifySuccess: false,
  staffOutlet: async (uuid) => {
    const { setSelectedOutletName, setSelectedOutletId } = useSelectedOutletUuidStore.getState();
    const { setOutletUUID } = useOulteUUID.getState();
    const { setUpdateMerchantName } = useLoginStatusStore.getState();
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse = await API.get(`/outlet/outlet-retrieve/${uuid}`);
      set({ verifySuccess: true });
      setSelectedOutletName(response?.data?.data?.outlet_name); //set outlet name whose staff is logged in
      setOutletUUID(response?.data?.data?.uuid); //set for kyc api hit for outlet staff logged in case
      setSelectedOutletId(response?.data?.data?.uuid);
      //set outlet name whose staff is logged in
      setUpdateMerchantName(response?.data?.data?.outlet_name);
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
