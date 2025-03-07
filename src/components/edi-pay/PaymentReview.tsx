import React from "react";
import { useEdiCalculateStore } from "../../store/edi-payment-store/use-edi-calculate";
import { useRedTabCreditListStore } from "../../store/redtab-pay-store/use-redTab-credit-store";

const PaymentReview = () => {
  const { edi } = useEdiCalculateStore();
  const { redTabCreditList } = useRedTabCreditListStore();
 
  return (
    <div className="h-[calc(100dvh-193px)] flex flex-col justify-center py-4">
      <div className="h-[472px] flex flex-col justify-between">
        <div>
          <div className="flex justify-between">
            <h1 className="ml-4 font-semibold text-sm font-poppins">Estimated Daily Installment for:</h1>
            <h1 className="mr-4 font-bold text-sm font-poppins">{redTabCreditList?.credit_used} रु</h1>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 w-full mt-3 pl-1.5 pr-1.5 ">
            <div className="flex justify-center items-center w-full max-h-[250px] ">
              <div className="max-[154px] flex flex-col rounded-lg w-[95%] bg-[#ffffff] shadow">
                <div className="w-full max-h-[44px] flex justify-center">
                  <span className="flex justify-between items-center h-[44px]  w-[92%]  border-b-[1px] border-dashed border-[#D0D5DD]">
                    <h6 className=" text-[#667085] font-normal text-sm font-poppins">Amount</h6>
                    <h2 className=" text-primaryColor text-2xl font-poppins font-semibold flex items-center">
                      {edi?.daily_amount} रु/
                      <span className="text-secondaryColorTextBtn text-2xl font-poppins font-semibold ">day</span>
                    </h2>
                  </span>
                </div>
                <div className="w-full h-[44px] flex justify-center mt-4">
                  <span className="flex justify-between items-center h-[44px]  w-[92%]  border-b-[1px] border-dashed border-[#D0D5DD]">
                    <h6 className=" font-normal text-sm font-poppins text-[#667085]">Remaining Days</h6>
                    <h2 className=" text-sm font-poppins font-semibold">60 Days</h2>
                  </span>
                </div>
                <div className="w-full h-[44px] flex justify-center mt-4">
                  <span className="flex justify-between items-center h-[44px] w-[92%]">
                    <h6 className=" font-normal text-sm font-poppins text-[#667085]">Remaining Amount</h6>
                    <h2 className=" text-sm font-poppins font-semibold">
                      {(Number(redTabCreditList?.credit_used) - edi?.daily_amount).toFixed(2)}
                      <span className="text-secondaryColorTextBtn text-sm font-poppins font-semibold ">रु</span>
                    </h2>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* fifth section */}
        <div className="w-full max-h-[195px] flex justify-center pl-1.5 pr-1.5">
          <div className="w-[96%] bg-[#F2F4F7] rounded-2xl flex justify-center flex-col">
            <div className="w-[96%] flex justify-center mt-2">
              {/* red circle section */}
              <div className="flex justify-between w-[94%] items-center  ">
                <div className="flex justify-between items-center   h-[60px] space-x-1 ">
                  <div className="p-2 h-11 w-11 rounded-full mr-2 flex items-center justify-center bg-primaryColor text-white font-semibold"></div>
                  <span className="">
                    <h1 className="font-poppins font-semibold text-sm">REDTAB Credit</h1>
                    <h1 className="font-normal text-sm font-poppins text-[#667085]">Remaining Balance:</h1>
                  </span>
                </div>
                <span className="mt-6 flex items-center ml-10">
                  <h1 className="font-semibold font-poppins  text-sm">{redTabCreditList?.credit_remaining}</h1>
                  <h1 className="font-semibold font-poppins text-sm text-[#81899b]">रु</h1>
                </span>
              </div>
            </div>
            {/* another */}
            <div className="flex w-full h-[80%] justify-center  mb-2 flex-col">
              <div className="w-full h-[36px] flex justify-center mt-4 ">
                <span className="flex justify-between items-center h-[44px]  w-[92%]  border-t-[1px] border-dashed border-[#D0D5DD]">
                  <h6 className=" text-[#667085] font-normal text-sm font-poppins">Payment</h6>
                  <h2 className=" text-sm font-poppins font-semibold">
                    {edi?.daily_amount}
                    <span className="text-secondaryColorTextBtn text-sm font-poppins font-semibold ">रु</span>
                  </h2>
                </span>
              </div>
              <div className="w-full h-[44px] flex justify-center mt-4">
                <span className="flex justify-between items-center h-[44px]  w-[92%]  border-t-[1px] border-dashed border-[#D0D5DD]">
                  <h6 className=" text-[#667085] font-normal text-sm font-poppins">After EDI payment</h6>
                  <h2 className=" text-sm font-poppins font-semibold">
                    {(Number(redTabCreditList?.credit_remaining) + edi?.daily_amount).toFixed(2)}
                    <span className="text-secondaryColorTextBtn text-sm font-poppins font-semibold ">रु</span>
                  </h2>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentReview;
