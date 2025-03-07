import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface StaffPermissionData {
  permissionUuid?: string;
  uuid: string;
  name: string;
  is_default: boolean;
}

interface StaffPermissionStoreType {
  permissionList: StaffPermissionData[];
  setPermissionList: (data: StaffPermissionData[]) => void;
  updatedStaff: StaffPermissionData[];
  setUpdatedStaff: (data: StaffPermissionData[]) => void;
  
}

//persist permission list data and selected items
export const useStaffPermissionStore = create<StaffPermissionStoreType>()(
  persist(
    (set) => ({
      permissionList: [] as StaffPermissionData[],
      updatedStaff: [] as StaffPermissionData[],

      setPermissionList: (permissionList: StaffPermissionData[]) => {
        set({ permissionList });
      },

      setUpdatedStaff: (updatedStaff: StaffPermissionData[]) => {
        set({ updatedStaff });
      },

    }),
    {
      name: "staff-get-info-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({
        permissionList: state.permissionList,
      }),
    }
  )
);


