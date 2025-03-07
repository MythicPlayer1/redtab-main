import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { KYCScreen } from "../../../components/KYCScreen";
import { ButtonPrimary } from "../../../components/Button/ButtonPrimary";
import LocationDropDown from "../../../components/Input/dropdown/lcoation-drop";
import { NepalStatesStore, useKYCStore, useLocationUpdateStore } from "../../../store/kyc/kyc-info-store";
import StateDropDown from "../../../components/Input/dropdown/state-drop";
import CityDropDown from "../../../components/Input/dropdown/city-drop";
import MunicipalityDropDown from "../../../components/Input/dropdown/municipality-drop";
import { addressObject, getAllDistricts, getAllPalikas, getAllProvinces } from "./nepal-data";
import { formValidator } from "../../../utils/useful-func";
import { useCreateOutletProfile } from "../../../store/kyc/use-create-outlet-profile";

export interface KYCLocationProps {}

const ConfirmLocation: FC<KYCLocationProps> = () => {
  const { streetLocation, setStreetLocation } = useKYCStore();
  const { t } = useTranslation("KYCLocation");
  const navigate = useNavigate();
  const [ward, setWard] = useState<string>("");
  const [street, setStreet] = useState<string>(streetLocation);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const { verifyLocation } = useCreateOutletProfile();
  const [allProvinces, setAllProvinces] = useState();
  const {
    setWards,
    setStreets,
    allDistrict,
    allMunicipalities,
    provinces,
    districts,
    municipalities,
    country,
    setAllDistrict,
    setAllMunicipalities,
    postalCode,
    clearStates,
  } = NepalStatesStore();
  const outletUUID = localStorage.getItem("outlet-uuid-storage");
  const UUID = JSON.parse(outletUUID as string)?.state?.outletUUID;
  const { placeData } = useKYCStore();
  const { updatedWard, updatedStreet } = useLocationUpdateStore();

  //for getting the provinces
  useEffect(() => {
    const edit = localStorage.getItem("isEdit");
    if (edit === "true") {
      if (updatedWard) {
        setWard(updatedWard);
      }
      if (updatedStreet && !street) {
        setStreet(updatedStreet);
      }
    }
  }, [updatedWard, updatedStreet]);
  //for getting the provinces on page load

  useEffect(() => {
    const getProvince = getAllProvinces(addressObject);
    setAllProvinces(getProvince as any);
  }, []);

  useEffect(() => {
    setAllDistrict(getAllDistricts(addressObject, provinces));
  }, [provinces]);

  useEffect(() => {
    setAllMunicipalities(getAllPalikas(addressObject, provinces, districts));
  }, [districts]);

  // console.log(allProvinces, allDistrict, allMunicipalities, provinces, districts, municipalities, country, postalCode, placeData, UUID)

  const DefaultCountry = [
    {
      name: "Nepal",
    },
  ];

  //for validating the form, checks all field are filled or not
  useEffect(() => {
    const isValid = formValidator({ country, street, provinces, districts });
    if (isValid) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  });

  //for submitting the form and navigating to the next page. It calls the verifyLocation from use-create-outlet-profile
  const handleConfirmLocation = async () => {
    const data = {
      country: "Nepal",
      ward,
      street,
      province: provinces,
      district: districts,
      vdc_or_municipality: municipalities,
      outlet: UUID,
      compound_code: placeData?.plus_code?.compound_code,
      global_code: placeData?.plus_code?.global_code,
      map_url: placeData?.url,
      vicinity: placeData?.vicinity,
      postal_code: postalCode,
      utc_offset_minutes: placeData?.utc_offset_minutes,
    };
    const editSelected = localStorage.getItem("isEdit");
    if (editSelected) {
      setWards(ward);
      setStreets(street);
      navigate("/kyc/merchant/contact");
    } else {
      await verifyLocation(data);
      const { verifySuccess } = useCreateOutletProfile.getState();
      if (verifySuccess) {
        clearStates();
        setStreetLocation("");
        navigate("/kyc/merchant/contact");
      }
    }
  };

  return (
    <KYCScreen
      onAction={() => navigate("/kyc/merchant/location")}
      title={t("ConfirmYourLocation", { defaultValue: "Confirm your location" })}
      subTitle={t("ConfirmYourLocationSubTitle", {
        defaultValue: "We will use this information to verify your business address",
      })}
      footer={
        <>
          <ButtonPrimary disabled={isDisabled} onClick={handleConfirmLocation} className="w-full font-poppins ">
            {t("next", { defaultValue: "Confirm Address" })}
          </ButtonPrimary>
        </>
      }
    >
      <div className="mt-4 flex flex-col gap-6">
        <LocationDropDown name="Country" countriesName={DefaultCountry as any} defaultCountry="Nepal" />
        <StateDropDown name="Province" statesName={allProvinces as any} />
        <CityDropDown name="District" citiesName={allDistrict as any} />
        <MunicipalityDropDown name="VDC/Municipality" municipalityName={allMunicipalities as any} />
        <label className="flex w-full items-start font-poppins border-b-[1px] focus-within:border-b-primaryColor border-b-[#EAECF0] ">
          <div className="flex flex-col w-full items-start">
            {ward.length > 0 && <span className="text-[#98A2B3] text-xs font-normal ">Ward</span>}
            <input
              className="flex py-2 w-full  text-base text-[#1D2939] focus-within:outline-none placeholder:text-[#667085]"
              onChange={(e) => setWard(e.target.value)}
              value={ward}
              placeholder={ward.length === 0 ? "Ward" : undefined}
            ></input>
          </div>
        </label>
        <label className="flex w-full items-start font-poppins border-b-[1px]  focus-within:border-b-primaryColor border-b-[#EAECF0] ">
          <div className="flex flex-col w-full items-start">
            {street.length > 0 && <span className="text-[#98A2B3] text-xs font-normal ">Street</span>}
            <input
              className="flex py-2 w-full text-base text-[#1D2939] focus-within:outline-none placeholder:text-[#667085]"
              onChange={(e) => setStreet(e.target.value)}
              value={street}
              placeholder={street.length === 0 ? "Street" : undefined}
            ></input>
          </div>
        </label>
      </div>
    </KYCScreen>
  );
};

export default ConfirmLocation;
