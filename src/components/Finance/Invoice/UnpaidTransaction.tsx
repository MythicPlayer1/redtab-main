import { useOutletInfo } from "../../../store/pay-invoice-store/use-basic-outlet-info";
import { useRecipientBillingPending } from "../../../store/pay-invoice-store/use-recipient-billing-pending";
import {
  useInvoiceUUIDStore,
  useRecipientBillingPendingStore,
} from "../../../store/pay-invoice-store/use-recipient-billing-pending.store";
import BusinessHomeSVG from "../../Svg/BusinessHomeSVG";
import { useNavigate } from "react-router-dom";

const UnPaidTransaction: React.FC = () => {
  const navigate = useNavigate();
  const { recipientBillingPending } = useRecipientBillingPendingStore();
  const { setSelectedInvoiceUUID } = useInvoiceUUIDStore();
  const { sellerOutletInfo, buyerOutletInfo } = useOutletInfo();
  const handleSelectedInvoice = async (uuid: string, buyerUUID: string, sellerUUID: string) => {
    if (uuid) {
      setSelectedInvoiceUUID(uuid);
    }
    if (buyerUUID) {
      await buyerOutletInfo(buyerUUID);
    }
    if (sellerUUID) {
      await sellerOutletInfo(sellerUUID);
    }
    if (useOutletInfo?.getState()?.verifySuccess === true && uuid) {
      navigate("/business-name-invoice");
    }
  };
  return (
    <div className="h-auto mt-6">
      {useRecipientBillingPending?.getState()?.isLoading === false && recipientBillingPending?.length === 0 ? (
        <p className="ps-2">All transactions are settled</p>
      ) : (
        <div className="grid grid-cols-1 gap-1 lg:grid-cols-2 lg:gap-8 mt-2 ">
          {recipientBillingPending?.map((billingList) => (
            <div
              key={billingList.uuid}
              onClick={() =>
                handleSelectedInvoice(billingList.uuid, billingList.buyer_uuid, billingList.fk_outlet_uuid)
              }
              className="h-[100px] w-full cursor-pointer lg:w-11/12 flex items-center bg-primaryColo border-t-2 border-[#F5F6F7]"
            >
              <div className="flex flex-col justify-between w-full pl-2 pr-2">
                <div className="flex items-center space-x-4 ">
                  <div className="p-3 bg-[#F5F6F7] flex justify-center items-center rounded-full">
                    <BusinessHomeSVG />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-sm font-medium font-poppins">{billingList.seller_name}</h1>
                    <div className="text-xs flex space-x-2">
                      <p className="text-xs font-poppins font-normal text-secondaryColorTextBtn">
                        {new Date(billingList.datetime_client).toLocaleDateString()}
                      </p>
                      <p className="text-xs font-poppins font-normal text-secondaryColorTextBtn">
                        {" "}
                        {new Date(billingList.datetime_client).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <div className="flex space-x-2 items-center w-[280px] overflow-x-hidden">
                    {billingList?.receipt_details?.map((product) => (
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

export default UnPaidTransaction;
