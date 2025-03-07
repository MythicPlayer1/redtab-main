import React from "react";
import OutLetUploadTabSection from "../../components/upload-outlet/outlet-tab-section";
import LeftArrowButton from "../../components/Button/LeftArrowButton";

const UploadedEkycDetails = () => {
  return (
    <div className="w-full h-screen  pb-4 overflow-hidden ">
      <div className="flex  items-center mb-2  h-[44px] mt-[25px] text-[16px] font-poppins font-semibold leading-6 text-[#1D2939] px-4 text-center">
        <LeftArrowButton to="/profile" />
        <div className="w-full pr-[64px] justify-center">Outlet detail</div>
      </div>
      <OutLetUploadTabSection />
    </div>
  );
};
export default UploadedEkycDetails;
