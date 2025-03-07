import { useNavigate } from "react-router-dom";
import CrossArrow from "../../Button/CrossArrow";
import TransactionTabs from "./TransactionTabs";
import { useRecipientBillingPendingStore } from "../../../store/pay-invoice-store/use-recipient-billing-pending.store";

const PayInvoice = () => {
  const navigate = useNavigate();
  // Retrieve the count from the store
  const count = useRecipientBillingPendingStore((state) => state.count);
  return (
    <>
      <div className="w-full h-screen">
        {/* first section */}
        <div className="pl-4 pt-4">
          <CrossArrow to="" onClick={() => navigate("/finance")} className="w-7 h-7" />
        </div>
        {/* second section */}
        <div className="flex pl-4 items-center space-x-1">
          <h1 className="font-poppins font-semibold text-[28px] ">Pay Invoice</h1>
          <span className=" bg-primaryColor text-[white] mt-1 text-sm rounded-full font-semibold font-poppins h-5 w-5 flex justify-center">
            {count}
          </span>
        </div>
        {/* third section  */}
        <div className="mt-4">
          <TransactionTabs />
        </div>
      </div>
    </>
  );
};

export default PayInvoice;
