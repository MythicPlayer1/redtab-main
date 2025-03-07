import React from "react";
import { PaymentCompletSVG } from "../../components/Svg";
import PaymentSuccess from "../../components/edi-pay/PaymentSuccess";
import Invoice from "/receipt.svg";
import { useEdiCalculateStore } from "../../store/edi-payment-store/use-edi-calculate";

const EdiPaymentSuccess = () => {
  const { edi } = useEdiCalculateStore();

  return (
    <div className="w-full h-screen overflow-y-hidden bg-[#f8f8f8]">
      <div className="min-h-[30%]">
        <div className="h-[44px]  flex justify-center items-center">
          <h1 className=" font-poppins font-semibold text-sm">Payment Detail</h1>
        </div>
        {/* First section */}
        <div className="flex justify-center items-center mt-3">
          <div className="w-14 h-14">
            <PaymentCompletSVG />
          </div>
        </div>
        {/* Second section */}
        <div className="flex justify-center items-center flex-col mt-2">
          <h1 className=" font-poppins font-semibold text-2xl">Payment success</h1>
          <h1 className="font-poppins font-semibold text-2xl">{edi?.daily_amount}रु</h1>
          <div className="flex items-center space-x-1 py-[10px]">
            <img src={Invoice} alt="invoice-image" />
            <span className="text-sm leading-[16px] text-[#1D2939]">Invoice Sent</span>
          </div>
        </div>
      </div>
      <PaymentSuccess />
    </div>
  );
};

export default EdiPaymentSuccess;
