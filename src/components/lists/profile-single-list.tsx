import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useCompanyVerifyStore, usePanVerifyStore } from "../../store/pan-verification-store/use-outlet-verification";
import { useOwnerVerifyStore } from "../../store/owner-identity/use-owner-verification";
import {
  useContactVerifyStore,
  useLocationVerifyStore,
} from "../../store/merchant-profile/use-basic-information-verify";
import { useEffect, useState } from "react";
import { useMerchantContactStore } from "../../store/merchant-profile/use-merchant-contact-store";

type Profile = {
  id: number;
  name?: string;
  svg?: string;
  isVerified?: boolean;
  link?: string;
  verifiedMessage?: string;
};

type ProfileSingleListType = {
  profile: Profile;
};

const ProfileSingleList = ({ profile }: ProfileSingleListType) => {
  const navigate = useNavigate();
  const { name, svg } = profile;
  const [statusCheck, setStatusCheck] = useState<string>();
  const { companyVerify } = useCompanyVerifyStore();
  const { panVerify } = usePanVerifyStore();
  const { ownerVerify } = useOwnerVerifyStore();
  const { locationVerify } = useLocationVerifyStore();
  const { contactVerify } = useContactVerifyStore();
  const { merchantUpdateStatus } = useMerchantContactStore();

  useEffect(() => {
    const checkStatus = localStorage.getItem("status");
    setStatusCheck(checkStatus as string);
  }, []);

  const handleSelectedSection = (name: string) => {
    // set selected section in local storage
    localStorage.setItem("selectedSection", name);
    if (statusCheck === "true" || merchantUpdateStatus === true) {
      //navigate to name at initial merchant and outlet creation only before update merchant and outlet name
      navigate("/kyc/merchant/name");
    } else {
      //naviage to verify location or contact or outlet upload details
      if (name === "Basic Information") {
        if (locationVerify.length === 0) {
          navigate("/kyc/merchant/location");
        } else if (contactVerify.length === 0) {
          navigate("/kyc/merchant/contact");
        } else {
          navigate("/outlet-upload-details");
        }
      }

      //naviage to verify company or pan verify or outlet upload details
      if (name === "Outlet Documents") {
        if (panVerify.length === 0) {
          navigate("/kyc/pan/verify");
        } else if (companyVerify.length === 0) {
          navigate("/kyc/pan/verify-company");
        } else {
          navigate("/outlet-upload-details");
        }
      }

      // navigate to verify owner or outlet upload details
      if (name === "Owner Verification") {
        if (ownerVerify.length === 0) {
          navigate("/kyc/pan/verify-owner");
        } else {
          navigate("/outlet-upload-details");
        }
      }
    }

    //naviage to manage team
    if (name === "Manage Team") {
      navigate("/manage-staffs");
    }
  };

  const getStatus = () => {
    let status = "Not Submitted";
    let bgColor = "#EA4335";

    if (name === "Basic Information") {
      if (locationVerify.length !== 0 && contactVerify.length !== 0) {
        const isLocationVerified = locationVerify[0]?.is_verified;
        const isContactVerified = contactVerify[0]?.is_verified;

        if (isLocationVerified && isContactVerified) {
          status = "Verified";
          bgColor = "#07ad02";
        } else if (!isLocationVerified && !isContactVerified) {
          status = "Unverified";
          bgColor = "#EA4335";
        } else {
          status = "Incomplete";
          bgColor = "#EA4335";
        }
      }
    } else if (name === "Owner Verification") {
      if (ownerVerify.length !== 0) {
        const isOwnerVerified = ownerVerify[0]?.is_verified;

        if (isOwnerVerified) {
          status = "Verified";
          bgColor = "#07ad02";
        } else {
          status = "Unverified";
          bgColor = "#EA4335";
        }
      }
    } else if (name === "Outlet Documents") {
      if (companyVerify.length !== 0 && panVerify.length !== 0) {
        const isCompanyVerified = companyVerify[0]?.is_verified;
        const isPanVerified = panVerify[0]?.is_verified;

        if (isCompanyVerified && isPanVerified) {
          status = "Verified";
          bgColor = "#07ad02";
        } else if (!isCompanyVerified && !isPanVerified) {
          status = "Unverified";
          bgColor = "#EA4335";
        } else {
          status = "Incomplete";
          bgColor = "#EA4335";
        }
      }
    }
    return { status, bgColor };
  };

  const statusInfo = getStatus();
  const { status, bgColor } = statusInfo;

  return (
    <div onClick={() => handleSelectedSection(name as string)}>
      <div className="p-4 flex items-center justify-between bg-[#F5F6F7] rounded-2xl cursor-pointer">
        <div className="flex items-center text-sm font-normal font-poppins gap-3">
          <div>
            <img src={svg} alt={name} />
          </div>
          <div className="flex flex-col gap-1">
            <p>{name}</p>
            {name !== "Manage Team" && (
              <p
                className="text-center w-fit px-2 py-1 text-primaryColorText rounded-lg font-semibold text-xs"
                style={{ backgroundColor: bgColor }}
              >
                {status}
              </p>
            )}
          </div>
        </div>
        <MdKeyboardArrowRight />
      </div>
    </div>
  );
};

export default ProfileSingleList;
