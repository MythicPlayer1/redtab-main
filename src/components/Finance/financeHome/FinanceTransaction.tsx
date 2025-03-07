import { useEffect, useState } from "react";
import LeftArrowButton from "../../Button/LeftArrowButton";
import TransactionList from "./TransactionList";
import { TransactionHistoryData, useTransactionHistory } from "../../../store/finance-store/use-transaction-history";
import { useSelectedOutletUuidStore } from "../../../store/merchant-profile/use-merchant-profile-outlet-store";

const FinanceTransaction = () => {
  const [transactionHistory, setTransactionHistory] = useState<TransactionHistoryData[]>([]);
  const { getTransactionHistory } = useTransactionHistory();
  const { selectedOutletId } = useSelectedOutletUuidStore();
  useEffect(() => {
    const fetchData = async () => {
      if (location.pathname === "/transaction-history" && selectedOutletId) {
        const transaction = await getTransactionHistory(selectedOutletId);
        if (transaction) {
          setTransactionHistory(transaction);
        }
      }
    };
    fetchData();
  }, [location.pathname, selectedOutletId]);
  return (
    <>
      <div className="w-full h-screen ">
        {/* first section */}
        <div className="flex items-center justify-between p-3 ">
          <LeftArrowButton to="/finance" />
        </div>
        <div className="pl-4">
          <h1 className="text-[28px]  font-semibold font-poppins">Transaction</h1>
        </div>
        {/* second section transaction list */}
        <div className="ml-3">
          <TransactionList 
          transactionHistory={transactionHistory}
          className="mt-6 space-y-3" spaceClass="space-y-10" listClass="mr-3" />
        </div>
      </div>
    </>
  );
};

export default FinanceTransaction;
