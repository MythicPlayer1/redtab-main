import React, { useState } from "react";
import PaymentReview from "../../components/edi-pay/PaymentReview";
import { ButtonPrimary } from "../../components/Button/ButtonPrimary";
import CrossArrow from "../../components/Button/CrossArrow";
import { useNavigate } from "react-router-dom";
import { useEdiQrPayment } from "../../store/edi-payment-store/use-edi-payment-qr";
import { useEdiCalculateStore } from "../../store/edi-payment-store/use-edi-calculate";

const EdiPaymentReview = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const navigate = useNavigate();
  const { edi } = useEdiCalculateStore();
  const { ediPaymentQr } = useEdiQrPayment();

  // handle pay with qr
  const handlePayQr = async () => {
    setIsDisabled(true);
    if (edi?.daily_amount) {
      await ediPaymentQr({ amount: edi?.daily_amount });
    }

    // disable button when loading
    if(useEdiQrPayment?.getState()?.isLoading === true) {
      setIsDisabled(true);
    }else{
      setIsDisabled(false);
    }

    // if success navigate to edi pay qr page
    if (useEdiQrPayment.getState().verifySuccess) {
      navigate("/edi-pay-qr");
    }
  };

  return (
    <div className="w-auto h-screen">
      <div className="">
        <span className="flex w-[98%] p-4 items-center">
          <CrossArrow className="text-2xl mr-4" to="" onClick={() => navigate("/finance")} />
        </span>
      </div>
      <div className="flex items-center w-[250px] md:w-full h-[72px]">
        <h1 className="text-[28px] ml-4 font-semibold font-poppins">Review your payment </h1>
      </div>
      <PaymentReview />
      <div className="fixed bottom-0 left-0 right-0 px-5 pb-5">
        <ButtonPrimary disabled={isDisabled} className="w-full" size="large"  onClick={handlePayQr}>
          {"Pay now with QR"}
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default EdiPaymentReview;
