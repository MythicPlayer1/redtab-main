import { ICity, ICountry, IState } from "country-state-city";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface KYCStoreType {
  countryData: ICountry;
  setCountryData: (data: ICountry) => void;
  states: IState;
  setStates: (data: IState) => void;
  city: ICity;
  setCity: (data: ICity) => void;
  countryStates: IState[];
  setCountryStates: (data: IState[]) => void;
  countryCities: ICity[];
  setCountryCities: (data: ICity[]) => void;
  streetLocation: string;
  setStreetLocation: (data: string) => void;
  placeData: google.maps.places.PlaceResult;
  setPlaceData: (data: google.maps.places.PlaceResult) => void;
}

export const useKYCStore = create<KYCStoreType>((set) => ({
  countryData: {} as ICountry,
  setCountryData: (data: ICountry) => set({ countryData: data }),
  states: {} as IState,
  setStates: (data: IState) => set({ states: data }),
  city: {} as ICity,
  setCity: (data: ICity) => set({ city: data }),

  countryStates: [] as IState[],
  setCountryStates: (data: IState[]) => set({ countryStates: data }),

  countryCities: [] as ICity[],
  setCountryCities: (data: ICity[]) => set({ countryCities: data }),

  streetLocation: "" as string,
  setStreetLocation: (data: string) => set({ streetLocation: data }),

  placeData: {} as unknown as google.maps.places.PlaceResult,
  setPlaceData: (data: google.maps.places.PlaceResult) => set({ placeData: data }),
}));

interface NepalStatesStoreType {
  wards: string;
  setWards: (data: string) => void;
  streets: string;
  setStreets: (data: string) => void;
  provinces: string;
  setProvinces: (data: string) => void;
  districts: string;
  setDistricts: (data: string) => void;
  municipalities: string;
  setMunicipalities: (data: string) => void;
  allDistrict: any;
  setAllDistrict: (data: any) => void;
  allMunicipalities: any;
  setAllMunicipalities: (data: any) => void;
  country: string;
  setCountry: (data: string) => void;
  postalCode: string;
  setPostalCode: (data: string) => void;
  phone: string;
  setPhone: (data: string) => void;
  email: string;
  setEmail: (data: string) => void;
  types: string[];
  setTypes: (data: string[]) => void;
  clearStates: () => void;
}

export const NepalStatesStore = create<NepalStatesStoreType>((set) => ({
  wards: "" as string,
  setWards: (data: string) => set({ wards: data }),
  streets: "" as string,
  setStreets: (data: string) => set({ streets: data }),
  provinces: "" as string,
  setProvinces: (data: string) => set({ provinces: data }),
  districts: "" as string,
  setDistricts: (data: string) => set({ districts: data }),
  municipalities: "" as string,
  setMunicipalities: (data: string) => set({ municipalities: data }),
  allDistrict: [] as any,
  setAllDistrict: (data: any) => set({ allDistrict: data }),
  allMunicipalities: [] as any,
  setAllMunicipalities: (data: any) => set({ allMunicipalities: data }),
  country: "" as string,
  setCountry: (data: string) => set({ country: data }),
  postalCode: "" as string,
  setPostalCode: (data: string) => set({ postalCode: data }),
  phone: "" as string,
  setPhone: (data: string) => set({ phone: data }),
  email: "" as string,
  setEmail: (data: string) => set({ email: data }),
  types: [] as string[],
  setTypes: (data: string[]) => set({ types: data }),
  clearStates: () =>
    set({
      provinces: "",
      districts: "",
      municipalities: "",
      country: "",
      postalCode: "",
      phone: "",
      email: "",
      types: [],
    }),
}));

type KYCFormStoreType = {
  merchantName: string;
  setMerchantNames: (data: string) => void;
  merchantEmail: string;
  setMerchantEmail: (data: string) => void;
  merchantPhone: string;
  setMerchantPhone: (data: string) => void;
  outletName: string;
  setOutletName: (data: string) => void;
  isClickedFromSearchList: boolean;
  setIsClickedFromSearchList: (data: boolean) => void;
};

export const KYCFormStore = create<KYCFormStoreType>((set) => ({
  merchantName: "" as string,
  setMerchantNames: (data: string) => set({ merchantName: data }),
  merchantEmail: "" as string,
  setMerchantEmail: (data: string) => set({ merchantEmail: data }),
  merchantPhone: "" as string,
  setMerchantPhone: (data: string) => set({ merchantPhone: data }),
  outletName: "" as string,
  setOutletName: (data: string) => set({ outletName: data }),
  isClickedFromSearchList: false,
  setIsClickedFromSearchList: (value: boolean) => set({ isClickedFromSearchList: value }),
}));

interface LocationUpdateData {
  updatedWard: string;
  setUpdatedWard: (data: string) => void;
  updatedStreet: string;
  setUpdatedStreet: (data: string) => void;
  updatedProvince: string;
  setUpdatedProvince: (data: string) => void;
  updatedDistrict: string;
  setUpdatedDistrict: (data: string) => void;
  updatedMunicipality: string;
  setUpdatedMunicipality: (data: string) => void;
}

export const useLocationUpdateStore = create<LocationUpdateData>()(
  persist(
    (set) => ({
      updatedWard: "",
      setUpdatedWard: (data: string) => set({ updatedWard: data }),
      updatedStreet: "",
      setUpdatedStreet: (data: string) => set({ updatedStreet: data }),
      updatedProvince: "",
      setUpdatedProvince: (data: string) => set({ updatedProvince: data }),
      updatedMunicipality: "",
      setUpdatedMunicipality: (data: string) => set({ updatedMunicipality: data }),
      updatedDistrict: "",
      setUpdatedDistrict: (data: string) => set({ updatedDistrict: data }),
    }),
    {
      name: "location-updated-data",
      getStorage: () => localStorage,
      partialize: (state) => ({
        updatedWard: state.updatedWard,
        updatedStreet: state.updatedStreet,
        updatedProvince: state.updatedProvince,
        updatedMunicipality: state.updatedMunicipality,
        updatedDistrict: state.updatedDistrict,
      }),
    }
  )
);
