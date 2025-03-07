import React, { useEffect, useState } from "react";
import Header from "./header";
import { useOwnerVerifyStore } from "../../store/owner-identity/use-owner-verification";
import { useOwnerStore } from "../../store/owner-identity/use-owner-verification-store";
import OutletEdit from "../Input/OutletEdit";

const OwnerDetail = () => {
  const { ownerVerify } = useOwnerVerifyStore();
  const [updateCountry, setUpdateCountry] = useState<string | null>(null);
  const [updateIdFrontImage, setUpdateIdFrontImage] = useState<string | null>(null);
  const [updateIdBackImage, setUpdateIdBackImage] = useState<string | null>(null);
  const [updateOwnerImage, setUpdateOwnerImage] = useState<string | null>(null);
  const { country, idFrontImage, idBackImage, ownerImage } = useOwnerStore();
  
  // set the owner details
  useEffect(() => {
    if (ownerVerify) {
      setUpdateCountry(ownerVerify[0]?.country);
      const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
      // set the image urls
      if (baseUrl) {
        setUpdateIdFrontImage(ownerVerify[0]?.id_front_image ? `${baseUrl}${ownerVerify[0]?.id_front_image}` : null);
        setUpdateIdBackImage(ownerVerify[0]?.id_back_image ? `${baseUrl}${ownerVerify[0]?.id_back_image}` : null);
        setUpdateOwnerImage(ownerVerify[0]?.owner_image ? `${baseUrl}${ownerVerify[0]?.owner_image}` : null);
      }
    }
  }, [ownerVerify]);
  
  const displayCountry = updateCountry ?? country ?? "";
  const displayIdFrontImage = updateIdFrontImage ?? idFrontImage ?? "";
  const displayIdBackImage = updateIdBackImage ?? idBackImage ?? "";
  const displayOwnerImage = updateOwnerImage ?? ownerImage ?? "";

  return (
    <div>
      <Header title="Owner Identity" path="/kyc/pan/verify-owner"/>
      <div className="border-dashed border-[1px] border-[#DDDDE3] my-4"></div>
      <OutletEdit label={"Country"} value={displayCountry} />
      <div className="border-dashed border-[1px] border-[#DDDDE3] my-4"></div>
      <div>
        <h3 className="text-[#667085] text-sm font-normal mb-4">Front document photo</h3>
        {displayIdFrontImage ? (
          <div className="border border-[#d0d5dd] bg-primaryColorText rounded-[0.75rem] flex text-center items-center justify-center">
            <img src={displayIdFrontImage} alt="Preview" className="w-full h-full" />
          </div>
        ) : (
          <p>No front image uploaded</p>
        )}
      </div>
      <div>
        <h3 className="text-[#667085] text-sm font-normal my-4">Back document photo</h3>
        {displayIdBackImage ? (
          <div className="border border-[#d0d5dd] bg-primaryColorText rounded-[0.75rem] flex text-center items-center justify-center">
            <img src={displayIdBackImage} alt="Preview" className="w-full h-full" />
          </div>
        ) : (
          <p>No back image uploaded</p>
        )}
      </div>
      <div>
        <h3 className="text-[#667085] text-sm font-normal my-4">Owner selfie</h3>
        {displayOwnerImage ? (
          <div className="border border-[#d0d5dd] bg-primaryColorText rounded-[0.75rem] flex text-center items-center justify-center">
            <img src={displayOwnerImage} alt="Preview" className="w-full h-full" />
          </div>
        ) : (
          <p>No owner image uploaded</p>
        )}
      </div>
    </div>
  );
};

export default OwnerDetail;