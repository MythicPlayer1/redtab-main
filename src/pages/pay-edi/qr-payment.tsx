import React, { useEffect } from "react";
import CrossArrow from "../../components/Button/CrossArrow";
import QrPayment from "../../components/edi-pay/QrPayment";
import {
  useCheckEdiTransaction,
  useEdiTransactionResponse,
} from "../../store/edi-payment-store/use-check-edi-transaction";
import { useSelectedOutletUuidStore } from "../../store/merchant-profile/use-merchant-profile-outlet-store";
import { useEdiQrPaymentStore } from "../../store/edi-payment-store/use-edi-payment-qr";
import { useCreateEdiTransaction } from "../../store/edi-payment-store/use-create-edi-transaction";
import { useNavigate } from "react-router-dom";

const EdiQrPayment = () => {
  const navigate = useNavigate();
  const { checkEdiTransaction } = useCheckEdiTransaction();
  const { selectedOutletId } = useSelectedOutletUuidStore();
  const { transactionId } = useEdiQrPaymentStore();
  const { status } = useEdiTransactionResponse();
  const { createEdiTransaction } = useCreateEdiTransaction();

  useEffect(() => {
    // check edi transaction status in every 2 seconds
    const checkEdiTransactionStatus = async () => {
      if (selectedOutletId && transactionId) {
        await checkEdiTransaction({ outlet: selectedOutletId, txn_id: transactionId });
      }

      // if status is "00" then create edi transaction
      if (status === "00") {
        clearInterval(intervalId);
        await createEdiTransaction({ outlet: selectedOutletId, txn_id: transactionId });
        if(useCreateEdiTransaction?.getState()?.verifySuccess) {
          navigate("/edi-payment-success");
        }
      }
    };

    // Call checkEdiTransactionStatus every 2 seconds
    const intervalId = setInterval(checkEdiTransactionStatus, 2000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [selectedOutletId, transactionId, status]);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="cursor-pointer mx-4 my-5 self-start">
        <CrossArrow to="/finance" className="text-[28px]" />
      </div>
      <QrPayment />
    </div>
  );
};

export default EdiQrPayment;
