import { Link } from "react-router-dom";
import { useSuccessTransactionDataStore } from "../../store/edi-payment-store/use-create-edi-transaction";

const PaymentSuccess = () => {
  const { sctId, txnTime } = useSuccessTransactionDataStore();

  return (
    <div className="h-[68%] bg-[#ffffff] rounded-t-3xl">
      <div className=" w-full flex justify-center flex-col items-center ">
        <div className="px-[4px] grid grid-cols-1 lg:grid-cols-2 lg:gap-8  pt-5 border-b-2  border-[#E6E8E9] w-[95%] ">
          <h1 className="font-poppins text-sm font-semibold">Transfer detail</h1>
          {/* Wallet transaction id */}
          <div className="h-8 rounded-lg flex items-center justify-between mt-2">
            <h1 className="w-[133px] font-poppins text-xs font-normal text-[#475467]">SCT transaction ID</h1>
            <h1 className="font-poppins text-xs font-medium">{sctId}</h1>
          </div>
          {/* Transaction time wallet */}
          <div className="h-8 rounded-lg flex items-center justify-between">
            <h1 className="w-[133px] font-poppins text-xs font-normal text-[#475467]">Transaction time</h1>
            <h1 className="font-poppins text-xs font-medium text-end">
              <span>{new Date(txnTime && txnTime).toLocaleDateString()}</span>
              <span className="px-1">-</span>
              <span>{new Date(txnTime && txnTime).toLocaleTimeString()}</span>
            </h1>
          </div>
          {/* Redtab pay transaction id */}
          <div className="h-8 rounded-lg flex items-center justify-between">
            <h1 className="w-[133px] text-left font-poppins text-xs font-normal text-[#475467]">
              REDTAB Transaction ID
            </h1>
            <h1 className="text-end font-poppins text-xs font-medium">-</h1>
          </div>
          {/* Redtab pay transaction time */}
          <div className="h-8 rounded-lg flex items-center justify-between">
            <h1 className="w-[133px] font-poppins text-xs font-normal text-[#475467]">Transaction time</h1>
            <h1 className="text-end font-poppins text-xs font-medium">
              <span>-</span>
            </h1>
          </div>
          {/* Transaction fee */}
          <div className="h-8 rounded-lg flex mb-3 items-center justify-between">
            <h1 className="w-[133px] font-poppins text-xs font-normal text-[#475467]">Transfer fee</h1>
            <h1 className="font-poppins text-sm text-textGreen font-medium">Free</h1>
          </div>
        </div>
      </div>
      {/* Fourth section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 mt-3 px-[14px]">
        <h1 className="font-poppins text-sm font-semibold">Receiver detail</h1>
        {/* Merchant name */}
        <div className="h-8 rounded-lg flex items-center justify-between mt-2">
          <h1 className="w-[133px] text-[#475467] font-poppins text-xs font-normal">To merchant</h1>
          <h1 className="font-poppins text-xs font-medium">RedTab</h1>
        </div>
        {/* Wallet name */}
        <div className="h-8 rounded-lg flex items-center justify-between">
          <h1 className="w-[133px] font-poppins text-xs font-normal text-[#475467]">Wallet name</h1>
          <h1 className="font-poppins text-xs font-medium">SCT</h1>
        </div>
        {/* Account number */}
        <div className="h-8 rounded-lg flex items-center justify-between">
          <h1 className="w-[133px] font-poppins text-xs font-normal text-[#475467] ">Account number</h1>
          <h1 className="font-poppins text-xs font-medium pe-[2px]">-</h1>
        </div>
      </div>

      {/* last || button section */}
      {/* and also add in the link section for navigation  */}
      <div className="fixed bottom-0 left-0 right-0 mb-4  h-[44px] flex justify-center  w-full ">
        <div className="flex items-center w-[95%]  justify-center    space-x-1.5">
          <Link
            className="flex justify-center items-center bg-[#F5F6F7]  w-[50%] h-[44px] font-semibold text-primaryColor text-sm font-poppins rounded-full  "
            to="/finance"
          >
            Home
          </Link>

          <Link
            className="flex justify-center items-center bg-primaryColor w-[50%] h-[44px] font-semibold text-sm font-poppins rounded-full text-[#ffffff] "
            to=""
          >
            Share
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
