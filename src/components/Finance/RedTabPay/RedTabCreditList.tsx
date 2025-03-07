import BusinessHomeSVG from "../../Svg/BusinessHomeSVG";
import {
  RecipientBillingData,
  useRecipientBillingCredit,
} from "../../../store/redtab-pay-store/use-recipient-billing-credit";
interface RedTabCreditProps {
  recipientBillingList: RecipientBillingData[];
}
const RedTabCredit: React.FC<RedTabCreditProps> = ({ recipientBillingList }) => {
  return (
    <div className="h-auto">
      <div className="sticky top-[-4px] py-4 bg-[#ffffff] z-10 ">
        <h1 className="text-sm pl-4 font-semibold font-poppins">PAID with REDTAB credit</h1>
      </div>
      {useRecipientBillingCredit?.getState()?.isLoading === false && recipientBillingList.length === 0 ? (
        <p className="ps-4">No transactions found for paid with RedTab.</p>
      ) : (
        <div className="grid grid-cols-1 gap-1 lg:grid-cols-2 lg:gap-8 mt-2">
          {recipientBillingList?.map((billingList) => (
            <div
              key={billingList.uuid}
              className="h-[100px] w-full lg:w-11/12   flex     items-center bg-primaryColo border-t-2 border-[#F5F6F7]"
            >
              <div className="flex flex-col justify-between w-full pl-4  pr-4">
                <div className="flex items-center space-x-4 ">
                  <div className="h-[48px] w-[48px] bg-[#F5F6F7]  flex justify-center items-center rounded-full">
                    <BusinessHomeSVG />
                  </div>
                  <div className="flex flex-col ">
                    <h1 className="text-sm font-medium font-poppins">{billingList.buyer_name}</h1>
                    <div className="text-xs flex space-x-2">
                      <p className="text-xs font-poppins font-normal text-secondaryColorTextBtn">
                        {" "}
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
                    <span className="text-secondaryColorText font-poppins text-base font-semibold">
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

export default RedTabCredit;
