import { create } from "zustand";
import { AxiosResponse } from "axios";
import { API } from "../../providers/request";
import { toast } from "react-toastify";
import { useLoginStatusStore } from "../login-status-store/use-login-status-store";
import { useSelectedOutletUuidStore } from "../merchant-profile/use-merchant-profile-outlet-store";
import { useMerchantProfile } from "../merchant-profile/use-create-merchant-profile";
import { useOulteUUID } from "../kyc/use-create-outlet-profile";
import { useMerchantProfileStore } from "../merchant-profile/use-merchant-profile-store";

interface LoginState {
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
}

export const useLoginStore = create<LoginState>((set) => ({
  isLoading: false,
  error: null,
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    const { setToken, setIsLoggedIn, setMerchantProfileUUID, setRefreshToken, setUpdateMerchantName } = useLoginStatusStore.getState();
    const { setMerChantProfileUUID } = useMerchantProfile.getState();
    const { setSelectedOutletId, setSelectedOutletName } = useSelectedOutletUuidStore.getState();
    const { setOutletUUID } = useOulteUUID.getState();

    try {
      const response: AxiosResponse = await API.post("/authentication/email-login/", {
        email,
        password,
      });
      setIsLoggedIn(true);
      setToken(response?.data?.access);
      setRefreshToken(response?.data?.refresh);
      setMerchantProfileUUID(response?.data?.merchant_profile);
      setMerChantProfileUUID(response?.data?.merchant_profile?.[0]?.uuid);
      //finds outletuuid with is_default true
      const defaultOutletId = response.data.outlets.find((outlet: any) => outlet.is_default === true);
      if (defaultOutletId) {
        setSelectedOutletId(defaultOutletId.uuid);
        setOutletUUID(defaultOutletId.uuid);
        setUpdateMerchantName(defaultOutletId.outlet_name);
        setSelectedOutletName(defaultOutletId.outlet_name);
      }
      useLoginStatusStore?.getState()?.setMerchantProfileUUID(response?.data?.merchant_profile);
      useMerchantProfileStore?.getState()?.setMerchantProfile(response?.data?.merchant_profile?.[3]?.merchant_name)
      if (!response.data) {
        throw new Error(response.data.message || "Failed to log in");
      }
    } catch (error: any) {
      setIsLoggedIn(false);
      set({ error: error.response.data.message || "An error occurred" });
      toast.error(error.response.data.message || "An error occurred");
    } finally {
      set({ isLoading: false });
    }
  },
}));
