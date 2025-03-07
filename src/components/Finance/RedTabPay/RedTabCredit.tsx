import React, { useState, useRef } from "react";
import LeftArrowButton from "../../Button/LeftArrowButton";
import { ButtonPrimary } from "../../Button/ButtonPrimary";
import { useRedTabCreditListStore } from "../../../store/redtab-pay-store/use-redTab-credit-store";
import { useSelectedOutletUuidStore } from "../../../store/merchant-profile/use-merchant-profile-outlet-store";
import { useCreditLimitIncrease } from "../../../store/redtab-pay-store/use-credit-limit-increase";
import { useNavigate } from "react-router-dom";

const amounts = [100, 200, 300, 400, 500]; // Add more amounts as needed

const RedTabCredit: React.FC = () => {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { creditLimitIncrease } = useCreditLimitIncrease();
  const { redTabCreditList } = useRedTabCreditListStore();
  const { selectedOutletId } = useSelectedOutletUuidStore();

  const handleUnselect = (e: React.MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setSelectedAmount(null);
    }
  };
  const handleCreditLimit = async () => {
    if(selectedOutletId && selectedAmount){
      await creditLimitIncrease({
        outlet: selectedOutletId,
        credit_limit_increment: selectedAmount,
      });
    }
    if(useCreditLimitIncrease?.getState()?.verifySuccess){
      navigate('/tab-request')
    }
  };

  return (
    <div className="w-full h-screen" onClick={handleUnselect}>
      {/* arrow section */}
      <div className="flex items-center justify-between pl-4 mt-4">
        <LeftArrowButton to="/tab-pay" />
      </div>
      {/* second section */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
        <div className="h-24 rounded-lg p-4 flex items-center space-x-1">
          <div className="p-2 h-10 w-10 rounded-full mr-2 flex items-center justify-center bg-primaryColor text-[white] mb-1 font-semibold"></div>
          <div className="space-y-1">
            <h1 className="text-sm font-semibold font-poppins">REDTAB credit</h1>
            <span className="flex items-center space-x-1">
              <p className="text-xs font-poppins text-secondaryColorTextBtn">Current limit:</p>
              <p className="text-sm font-medium font-poppins opacity-70">{redTabCreditList?.credit_limit}रु</p>
            </span>
          </div>
        </div>
      </div>
      {/* box section for selection of amount */}
      <div ref={containerRef}>
        <h1 className="text-2xl ml-4 font-semibold font-poppins">
          How much do you <br /> want to increase?
        </h1>
        <div className="grid grid-cols-3 gap-2 lg:grid-cols-4 lg:gap-8 mt-1 p-4">
          {amounts?.map((amount) => (
            <div
              key={amount}
              className={`h-[74px]  rounded-lg bg-[#F8F8F8] flex justify-center items-center cursor-pointer ${
                selectedAmount === amount ? "border border-secondaryColorText" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedAmount(amount);
              }}
            >
              <h1 className="font-poppins font-normal text-sm">{amount}.00रु</h1>
            </div>
          ))}
        </div>
      </div>
      {/* button section */}
      <div className="fixed bottom-0 left-0 right-0 p-5">
        <ButtonPrimary className="w-full" size="large" disabled={selectedAmount === null} onClick={handleCreditLimit}>
          {"Continue"}
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default RedTabCredit;
