import { Link } from "react-router-dom";
import kycIcon from "/ouletIcon1.svg";
import { useCompanyVerifyStore, usePanVerifyStore } from "../../store/pan-verification-store/use-outlet-verification";
import { useOwnerVerifyStore } from "../../store/owner-identity/use-owner-verification";
import {
  useContactVerifyStore,
  useLocationVerifyStore,
} from "../../store/merchant-profile/use-basic-information-verify";
import { useEffect, useState } from "react";
import { useMerchantContactStore } from "../../store/merchant-profile/use-merchant-contact-store";

const KycVerifyCard = () => {
  const [status, setStatus] = useState<string | null>(null);
  const { companyVerify } = useCompanyVerifyStore();
  const { panVerify } = usePanVerifyStore();
  const { ownerVerify } = useOwnerVerifyStore();
  const { locationVerify } = useLocationVerifyStore();
  const { contactVerify } = useContactVerifyStore();
  const { merchantUpdateStatus } = useMerchantContactStore();

  useEffect(() => {
    const checkStatus = localStorage.getItem("status");
    setStatus(checkStatus);
  }, [status]);

  return (
    <>
      {(companyVerify.length === 0 ||
        panVerify.length === 0 ||
        ownerVerify.length === 0 ||
        locationVerify.length === 0 ||
        contactVerify.length === 0) && (
        <div className="p-4 flex flex-col w-full border1 shadow-md rounded-2xl gap-4 ">
          <div className="flex justify-between font-normal text-sm text-[#1D2939] w-full">
            <p className="w-[70%]">Please complete your eKYC to get full benefit from REDTAB </p>
            <img src={kycIcon} alt="kyc-icon"></img>
          </div>
          <Link
            to={
              (status || merchantUpdateStatus === true)
                ? "/kyc/merchant/name"
                : locationVerify.length === 0
                ? "/kyc/merchant/location"
                : contactVerify.length === 0
                ? "/kyc/merchant/contact"
                : panVerify.length === 0
                ? "/kyc/pan/verify"
                : companyVerify.length === 0
                ? "/kyc/pan/verify-company"
                : "/kyc/pan/verify-owner"
            }
            className="bg-primaryColor text-sm text-primaryColorText py-3 px-3 font-semibold rounded-[32px] text-center"
          >
            Complete eKYC
          </Link>
        </div>
      )}
    </>
  );
};

export default KycVerifyCard;
