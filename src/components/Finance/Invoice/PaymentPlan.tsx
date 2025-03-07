import CrossArrow from "../../Button/CrossArrow";
import { useNavigate } from "react-router-dom";
import { ButtonPrimary } from "../../Button/ButtonPrimary";
import {
  useInvoiceUUIDStore,
  useRecipientBillingPendingStore,
} from "../../../store/pay-invoice-store/use-recipient-billing-pending.store";
import { useCreditPay } from "../../../store/pay-invoice-store/use-credit-pay";
import { usePaymentPlanStore } from "../../../store/pay-invoice-store/use-review-payment-plan-store";
import { useRedTabCreditListStore } from "../../../store/redtab-pay-store/use-redTab-credit-store";
import { convertDate, convertDateToNepaliFormat } from "../../../utils/useful-func";

const PaymentPlan = () => {
  const navigate = useNavigate();
  const { creditPay } = useCreditPay();
  const { selectedInvoiceUUID } = useInvoiceUUIDStore();
  const { recipientBillingPending } = useRecipientBillingPendingStore();
  const { redTabCreditList } = useRedTabCreditListStore();
  const { paymentPlan } = usePaymentPlanStore();
  const selectedInvoice = recipientBillingPending?.find((invoice) => invoice.uuid === selectedInvoiceUUID);
  const total = selectedInvoice?.total_sales;
  
  const handleRedTabPay = async () => {
    const formattedDate = convertDate();
    const formattedNepaliDate = convertDateToNepaliFormat();
    if (formattedDate && formattedNepaliDate && selectedInvoiceUUID) {
      await creditPay({
        receipt_uuid: selectedInvoiceUUID,
        interest: paymentPlan?.interest,
        service_fee: paymentPlan?.service_fee,
        invoice_english_date: formattedDate,
        invoice_nepali_date: formattedNepaliDate,
      });
    }
    if (useCreditPay?.getState()?.verifySuccess) {
      navigate("/payment-details");
    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-between">
        <div className="px-1 min-h-[calc(100dvh-76px)]">
          {/* first section */}
          <div className="flex w-full p-4 items-center">
            <CrossArrow className="text-2xl mr-4" to="/business-name-invoice" onClick={() => {}} />
          </div>
          <h1 className="text-[28px] ml-4 font-semibold font-poppins w-[250px] md:w-auto">Review your payment plan</h1>
          {/* third section */}
          <div className="flex justify-between mt-[20px] px-4">
            <h1 className="font-semibold text-sm font-poppins">Estimated Daily Installment for:</h1>
            <h1 className="font-bold text-sm font-poppins">{total} रु</h1>
          </div>

          {/* Payment plan details */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 w-full mt-4 px-4">
            <div className="flex justify-center items-center w-full">
              <div className="flex flex-col rounded-lg w-full bg-white shadow p-4">
                <div className="flex justify-between items-center border-b-2 border-dashed border-[#D0D5DD] pb-3">
                  <h6 className="text-secondaryColorTextBtn font-normal text-sm font-poppins">In 60 days</h6>
                  <h2 className="text-primaryColor text-2xl font-poppins font-semibold">
                    {paymentPlan?.per_day} रु/ <span className="text-secondaryColorTextBtn text-2xl">day</span>
                  </h2>
                </div>
                <div className="flex justify-between items-center border-b-2 border-dashed border-[#D0D5DD] py-[10px]">
                  <h6 className="text-secondaryColorTextBtn font-normal text-sm font-poppins">Interest</h6>
                  <h2 className="text-sm font-poppins font-semibold">{paymentPlan?.interest} रु</h2>
                </div>
                <div className="flex justify-between items-center border-b-2 border-dashed border-[#D0D5DD] py-[10px]">
                  <h6 className="text-secondaryColorTextBtn font-normal text-sm font-poppins">5% Service Fee</h6>
                  <h2 className="text-sm font-poppins font-semibold">{paymentPlan?.service_fee} रु</h2>
                </div>
                <div className="flex justify-between items-center pt-[10px]">
                  <h6 className="font-semibold text-sm font-poppins">Total</h6>
                  <h2 className="text-sm font-poppins font-semibold">{paymentPlan?.total} रु</h2>
                </div>
              </div>
            </div>
          </div>

          {/* RedTab Credit section */}
          <div className="flex flex-col items-center w-full mt-[30px] px-4">
            <div className="bg-[#F2F4F7] w-full rounded-2xl p-4">
              <div className="flex justify-between items-center pb-6">
                <div className="flex items-center w-full">
                  <div className="p-[22px] rounded-full flex items-center justify-center bg-primaryColor text-white font-semibold"></div>
                  <div className="ml-4 w-[100%]">
                    <h1 className="font-poppins font-semibold text-sm">REDTAB Credit</h1>
                    <div className="flex justify-between items-center">
                      <h1 className="font-normal text-sm font-poppins text-[#667085]">Remaining Balance:</h1>
                      <h2 className="text-sm font-semibold font-poppins">
                        {redTabCreditList?.credit_remaining || 0.0} रु
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center border-t-2 border-dashed border-[#D0D5DD] py-[10px]">
                <h6 className="text-secondaryColorTextBtn font-normal text-sm font-poppins">To be used</h6>
                <h2 className="text-sm font-poppins font-semibold">{paymentPlan?.total || 0} रु</h2>
              </div>
              <div className="flex justify-between items-center border-t-2 border-dashed border-[#D0D5DD] pt-[10px]">
                <h6 className="text-secondaryColorTextBtn font-normal text-sm font-poppins">After payment balance</h6>
                <h2 className="text-sm font-poppins font-semibold">
                  {(redTabCreditList?.credit_remaining || 0) - (paymentPlan?.total || 0)} रु
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Pay button fixed at the bottom */}
        <div className="w-full p-4">
          <ButtonPrimary className="w-full" size="large" onClick={handleRedTabPay}>
            Pay now with Redtab Pay
          </ButtonPrimary>
        </div>
      </div>
    </>
  );
};

export default PaymentPlan;
