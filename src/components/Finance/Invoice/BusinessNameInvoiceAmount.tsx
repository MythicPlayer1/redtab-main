import React from "react";
import {
  useInvoiceUUIDStore,
  useRecipientBillingPendingStore,
} from "../../../store/pay-invoice-store/use-recipient-billing-pending.store";
import { useOutletStore } from "../../../store/pay-invoice-store/use-basic-outlet-info-store";

const BusinessNameInvoiceAmount: React.FC = () => {
  const { selectedInvoiceUUID } = useInvoiceUUIDStore();
  const { recipientBillingPending } = useRecipientBillingPendingStore();
  const { buyerInfo } = useOutletStore();

  const selectedInvoice = recipientBillingPending?.find((invoice) => invoice.uuid === selectedInvoiceUUID);
  
  const circles = Array.from({ length: 12 }, (_, index) => (
    <div
      key={index}
      className="h-[22px] w-[22px] rounded-full mr-2 flex items-center justify-center bg-[#ffffff] text-white font-semibold"
    ></div>
  ));

  return (
    <>
      <div className="w-full h-auto flex justify-center items-center relative">
        <div className="w-[93%] h-auto bg-[#F5F6F7] rounded-t-xl flex justify-center items-center relative flex-col space-y-4 py-4">
          <div className="w-[96%] h-auto flex justify-center items-center">
            <div className="w-[94%] h-auto flex justify-center flex-col items-center">
              <span className="w-full flex justify-between items-center">
                <h1 className="font-poppins font-normal text-sm">Total</h1>
                <span className="flex items-center">
                  <h1 className="font-semibold text-[28px] font-poppins text-primaryColor">
                    {selectedInvoice?.total_sales}
                  </h1>
                  <h1 className="font-semibold text-[28px] font-poppins text-[#98A2B3]">रु</h1>
                </span>
              </span>
              <div className="w-full overflow-y-auto">
                {selectedInvoice?.receipt_details?.map((product) => (
                  <span
                    key={product.uuid}
                    className="w-full h-[38px] border-t-2 border-dashed border-[#D0D5DD] flex justify-between items-center "
                  >
                    <h1 className="font-poppins font-normal text-sm">{product.product_name}</h1>
                    <span className="flex items-center">
                      <h1 className="font-semibold text-sm font-poppins">{product.product_price}</h1>
                      <h1 className="font-semibold text-sm font-poppins text-[#98A2B3]">रु</h1>
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* second section */}
          <div className="w-[93%] h-[130px] flex justify-center items-center flex-col">
            <div className="w-[96%] h-[129px] flex flex-col justify-between">
              <div className="h-[74px]">
                <h1 className="font-poppins font-medium text-xs">To</h1>
                <h1 className="text-[#667085] font-medium text-xs font-poppins">{buyerInfo?.outlet_name}</h1>
                <h1 className="font-poppins text-xs font-normal text-[#667085]">{buyerInfo?.pan}</h1>
                <h1 className="font-poppins text-xs font-normal text-[#667085]">{buyerInfo?.location}</h1>
              </div>
              {/* date and invoice section start */}
              <div className="w-[100%] h-[36px] mb-[8px] flex items-center justify-between ">
                <div className="w-45%] h-[36px]">
                  <h1 className="text-xs font-normal font-poppins">Invoice No.</h1>
                  <h1 className="text-[#667085] pe-2 text-xs font-normal font-poppins">{selectedInvoice?.receipt_no}</h1>
                </div>
                <div>
                  <h1 className="text-xs font-normal font-poppins">Date</h1>
                  <h1 className="text-[#667085] text-xs font-normal font-poppins">
                    <span className="pr-2">
                      {new Date(selectedInvoice?.datetime_client || "").toLocaleDateString()}
                    </span>
                    <span>{new Date(selectedInvoice?.datetime_client || "").toLocaleTimeString()}</span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
          {/* second section ends here */}
        </div>
        <div className="absolute -bottom-3 w-[90%] flex justify-center">{circles}</div>
      </div>
    </>
  );
};

export default BusinessNameInvoiceAmount;
