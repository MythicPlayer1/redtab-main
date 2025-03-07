import React from "react";
import { InvoiceModalLayout } from "./index";
import { CancelSVG } from "../Svg";
import emoji from "/emoji.png";
import { Link } from "react-router-dom";

interface SMSModalProps {
  handleHide: () => void;
  handleClick: () => void;
}

const InvoiceAmountModal: React.FC<SMSModalProps> = ({ handleHide, handleClick }) => {
  return (
    <InvoiceModalLayout className="flex-col h-[350px] rounded-t-2xl  bg-[#ffffff] absolute bottom-0 mb-0">
      {/* for cross part */}

      <div className="  flex  justify-end p-1 w-screen">
        <div
          className="flex justify-center items-center mt-0.5 text-secondaryColorTextBtn rounded-full text-lg cursor-pointer h-8 w-8"
          onClick={handleHide}
        >
          <CancelSVG />
        </div>
      </div>
      {/* emoji Icon */}
      <div className="flex w-full  justify-center items-center ">
        <div className=" w-[74px] h-[74px] bg-[#f5f6f7] rounded-full flex justify-center items-center">
          <img src={emoji} alt="sms" />
        </div>
      </div>
      {/* text section  */}
      <div className="w-full h-20  flex justify-center items-center flex-col ">
        <div className="mt-4">
          <h1 className="font-poppins font-normal text-xs text-[#667085]">Remaining balance: 20.000रु</h1>
        </div>
        <div className="h-[60px] w-[269px] mt-2">
          <h1 className="font-poppins font-semibold text-[20px] text-center">Invoice amount exceeds </h1>
          <h1 className="font-poppins font-semibold text-[20px] text-center">remaining balance</h1>
        </div>
      </div>

      {/* last section */}
      <div className="absolute bottom-0 left-0 right-0 pl-2 pr-2 mb-4 space-y-4">
        <Link
          to="/tab-pay-credit"
          className=" h-[44px] w-[98%] bg-[#F5F6F7] rounded-full text-[#EA4335] font-semibold font-poppins text-sm flex  justify-center items-center "
          onClick={handleClick}
        >
          Request limit increase
        </Link>
        <Link
          to=""
          className=" h-[44px] w-[98%] bg-[#F5F6F7] rounded-full text-[#EA4335] font-semibold font-poppins text-sm flex  justify-center items-center "
          onClick={handleClick}
        >
          Go back
        </Link>
      </div>
    </InvoiceModalLayout>
  );
};

export default InvoiceAmountModal;
