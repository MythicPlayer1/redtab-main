import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TabLayout } from "../../TabLayout";
import TransactionList from "./TransactionList";
import { DownCircleSVG, PulsCircleSVG, PayInvoiceSVG } from "../../Svg";
import { useRedTabCreditListStore } from "../../../store/redtab-pay-store/use-redTab-credit-store";
import { useRecipientBillingPending } from "../../../store/pay-invoice-store/use-recipient-billing-pending";
import { useTransactionHistory, TransactionHistoryData } from "../../../store/finance-store/use-transaction-history";
import { useRedTabCredit } from "../../../store/redtab-pay-store/use-redTab-credit";
import { useSelectedOutletUuidStore } from "../../../store/merchant-profile/use-merchant-profile-outlet-store";
import { useRecipientBillingPendingStore } from "../../../store/pay-invoice-store/use-recipient-billing-pending.store";
import { useCalculateEdi, useEdiCalculateStore } from "../../../store/edi-payment-store/use-edi-calculate";

const FinanceHome: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [transactionHistory, setTransactionHistory] = useState<TransactionHistoryData[]>([]);
  const { getRecipientBillingPending } = useRecipientBillingPending();
  const { selectedOutletId } = useSelectedOutletUuidStore();
  const { redTabCreditList } = useRedTabCreditListStore();
  const { getTransactionHistory } = useTransactionHistory();
  const { getRedTabCredit } = useRedTabCredit();
  const count = useRecipientBillingPendingStore((state) => state.count);
  const { calculateEdi } = useCalculateEdi();
  const { edi } = useEdiCalculateStore();

  useEffect(() => {
    const fetchData = async () => {
      if (location.pathname === "/finance" && selectedOutletId) {
        await getRecipientBillingPending(selectedOutletId);
        await getRedTabCredit(selectedOutletId);
        await calculateEdi(selectedOutletId);
        const transaction = await getTransactionHistory(selectedOutletId);
        if (transaction) {
          setTransactionHistory(transaction);
        }
      }
    };
    fetchData();
  }, [location.pathname, selectedOutletId, redTabCreditList?.credit_used]);

  const handlePayInvoice = async () => {
    if (useRecipientBillingPending?.getState()?.verifySuccess) {
      navigate("/pay-invoice");
    }
  };

  const handleEdiPay = () => {
    navigate("/edi-payment-review");
  };

  return (
    <TabLayout>
      <div className="w-full max-h-[91vh] overflow-y-scroll -inset-0">
        {/* First section */}
        <div className="flex w-full items-center justify-between  h-11 pl-4">
          <h1 className="font-semibold text-xl font-poppins">Finance</h1>
        </div>
        {/* Second section */}
        <div className="pl-4 pr-4 mt-2">
          <div className="w-full rounded-2xl bg-[#EA4335] shadow">
            <div className="h-[179px] w-full rounded-xl   bg-[#ffffff] shadow  ">
              <h5 className="mb-1 text-[13px] font-normal  font-poppins pl-4 pt-4 mt-1 ">Account Balance</h5>
              <span className="flex items-center space-x-1 pl-4">
                <p className="font-semibold  text-2xl font-poppins">
                  {redTabCreditList?.credit_remaining ? redTabCreditList.credit_remaining : "0.00"}{" "}
                </p>{" "}
                <span className="text-base font-normal font-poppins">रु</span>
              </span>
              {/* account balance */}
              <div className="w-full h-[68px] mt-4 ">
                <div className="h-[68px]  w-full md:w-[90%]  flex justify-evenly">
                  <div className="h-[68px]  w-[60px] flex justify-between items-center flex-col space-y-1 cursor-pointer">
                    <div className="w-[48px] h-[48px] bg-[#F5F6F7] rounded-full flex justify-center items-center">
                      <DownCircleSVG />
                    </div>
                    <h1 className="font-poppins font-medium text-[11px] w-[60px] h-[16px] text-[#667085]">Withdraws</h1>
                  </div>
                  <div className="h-[68px]  w-[48px] flex  justify-center items-center flex-col  space-y-1 cursor-pointer">
                    <div className="w-[48px] h-[48px] bg-[#F5F6F7] rounded-full flex justify-center items-center">
                      <PulsCircleSVG />
                    </div>
                    <h1 className="h-[16px] w-[48px] font-poppins font-medium text-[11px] text-[#667085]">Deposit</h1>
                  </div>
                  <div
                    onClick={handlePayInvoice}
                    className="h-[68px]  w-[63px] flex  justify-center items-center flex-col  space-y-1 relative cursor-pointer"
                  >
                    <div className="w-[48px] h-[48px] bg-[#F5F6F7] rounded-full flex justify-center items-center">
                      <PayInvoiceSVG />
                    </div>
                    <h1 className="h-[16px] w-[63px] font-poppins font-medium text-[11px] text-[#667085]">
                      Pay Invoice
                    </h1>
                    {/* notification circle */}
                    <div className="absolute -top-2 right-2 w-[18px] h-[18px]  rounded-full flex items-center justify-center text-[#ffffff] text-xs font-semibold bg-primaryColor">
                      {count}
                    </div>
                  </div>
                </div>
              </div>{" "}
              {/* end */}
            </div>

            <div className="p-4 rounded-xl flex justify-between items-center">
              <div>
                <div>
                  <h5 className="mb-2 text-sm font-normal   font-poppins text-primaryColorText">
                    REDTAB Credit Balance
                  </h5>
                  <span className="flex items-center space-x-1">
                    <p className="font-semibold text-2xl font-poppins text-primaryColorText">
                      {redTabCreditList?.credit_used ? redTabCreditList?.credit_used : "0.00"}
                    </p>
                    <span className="font-poppins text-sm font-semibold text-secondaryColor2">रु</span>
                  </span>
                  <span className="flex items-center">
                    <h5 className="mb-2 text-xs font-normal  font-poppins  text-primaryColorText">
                      Credit limit:{" "}
                      <span className="text-xs font-semibold  font-poppins">
                        {redTabCreditList?.credit_limit ? redTabCreditList?.credit_limit : "0.00"}
                      </span>
                    </h5>
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center space-x-1">
                    <p className="text-primaryColorText">EDI:</p>
                    <span className="text-primaryColorText">{edi.daily_amount}</span>
                    <span className="font-poppins text-sm font-semibold text-secondaryColor2">रु</span>
                    <span className="text-primaryColorText">/day</span>
                  </div>
                  <div className="bg-primaryIconsColor cursor-pointer h-[25px] px-[10px] ms-4 flex justify-center items-center rounded-xl">
                    <p
                      onClick={handleEdiPay}
                      className="text-primaryColorText text-xs font-normal  font-poppins flex items-center"
                    >
                      Pay
                      <FaAngleRight className="text-primaryColorText text-xs  font-poppins ms-[8px]" />
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-primaryIconsColor h-[25px] w-[65px] flex  justify-center items-center rounded-xl">
                {/* add the routes for navigation */}
                <Link
                  to="/tab-pay"
                  className="text-primaryColorText text-xs font-normal  font-poppins flex items-center"
                >
                  Detail
                  <FaAngleRight className="text-primaryColorText text-xs  font-poppins " />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Third section */}
        <div className="px-4 mt-10  min-h-[348px]">
          {/* transaction section */}
          <div className="flex justify-between items-center sticky top-[-4px]  py-2 bg-[#ffffff] z-10">
            <h1 className="text-base font-semibold font-poppins">Transaction History</h1>
            <Link
              to="/transaction-history"
              className="text-xs bg-[#EAECF0] font-semibold font-poppins flex justify-center items-center rounded-full h-[24px] w-[64px] mr-1"
            >
              View all
            </Link>
          </div>
          <div className="h-auto">
            <TransactionList
              transactionHistory={transactionHistory}
              className="mt-0 -ml-1.5"
              spaceClass="space-y-6"
              listClass="mr-0"
            />
          </div>
        </div>
      </div>
    </TabLayout>
  );
};

export default FinanceHome;
