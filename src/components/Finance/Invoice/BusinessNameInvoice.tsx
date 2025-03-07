import React, { useState } from "react";
import { ButtonPrimary } from "../../Button/ButtonPrimary";
import InputRadio from "../../Input/InputRadio";
import { BusinessHomeSVG } from "../../Svg/index";
import CrossArrow from "../../Button/CrossArrow";
import BusinessNameInvoiceAmount from "./BusinessNameInvoiceAmount";
import { InvoiceAmountModal } from "../../PopUpModal";
import { useOutletStore } from "../../../store/pay-invoice-store/use-basic-outlet-info-store";
import { useRedTabCreditListStore } from "../../../store/redtab-pay-store/use-redTab-credit-store";
import {
  useInvoiceUUIDStore,
  useRecipientBillingPendingStore,
} from "../../../store/pay-invoice-store/use-recipient-billing-pending.store";
import { useCreditPay } from "../../../store/pay-invoice-store/use-credit-pay";
import { useNavigate } from "react-router-dom";
import { usePaymentPlan } from "../../../store/pay-invoice-store/use-review-payment-plan";

const BusinessNameInvoice: React.FC = () => {
  // State to hold the product data
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"redtab" | "account" | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { redTabCreditList } = useRedTabCreditListStore();
  const { selectedInvoiceUUID } = useInvoiceUUIDStore();
  const { recipientBillingPending } = useRecipientBillingPendingStore();
  const { sellerInfo } = useOutletStore();
  const { creditCheck } = useCreditPay();
  const { paymentPlan } = usePaymentPlan();

  const selectedInvoice = recipientBillingPending?.find((invoice) => invoice.uuid === selectedInvoiceUUID);

  const handleContinueClick = async () => {
    const buyer_uuid = selectedInvoice?.buyer_uuid;
    const total = selectedInvoice?.total_sales;
    if (buyer_uuid && total) {
      await creditCheck({ outlet: buyer_uuid, amount: total });
    }
    if (useCreditPay?.getState()?.verifySuccess) {
      if(total ){
        await paymentPlan({amount: total});
      }
      navigate("/payment-plan");
    } else {
      setIsModalVisible(true);
    }
  };

  const handleModalHide = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="w-full h-screen relative overflow-y-hidden">
      {/* first section */}
      <div className="w-full h-[44px] flex justify-center items-center">
        <div className="h-[44px] w-[94%] flex items-center justify-between">
          <span className="flex w-[28px] h-[28px] justify-center items-center">
            <CrossArrow to="/pay-invoice" />
          </span>
          <span className="mr-8">
            <h1 className="font-poppins font-semibold text-sm">Invoice</h1>
          </span>
          <span className=""></span>
        </div>
      </div>
      {/* second section */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 mt-1.5 p-2">
        <div className="rounded-lg">
          <div className="w-full lg:w-11/12 rounded-lg p-2 flex flex-col justify-between bg-primaryColo">
            <div className="flex items-center space-x-4 ">
              <div className="bg-[#F5F6F7] p-3 flex items-center justify-center rounded-full">
                <BusinessHomeSVG width="7" height="7" />
              </div>
              {/* svg ends here */}
              <div className="flex flex-col">
                <h1 className="text-sm font-semibold font-poppins">{sellerInfo?.outlet_name}</h1>
                <div className=" flex flex-col justify-center space-y-1 mt-1">
                  <p className="text-xs font-poppins font-normal text-secondaryColorTextBtn">{sellerInfo?.pan}</p>
                  <p className="text-xs font-poppins font-normal text-secondaryColorTextBtn">{sellerInfo?.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* third section here */}
      <div className="flex flex-col h-full justify-between">
        <div className="w-full h-auto">
          <BusinessNameInvoiceAmount />
        </div>

        {/* fifth section */}
        <div className="sticky bottom-0 bg-[#ffffff] flex flex-col  ">
          <div className="grid grid-cols-1 gap-2 lg:gap-8 w-full  pt-2">
            <h4 className="font-poppins font-medium text-sm text-secondaryColorTextBtn ml-4 pb-2">
              Choose payment method
            </h4>
            <div className="w-full flex flex-col justify-center items-center pb-2 gap-4">
              <div className="w-[93%] bg-[#ffffff] shadow rounded-xl  flex flex-col justify-center py-4 pl-4 pr-4 space-y-3">
                {/* first section */}
                <div
                  className="rounded-lg w-full flex justify-between items-center cursor-pointer"
                  onClick={() => setSelectedPaymentMethod("redtab")}
                >
                  <div className="flex space-x-2">
                    <div className="p-2 h-11 w-11 rounded-full mr-2 flex items-center justify-center bg-primaryColor text-white font-semibold"></div>
                    <div className="space-y-1">
                      <h1 className="text-sm font-semibold font-poppins">REDTAB credit</h1>
                      <span className="flex items-center space-x-1">
                        <p className="text-xs font-poppins font-normal text-secondaryColorTextBtn">
                          Remaining Balance:
                        </p>
                        <p className="text-sm font-medium font-poppins">
                          {redTabCreditList?.credit_remaining ? redTabCreditList.credit_remaining : "0.00"}रु
                        </p>
                      </span>
                    </div>
                  </div>
                  <div className=" h-7 w-7 flex justify-center items-center">
                    {selectedPaymentMethod === "redtab" ? (
                      <InputRadio
                        name="paymentMethod"
                        label=""
                        value="redtab"
                        checked={selectedPaymentMethod === "redtab"}
                        onChange={() => setSelectedPaymentMethod("redtab")}
                      />
                    ) : (
                      <div className="h-6 w-6 rounded-full border-2 border-[#EAECF0]  "></div>
                    )}
                  </div>
                </div>
                {/* second section */}
                <div
                  className="rounded-lg w-full flex justify-between items-center cursor-pointer"
                  onClick={() => setSelectedPaymentMethod("account")}
                >
                  <div className="w-[80%] flex space-x-2">
                    <div className="p-2 h-11 w-11 rounded-full mr-2 flex items-center justify-center bg-[#FFDEDB] text-white font-semibold"></div>
                    <div className="space-y-1">
                      <h1 className="text-sm font-semibold font-poppins">Account Balance</h1>
                      <span className="flex items-center space-x-1">
                        <p className="text-xs font-poppins font-normal text-secondaryColorTextBtn">Current Balance:</p>
                        <p className="text-sm font-medium font-poppins">5000रु</p>
                      </span>
                    </div>
                  </div>
                  <div className=" h-7 w-7 flex justify-center items-center">
                    {selectedPaymentMethod === "account" ? (
                      <InputRadio
                        name="paymentMethod"
                        value="account"
                        label=""
                        checked={selectedPaymentMethod === "account"}
                        onChange={() => setSelectedPaymentMethod("account")}
                      />
                    ) : (
                      <div className="h-6 w-6 rounded-full border-2 border-[#EAECF0] "></div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full px-1">
                <ButtonPrimary
                  className="w-full"
                  size="large"
                  disabled={selectedPaymentMethod === "account" || selectedPaymentMethod !== "redtab"}
                  onClick={handleContinueClick}
                >
                  {"Continue"}
                </ButtonPrimary>
              </div>
            </div>
            {/* credit section */}
          </div>
        </div>
      </div>

      {isModalVisible && (
        <div className="fixed bottom-0 h-screen left-0 right-0 z-50 black-trans" onClick={handleModalHide}>
          <InvoiceAmountModal handleHide={handleModalHide} handleClick={() => {}} />
        </div>
      )}
    </div>
  );
};

export default BusinessNameInvoice;
