import { useNavigate } from "react-router-dom";
import { usePaidTransactionDetails } from "../../../store/pay-invoice-store/use-payment-details";
import BusinessHomeSVG from "../../Svg/BusinessHomeSVG";
import { RecipientBillingCompleteData, useRecipientBillingComplete } from "../../../store/pay-invoice-store/use-recipient-billing-complete";

interface PaidTransactionProps{
  recipientBillingComplete: RecipientBillingCompleteData[];
}
const PaidTransaction: React.FC<PaidTransactionProps> = ({ recipientBillingComplete}) => {
  const navigate = useNavigate();
  const { paidTransaction } = usePaidTransactionDetails();

  //hit api to display paid transaction details
  const handlePaidTransactionDetail = async (invoiceId: string, buyerUUID: string) => {
    if(invoiceId &&  buyerUUID){
    await paidTransaction(invoiceId, buyerUUID);
    if (usePaidTransactionDetails?.getState()?.verifySuccess) {
      navigate("/payment-receive");
    }
  }
  };

  return (
    <div className="h-auto mt-6">
      {useRecipientBillingComplete?.getState()?.isLoading === false && recipientBillingComplete?.length === 0 ? (
        <p className="ps-2">No payments made yet</p>
      ) : (
        <div className="grid grid-cols-1 gap-1 lg:grid-cols-2 lg:gap-8 mt-2 ">
          {recipientBillingComplete?.map((billingList) => (
            <div
              key={billingList.uuid}
              onClick={() => handlePaidTransactionDetail(billingList.invoice_number, billingList.buyer_uuid)}
              className="h-[100px] w-full cursor-pointer lg:w-11/12  flex items-center bg-primaryColo border-t-2 border-[#F5F6F7]"
            >
              <div className="flex flex-col justify-between w-full pl-2 pr-2">
                <div className="flex items-center space-x-4 ">
                  <div className="p-3 bg-[#F5F6F7]  flex justify-center items-center rounded-full">
                    <BusinessHomeSVG />
                  </div>
                  <div className="flex flex-col ">
                    <h1 className="text-sm font-medium font-poppins">{billingList.buyer_name}</h1>
                    <div className="text-xs flex space-x-2">
                      <p className="text-xs font-poppins font-normal text-secondaryColorTextBtn">
                        {new Date(billingList.datetime_client).toLocaleDateString()}
                      </p>
                      <p className="text-xs font-poppins font-normal text-secondaryColorTextBtn">
                        {new Date(billingList.datetime_client).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <div className="flex space-x-2 items-center w-[280px] overflow-x-hidden">
                    {billingList?.billing_details?.map((product) => (
                      <p key={product.uuid} className="text-xs font-poppins font-normal text-secondaryColorTextBtn">
                        {product.product_name}
                      </p>
                    ))}
                  </div>
                  <h3 className="flex items-center">
                    <span className="text-secondaryColorText font-poppins  text-base font-semibold">
                      {" "}
                      {billingList.total_sales}
                    </span>
                    <span className="text-secondaryColorTextBtn font-poppins  text-base font-semibold">रु</span>
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaidTransaction;
