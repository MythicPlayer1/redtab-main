import React from "react";
import { useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa6";
import { CashSVG, QRSVG } from "../../Svg";
import { formatDate, groupTransactionsByDate } from "../../Utils/GroupTransaction";
import { TransactionHistoryData, useTransactionHistory } from "../../../store/finance-store/use-transaction-history";

const getTransactionIcon = (description: string) => {
  switch (description.toLowerCase()) {
    case "cash":
      return <CashSVG />;
    case "credit":
      return <CashSVG />;
    case "qr":
      return <QRSVG />;
    case "return":
      return (
        <div className="relative">
          <CashSVG />
          <FaArrowLeft className="absolute bottom-5 left-4 text-lg bg-[#FF9F0A] rounded-full p-1 font-semibold text-primaryColorText" />
        </div>
      );
    default:
      return null;
  }
};

const getTransactionTitle = (description: string) => {
  switch (description.toLowerCase()) {
    case "cash":
      return "Pay with cash";
    case "credit":
      return "Pay with credit";
    case "qr":
      return "Pay with QR code";
    case "return":
      return "Returned";
    default:
      return "";
  }
};

interface TransactionListProps {
  className?: string;
  spaceClass?: string;
  listClass?: string;
  transactionHistory: TransactionHistoryData[];
}

const TransactionList: React.FC<TransactionListProps> = ({ className, spaceClass, listClass, transactionHistory }) => {
  const location = useLocation();
  const showInputSearch = location.pathname !== "/finance";
  const showBorderLine = location.pathname !== "/finance";
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  //perform search on the basis of transaction title, amount and products
  const filteredTransactions = transactionHistory?.filter(
    (transaction) =>
      getTransactionTitle(transaction.paid_with).toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.products.some((product) => product.product_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Check if there are no filtered transactions
  if (!filteredTransactions || filteredTransactions.length === 0) {
    return (
      <div className="p-2 w-full">
        {showInputSearch && (
          <div className="pr-0  w-full">
            <div className="relative mb-6">
              <input
                className="pl-10 w-full h-[36px] px-3 focus:outline-none focus:ring-purple-600 placeholder:font-poppins placeholder:font-normal placeholder:text-xs placeholder:text-[placeHolderTextColor] bg-[#EAECF0] rounded-full"
                type="text"
                placeholder="Search transaction"
                onChange={handleSearchChange}
              />
              <div className="absolute left-2 inset-y-2 flex items-center h-5 w-5 text-xl font-extrabold">
                <CiSearch className="text-[#98A2B3]" />
              </div>
            </div>
          </div>
        )}
        { useTransactionHistory?.getState()?.isLoading === false &&
        <p>No transactions found</p>
      }
      </div>
    );
  }

  const groupedTransactions = groupTransactionsByDate(filteredTransactions);

  return (
    <div className="p-2 w-full">
      {showInputSearch && (
        <div className="pr-0  w-full">
          <div className="relative">
            <input
              className="pl-10 w-full h-[36px] px-3 focus:outline-none focus:ring-purple-600 placeholder:font-poppins placeholder:font-normal placeholder:text-xs placeholder:text-[placeHolderTextColor] bg-[#EAECF0] rounded-full"
              type="text"
              placeholder="Search transaction"
              onChange={handleSearchChange}
            />
            <div className="absolute left-2 inset-y-2 flex items-center h-5 w-5 text-xl font-extrabold">
              <CiSearch className="text-[#98A2B3]" />
            </div>
          </div>
        </div>
      )}
      {/* Transaction list start here */}
      <div className={`${spaceClass}`}>
        {Object.keys(groupedTransactions).map((date) => (
          <div className={`${className}`} key={date}>
            <p className="text-sm font-poppins text-primarySecondColor font-normal">{formatDate(date)}</p>
            {showBorderLine && <hr className="h-px bg-[#EAECF0] border-0 w-[98%]" />}
            <div className="grid grid-cols-1 gap-1 lg:grid-cols-2 lg:gap-8 mt-2">
              {groupedTransactions[date].map((transaction) => (
                <div key={transaction.uuid} className="h-11 rounded-lg mt-2 flex justify-between items-center">
                  <div className="flex items-center space-x-4 ">
                    <div className="h-11 w-11 flex justify-center rounded-full items-center bg-[#F5F6F7]">
                      {getTransactionIcon(transaction.paid_with)}
                    </div>
                    <span className="mr-12">
                      {getTransactionTitle(transaction.paid_with)}
                      <div className="flex space-x-2 items-center w-[190px] overflow-x-hidden">
                        {transaction?.products?.map((product: any) => (
                          <p key={product.uuid} className="text-xs font-poppins font-normal text-secondaryColorTextBtn">
                            {product.product_name}
                          </p>
                        ))}
                      </div>
                    </span>
                  </div>
                  <span className={`flex flex-col justify-center ${listClass}`}>
                    <h4 className="text-sm font-semibold font-poppins">
                      {transaction.status === "complete" ? (
                        <span className="text-textGreen">+ {transaction.amount}रु</span>
                      ) : (
                        <span className="text-primaryColor">- {transaction.amount}रु</span>
                      )}
                    </h4>
                    <div className="flex justify-end">
                      <p className="text-xs font-poppins text-[#667085] font-normal mt-1">
                        {new Date(transaction.updated_at).toLocaleTimeString()}
                      </p>
                    </div>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
