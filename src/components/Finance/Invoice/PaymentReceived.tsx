import { usePaidTransactionStore } from "../../../store/pay-invoice-store/use-payment-details-store";
import { BackArrowLess, HomeSVG, PaymentInvoiceSVG } from "../../Svg";
import CardDetail from "./CardDetail";
import PersonDetails from "./PersonDetails";

const PaymentReceived = () => {
  const { paidAmount } = usePaidTransactionStore();
  const transactionYear = new Date(paidAmount?.transaction_time || '').toLocaleDateString();
  const transactionTime = new Date(paidAmount?.transaction_time || '').toLocaleTimeString()
 
  return (
    <>
      <div className="w-full h-screen bg-[#f5d4cc]">
        {/* first section */}
        <div className="h-[10%] bg-[#f5d4cc]">
          <div className="w-full h-[44px] flex justify-center">
            <div className="w-[93%] h-[44px] flex justify-between items-center mt-1.5">
              <BackArrowLess to="/pay-invoice" onClick={() => {}} />
              <HomeSVG to="/finance" onClick={() => {}} />
            </div>
          </div>
        </div>
        {/* second section */}
        <div className="h-[90%] w-full bg-[#ffffff] rounded-t-[24px]">
          <div className="w-full flex justify-center relative">
            {/* icon section */}
            <div className="w-[62px] h-[62px] bg-[#EA4335] absolute top-[-31px] left-1/2 transform -translate-x-1/2 rounded-3xl flex items-center justify-center">
              <PaymentInvoiceSVG />
            </div>
            {/* content section */}
          </div>
          {/* first text */}
          <div className="w-full mt-14 flex justify-center">
            <h1 className="  h-[16px] text-center text-xs font-poppins font-medium">Payment received</h1>
          </div>
          {/* amount section */}
          <div className="relative w-full h-[36px] ">
            <div className="absolute left-1/2 transform -translate-x-1/2 top-2 flex items-center">
              <h1 className="text-[28px] font-semibold text-center font-poppins ">+{paidAmount?.amount} </h1>
              <h1 className="text-[28px] font-semibold font-poppins text-secondaryColorTextBtn">रु</h1>
            </div>
          </div>
          {/* card section */}
          {/* if api call happens then only fetch the data in  transaction id and time */}
          <div className="relative w-full h-[98px]">
            <CardDetail
              title="#REDTAB detail"
              transactionIDName="REDTAB transaction ID"
              // transactionTime={paidAmount?.transaction_time || ''}
              transactionYear={transactionYear} // Sending year as a prop
              transactionTime={transactionTime}
              transactionID={paidAmount?.redtab_transaction_id || ''}
            />
          </div>
          <div className="relative w-full h-[98px] mt-8">
            <CardDetail
              title="Gateway Detail"
              transactionIDName="Gateway Transaction ID"
              transactionTime=""
              transactionID="-"
            />
          </div>
          {/* card section end here */}
          {/* person detial section */}
          <div className="relative w-full h-[98px] mt-8">
            <PersonDetails
              storeName={paidAmount?.buyer_name || ''}
              walletName="-"
              Accountnumber="-"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentReceived;
