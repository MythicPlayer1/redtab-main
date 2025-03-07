import React, { useState } from "react";
import UnPaidTransaction from "./UnpaidTransaction";
import PaidTransaction from "./PaidTransactionList";
import { useSelectedOutletUuidStore } from "../../../store/merchant-profile/use-merchant-profile-outlet-store";
import { useRecipientBillingPending } from "../../../store/pay-invoice-store/use-recipient-billing-pending";
import {
  RecipientBillingCompleteData,
  useRecipientBillingComplete,
} from "../../../store/pay-invoice-store/use-recipient-billing-complete";

const TransactionTabs: React.FC = () => {
  const [recipientBillingComplete, setRecipientBillingComplete] = useState<RecipientBillingCompleteData[]>([]);
  const [activeTab, setActiveTab] = useState<"unpaid" | "paid">("unpaid");
  const { selectedOutletId } = useSelectedOutletUuidStore();
  const { getRecipientBillingComplete } = useRecipientBillingComplete();
  const { getRecipientBillingPending } = useRecipientBillingPending();

  const UnpaidContent = () => <UnPaidTransaction />;
  const PaidContent = () => <PaidTransaction recipientBillingComplete={recipientBillingComplete} />;

  const renderContent = () => {
    switch (activeTab) {
      case "unpaid":
        return <UnpaidContent />;
      case "paid":
        return <PaidContent />;
      default:
        return null;
    }
  };

  const handleUnpaid = async () => {
    setActiveTab("unpaid");
    if (selectedOutletId) {
      await getRecipientBillingPending(selectedOutletId);
    }
  };
  const handlePaid = async () => {
    setActiveTab("paid");
    if (selectedOutletId) {
      const paidBill = await getRecipientBillingComplete(selectedOutletId);
      setRecipientBillingComplete(paidBill);
    }
  };

  return (
    <div className="w-full pl-3 pr-3">
      <div className="flex justify-center items-center  w-full bg-[#F5F5F5] h-10 rounded-full">
        <button
          type="button"
          className={` font-semibold text-[13px] font-poppins   w-[50%] h-[35.5px] ${
            activeTab === "unpaid" ? "shadow rounded-full ml-0.5 bg-[#ffffff]" : "text-secondaryColorTextBtn"
          }`}
          onClick={handleUnpaid}
        >
          Unpaid
        </button>
        <button
          type="button"
          className={`  font-semibold text-[13px] font-poppins  w-[50%] h-[35.5px]  ${
            activeTab === "paid" ? "shadow   mr-0.5 rounded-full bg-[#ffffff]" : "text-secondaryColorTextBtn"
          }`}
          onClick={handlePaid}
        >
          Paid
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default TransactionTabs;
