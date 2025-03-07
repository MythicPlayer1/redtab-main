import { create } from "zustand";
import { persist } from "zustand/middleware";

//store staff list 
interface AuthUser {
  email: string;
  country_code: string | null;
  phone: string | null;
}

export interface StaffData {
  uuid: string;
  auth_user: AuthUser;
  username: string;
  outlet: string;
  full_name: string;
}

interface StaffListStoreType {
  staffList: StaffData[];
  setStaffList: (data: StaffData[]) => void;
}

//persist staff list data
export const useStaffListStore = create<StaffListStoreType>()(
  persist(
    (set) => ({
      staffList: [] as StaffData[],
      setStaffList: ( staffList: StaffData[]) => {
        set({  staffList });
      },
      
    }),

    {
      name: "staff-get-info-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({
        staffList: state.staffList,
      }),
    }
  )
);

//store staff-uuid to update and delete selected user
interface StaffUuid {
  selectedStaffId: string;
  setSelectedStaffId: (id: string) => void;
}

//persist staff-uuid
export const useStaffUuidStore = create<StaffUuid>()(
  persist(
    (set) => ({
      selectedStaffId: '',
      setSelectedStaffId: ( selectedStaffId: string) => {
        set({ selectedStaffId });
      },
      
    }),

    {
      name: "selected-staff-uuid-storage",
      getStorage: () => sessionStorage,
      partialize: (state) => ({
        selectedStaffId: state.selectedStaffId,
      }),
    }
  )
);

