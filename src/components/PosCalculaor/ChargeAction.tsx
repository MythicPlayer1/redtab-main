import { FC, PropsWithChildren, useEffect } from "react";
import CrossArrow from "../Button/CrossArrow";
import QRCode from "react-qr-code";
import { usePosCalculateAmount } from "../../store/pos-calculator/pos-cal-store";
import {
  UseDataForPayload,
  UseQrResponseDataStore,
  useTransactionCheck,
} from "../../store/pos-calculator/billing";
import { useSelectedOutletUuidStore } from "../../store/merchant-profile/use-merchant-profile-outlet-store";
import { useNavigate } from "react-router-dom";
import { usePosCalculator } from "../../store/pos-calculator/pos-calculator";
import { useCalculationStore } from "../../store/pos-calculator/pos-calculation-store";

interface ChargeActionProps {
  value?: string;
}

const ChargeAction: FC<PropsWithChildren<ChargeActionProps>> = () => {
  const qrDataJson = localStorage.getItem("qr-response-data");
  const qrParseData = qrDataJson ? JSON.parse(qrDataJson) : null;
  const qrValue = qrParseData?.state?.qrData?.data?.qr_data?.Payload;
  const { qrAmount } = usePosCalculateAmount.getState();
  const { postForBilling } = usePosCalculator();
  const navigate = useNavigate();
  const { dataForPayload, clearPayload } = UseDataForPayload();
  const { clearStore } = useCalculationStore();
  const { setCalculatedAmount, setExpressions, setTransactionType } = usePosCalculateAmount.getState();
  

  useEffect(() => {
    const { postForTransactionVerification } = useTransactionCheck?.getState();
    const { selectedOutletId } = useSelectedOutletUuidStore.getState();
    const checkTranasctionStatus = async () => {
      await postForTransactionVerification({
        transaction_id: qrParseData?.state?.qrData?.data?.transaction_id,
        outlet_uuid: selectedOutletId,
      });
      const { qrResponse } = UseQrResponseDataStore.getState();
      console.log(qrResponse);
      if (qrResponse.Status === "00") {
        clearInterval(intervalId); // Stop polling when payment is successful
        const payLoadForBilling = {
          ...dataForPayload,
          sct_txn_id: qrParseData?.state?.qrData?.data?.transaction_id,
        };
        await postForBilling(payLoadForBilling);
        if (usePosCalculator.getState().verifySuccess === true) {
          clearStore();
          clearPayload();
          setCalculatedAmount(0);
          setExpressions("0");
          setTransactionType("sales");
         // setSelectedPaymentMethod("cash");
          navigate("/pos-invoice");
          usePosCalculator.getState().setVerifySuccess(false);
        } // Replace with the actual path to navigate to
      }
    };
    const intervalId = setInterval(() => {
      checkTranasctionStatus();
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="cursor-pointer mx-4 my-5 self-start">
          <CrossArrow to="/pos-calculator" className="text-[28px]" />
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-[#1D2939] text-[14px] font-poppins font-semibold mt-16 leading-5">
            <p>Ask your customer to scan & pay.</p>
          </div>
          <div className="mt-[63px] text-[#1D2939] text-[14px] font-medium font-poppins leading-7">Amount</div>
          <div className="text-[28px] font-bold  font-poppins pb-6">
            <span className="mr-1">{qrAmount}</span>
            <span className="text-[#98A2B3]">रु</span>
          </div>
          <div className=" rounded-lg bg-[#fff]  w-[207.4px] h-[204px]">
            <QRCode
              size={256}
              fgColor="red"
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={qrValue || "0"}
              viewBox={`0 0 256 256`}
              level="L"
            ></QRCode>
          </div>
          <div className="font-poppins font-normal text-[12px] text-[#667085] mt-3 w-[130px]">
            Auto refresh after <span className="text-[#EA4335]">59s</span>
          </div>
        </div>
        <div className="px-6 w-full absolute  bottom-6">
          <div className="text-center w-full   bg-[#F5F6F7]  h-[96px] rounded-[12px] flex flex-col justify-center items-center">
            <div className="flex justify-center pb-2">
              <span className="loader"></span>
            </div>
            <p className="text-[16px] font-semibold text-[#1D2939] leading-6 font-poppins">Waiting for Payment</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChargeAction;
