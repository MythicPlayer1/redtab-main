import { AxiosResponse } from "axios";
import { API } from "../../providers/request";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface LocationVerifyDetail {
  is_verified: boolean;
  country: string;
  province: string;
  vdc_or_municipality: string;
  district: string;
  ward: string;
  street: string;
}

export interface contactVerifyDetail {
  is_verified: boolean;
  email: string;
  contact_number: string;
}

//store for location verify
interface LocationDetailStoreType {
  locationVerify: LocationVerifyDetail[];
  setLocationVerify: (data: LocationVerifyDetail[]) => void;
}

//store for location verify

export const useLocationVerifyStore = create<LocationDetailStoreType>()(
  persist(
    (set) => ({
      locationVerify: [] as LocationVerifyDetail[],
      setLocationVerify: (locationVerify: LocationVerifyDetail[]) => {
        set({ locationVerify });
      },
    }),
    {
      name: "outlet-location-verification-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({
        locationVerify: state.locationVerify?.map((location) => ({
          country: location.country,
          province: location.province,
          vdc_or_municipality: location.vdc_or_municipality,
          district: location.district,
          ward: location.ward,
          street: location.street,
        })),
      }),
    }
  )
);

interface ContactVerifyStoreType {
  contactVerify: contactVerifyDetail[];
  setContactVerify: (data: contactVerifyDetail[]) => void;
}

//basic info verify api hit

export const useContactVerifyStore = create<ContactVerifyStoreType>()(
  persist(
    (set) => ({
      contactVerify: [] as contactVerifyDetail[],
      setContactVerify: (contactVerify: contactVerifyDetail[]) => {
        set({ contactVerify });
      },
    }),
    {
      name: "outlet-contact-verification-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({
        contactVerify: state.contactVerify?.map((contact) => ({
          email: contact.email,
          contact_number: contact.contact_number,
        })),
      }),
    }
  )
);

interface BasicInfoVerifyDetails {
  verifySuccess: boolean;
  verifyLocationDetail: (outlet: string) => Promise<void>;
  verifyContactCompany: (outlet: string) => Promise<void>;
}

export const useVerifyBasicInfoDetail = create<BasicInfoVerifyDetails>((set) => ({
  verifySuccess: false,
  verifyLocationDetail: async (outlet) => {
    const { setLocationVerify } = useLocationVerifyStore.getState();
    try {
      const response: AxiosResponse = await API.get(`/kyc/location-details/${outlet}`);
      set({ verifySuccess: true });
      if (response?.data?.data) {
        setLocationVerify(response.data.data);
      }
    } catch (error) {
      setLocationVerify([]);
    }
  },
  verifyContactCompany: async (outlet) => {
    const { setContactVerify } = useContactVerifyStore.getState();
    try {
      const response: AxiosResponse = await API.get(`/kyc/contact-details/${outlet}`);
      set({ verifySuccess: true });
      if (response?.data?.data) {
        setContactVerify(response.data.data);
      }
    } catch (error) {
      setContactVerify([]);
    }
  },
}));
