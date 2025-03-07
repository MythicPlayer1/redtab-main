import React, { useEffect } from "react";
import InputEdit from "../Input/OutletEdit";
import Header from "./header";
import {
  useContactVerifyStore,
  useLocationVerifyStore,
} from "../../store/merchant-profile/use-basic-information-verify";
import { useSelectedOutletUuidStore } from "../../store/merchant-profile/use-merchant-profile-outlet-store";
import { useMerchantContactStore } from "../../store/merchant-profile/use-merchant-contact-store";
import OutletEdit from "../Input/OutletEdit";
import { useLocationUpdateStore } from "../../store/kyc/kyc-info-store";

const BasicInfoDetail = () => {
  const { locationVerify } = useLocationVerifyStore();
  const { contactVerify } = useContactVerifyStore();
  const { selectedOutletName } = useSelectedOutletUuidStore();
  const [country, setCountry] = React.useState<string>("");
  const [province, setProvince] = React.useState<string>("");
  const [district, setDistrict] = React.useState<string>("");
  const [vdcMunicipality, setVdcMunicipality] = React.useState<string>("");
  const [ward, setWard] = React.useState<string>("");
  const [street, setStreet] = React.useState<string>("");
  const [mobileNumber, setMobileNumber] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const { setMerchantEmail, setMerchantPhoneNumber } = useMerchantContactStore();
  const tokenStorage = localStorage?.getItem("token-storage");
  const merchantName = JSON?.parse(tokenStorage as string)?.state?.merchantProfileUUID[0]?.merchant_name;
  const { setUpdatedDistrict, setUpdatedMunicipality, setUpdatedProvince, setUpdatedStreet, setUpdatedWard} = useLocationUpdateStore();

  // set basic information details
  useEffect(() => {
    if (locationVerify) {
      setCountry(locationVerify[0]?.country);
      setProvince(locationVerify[0]?.province);
      setUpdatedProvince(locationVerify[0]?.province);
      setVdcMunicipality(locationVerify[0]?.vdc_or_municipality);
      setUpdatedMunicipality(locationVerify[0]?.vdc_or_municipality);
      setDistrict(locationVerify[0]?.district);
      setUpdatedDistrict(locationVerify[0]?.district);
      setWard(locationVerify[0]?.ward);
      setUpdatedWard(locationVerify[0]?.ward);
      setStreet(locationVerify[0]?.street);
      setUpdatedStreet(locationVerify[0]?.street);
    }
    if (contactVerify) {
      setMobileNumber(contactVerify[0]?.contact_number);
      setMerchantPhoneNumber(contactVerify[0]?.contact_number);
      setEmail(contactVerify[0]?.email);
      setMerchantEmail(contactVerify[0]?.email);
    }
  }, [locationVerify, contactVerify]);

  return (
    <div>
      <Header title={"Basic Information"} path="/kyc/merchant/name"/>
      <div className="border-dashed border-[1px] border-[#DDDDE3] my-4"></div>
      <OutletEdit label={"Outlet Name"} value={selectedOutletName !== "" ? selectedOutletName : merchantName} />
      <div className="border-dashed border-[1px] border-[#DDDDE3] my-4"></div>
      <OutletEdit label={"Country"} value={country} />
      <div className="border-dashed border-[1px] border-[#DDDDE3] my-4"></div>
      <OutletEdit label={"Province"} value={province} />
      <div className="border-dashed border-[1px] border-[#DDDDE3] my-4"></div>
      <OutletEdit label={"District"} value={district} />
      <div className="border-dashed border-[1px] border-[#DDDDE3] my-4"></div>
      <OutletEdit label={"VDC/Municipality"} value={vdcMunicipality} />
      <div className="border-dashed border-[1px] border-[#DDDDE3] my-4"></div>
      <OutletEdit label={"Ward"} value={ward} />
      <div className="border-dashed border-[1px] border-[#DDDDE3] my-4"></div>
      <InputEdit label={"Street"} value={street} />
      <div className="border-dashed border-[1px] border-[#DDDDE3] my-4"></div>
      <OutletEdit label={"Mobile Number"} value={mobileNumber} />
      <div className="border-dashed border-[1px] border-[#DDDDE3] my-4"></div>
      <OutletEdit label={"Email"} value={email} />
    </div>
  );
};

export default BasicInfoDetail;
