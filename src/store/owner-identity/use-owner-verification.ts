import { AxiosResponse } from "axios";
import { API } from "../../providers/request";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ownerVerifyDetail {
  is_verified: boolean;
  country: string;
  id_front_image: string;
  id_back_image: string;
  owner_image: string;
}


//store for owner verify
interface OwnerDetailStoreType {
  ownerVerify: ownerVerifyDetail[];
  setOwnerVerify: (data: ownerVerifyDetail[]) => void;
}

export const useOwnerVerifyStore = create<OwnerDetailStoreType>()(
  persist(
    (set) => ({
      ownerVerify: [] as ownerVerifyDetail[],
      setOwnerVerify: (ownerVerify: ownerVerifyDetail[]) => {
        set({ ownerVerify });
      },
    }),
    {
      name: "outlet-owner-verification-storage",
      getStorage: () => localStorage,
      partialize: (state: OwnerDetailStoreType) => ({
        ownerVerify: state.ownerVerify?.map((owner) => ({
          country: owner.country,
          id_front_image: owner.id_front_image,
          id_back_image: owner.id_back_image,
          owner_image: owner.owner_image,
        })),
      }),
    }
  )
);

//owner verify api hit
interface OwnerVerifyDetails {
  verifySuccess: boolean;
  ownerVerify: (outlet: string) => Promise<void>;
}

export const useVerifyOwnerDetail = create<OwnerVerifyDetails>((set) => ({
  verifySuccess: false,
  ownerVerify: async (outlet) => {
    const { setOwnerVerify } = useOwnerVerifyStore.getState();
    try{
    const response: AxiosResponse = await API.get(`/kyc/owner-details/${outlet}`);
    set({ verifySuccess: true });
      setOwnerVerify(response?.data?.data)
  } catch (error){
   setOwnerVerify([]);
  }
  },
}));

