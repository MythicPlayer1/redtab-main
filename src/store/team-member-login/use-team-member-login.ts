import { create } from "zustand";
import { AxiosResponse } from "axios";
import { API } from "../../providers/request";
import { toast } from "react-toastify";
import { useLoginStatusStore } from "../login-status-store/use-login-status-store";
import { persist } from "zustand/middleware";
import { useEmailStore } from "../email-store/use-email-store";
import { usePhoneNumberStore } from "../phone-store/use-phone-store";

interface LoggedInStaffData{
  staffOutletUUID: string;
  setStaffOutletUUID: (staffOutlet: string) => void;
}

// Store to manage the logged in staff outlet
export const useLoggedInStaff = create<LoggedInStaffData>()(
  persist(
    (set) => ({
      staffOutletUUID: "",
      setStaffOutletUUID: (staffOutletUUID: string) => {
        set({ staffOutletUUID });
      },
    }),
    {
      name: "logged-in-staff-outlet-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({ staffOutletUUID: state.staffOutletUUID }),
    }
  )
);

// Store to manage the team member login state
interface TeamMemberLoginState {
  isLoading: boolean;
  error: string | null;
  staffLogin: (payload: Record<string, unknown>) => Promise<void>;
}

export const useTeamMemberLoginStore = create<TeamMemberLoginState>((set) => ({
  isLoading: false,
  error: null,
  staffLogin: async (payload) => {
    set({ isLoading: true, error: null });
    const { setToken, setIsLoggedIn, setRefreshToken} = useLoginStatusStore.getState();
    const { setStaffOutletUUID } = useLoggedInStaff.getState();
    const { setEmail } = useEmailStore.getState();
    const { setStaffOutletPhoneNumber } = usePhoneNumberStore.getState();
    try {
      const response: AxiosResponse = await API.post("/staff-login/", payload);
       setIsLoggedIn(true);
       setRefreshToken(response?.data?.refresh);
       setToken(response?.data?.access);
       setStaffOutletUUID(response?.data?.outlet);
       // email or phone number for staff outlet
      if (response?.data?.email) {
        setEmail(response.data.email);
      } else if (response?.data?.phone) {
        setStaffOutletPhoneNumber(response.data.phone);
      }
    } catch (error: any) {
      setIsLoggedIn(false);
      set({ error: error.response?.data?.message || "An error occurred" });
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      set({ isLoading: false });
    }
  },
}));
