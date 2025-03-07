import { Link } from "react-router-dom";
import { PaymentCompletSVG } from "../Svg";
import { UseInvoiceReviewDetailsStore, usePosCalculateAmount } from "../../store/pos-calculator/pos-cal-store";

const PosInvoicePayment = () => {
  const { invoiceReview } = UseInvoiceReviewDetailsStore();
  const { transactionType } = usePosCalculateAmount();
  console.log(transactionType);
  return (
    <div className="w-full h-screen overflow-y-hidden bg-[#f8f8f8]">
      <div className="h-[30%]">
        <div className="h-[44px]  flex justify-center items-center">
          <h1 className=" font-poppins font-semibold text-sm">Payment Detail</h1>
        </div>
        {/* First section */}
        <div className="flex justify-center items-center mt-[30px]">
          <div className="w-14 h-14">
            <PaymentCompletSVG />
          </div>
        </div>
        {/* Second section */}
        <div className="flex justify-center items-center flex-col mt-2">
          <h1 className=" font-poppins font-semibold text-2xl">Payment success</h1>
          <h1 className="font-poppins font-semibold text-2xl">
            {invoiceReview?.billing_info ? invoiceReview?.billing_info?.gross_total : invoiceReview?.total_sales}रु
          </h1>
        </div>
      </div>
      {/* Third section */}
      <div className="h-[70%] bg-[#ffffff] rounded-t-3xl">
        <div className=" w-full flex justify-center flex-col items-center ">
            <div className="w-[95%]">
          <h1 className="font-poppins text-sm font-semibold ml-2 mt-6">Transaction detail</h1>
          <div className="grid grid-cols-1 gap-1 border-b-2  border-[#E6E8E9]">
            {/* Wallet transaction id */}
            <div className="h-8 rounded-lg flex items-center justify-between mt-2">
              <h1 className="ml-2 font-poppins text-xs font-normal text-secondaryColorTextBtn">
                Gateway transaction ID
              </h1>
              <h1 className="mr-2 font-poppins text-xs font-medium">- </h1>
            </div>
            {/* Transaction time wallet */}
            <div className="h-8 rounded-lg flex items-center justify-between">
              <h1 className="ml-2 font-poppins text-xs font-normal text-secondaryColorTextBtn">
                Gateway Transaction time
              </h1>
              <h1 className="mr-2 font-poppins text-xs font-medium">
                <span>{new Date(invoiceReview?.datetime_client || "").toLocaleDateString()}</span>
                <span className="px-1">-</span>
                <span>{new Date(invoiceReview?.datetime_client || "").toLocaleTimeString()}</span>
              </h1>
            </div>
            {/* Redtab pay transaction id */}
            <div className="h-8 rounded-lg flex items-center justify-between">
              <h1 className="text-left ml-2 font-poppins text-xs font-normal text-secondaryColorTextBtn">
                REDTAB Transaction ID
              </h1>
              <h1 className="text-right mr-2 font-poppins text-xs font-medium">
                {invoiceReview?.invoice_number || invoiceReview?.receipt_no}
              </h1>
            </div>
            {/* Redtab pay transaction time */}
            <div className="h-8 rounded-lg flex items-center justify-between">
              <h1 className="ml-2 font-poppins text-xs font-normal text-secondaryColorTextBtn">Transaction time</h1>
              <h1 className="mr-2 font-poppins text-xs font-medium">
                <span>{new Date(invoiceReview?.datetime_client || "").toLocaleDateString()}</span>
                <span className="px-1">-</span>
                <span>{new Date(invoiceReview?.datetime_client || "").toLocaleTimeString()}</span>
              </h1>
            </div>
            {/* Transaction fee */}
            <div className="h-8 rounded-lg flex mb-4 items-center justify-between">
              <h1 className="ml-2 font-poppins text-xs font-normal text-secondaryColorTextBtn">Transfer fee</h1>
              <h1 className="mr-2 font-poppins text-sm text-textGreen font-medium">Free</h1>
            </div>
          </div>
          </div>
        </div>
        {/* Fourth section */}
        <div className="md:px-4">
          <h1 className="font-poppins text-sm font-semibold ml-4 mt-6">Invoice detail</h1>
          <div className="grid grid-cols-1">
            {/* Merchant name */}
            <div className="h-8 rounded-lg flex items-center justify-between mt-2">
              <h1 className="ml-4 text-secondaryColorTextBtn font-poppins text-xs font-normal">
                To {transactionType === "sales" && "Customer"} {transactionType === "purchase" && "Merchant"}
              </h1>
              <h1 className="mr-4 font-poppins text-xs font-medium">{invoiceReview?.buyer_name}</h1>
            </div>
            {/* Wallet name */}
            <div className="h-8 rounded-lg flex items-center justify-between">
              <h1 className="ml-4 font-poppins text-xs font-normal text-secondaryColorTextBtn">
                {transactionType === "sales" && "Sender"}
                {transactionType === "purchase" && "Sender"}
              </h1>
              <h1 className="mr-4 font-poppins text-xs font-medium">
                {invoiceReview?.billing_info?.seller_name || invoiceReview?.seller_name}
              </h1>
            </div>
            {/* Account number */}
            <div className="h-8 rounded-lg flex items-center justify-between">
              {/* <h1 className="ml-4 font-poppins text-xs font-normal text-secondaryColorTextBtn">Gateway Account number</h1>
                        <h1 className="mr-4 font-poppins text-xs font-medium">-</h1> */}
            </div>
          </div>
        </div>

        {/* last || button section */}
        {/* and also add in the link section for navigation  */}
        <div className="fixed bottom-0 left-0 right-0 mb-4  h-[44px] flex justify-center  w-full ">
          <div className="flex items-center w-[95%]  justify-center    space-x-1.5">
            <Link
              className="flex justify-center items-center bg-[#F5F6F7]  w-[50%] h-[44px] font-semibold text-primaryColor text-sm font-poppins rounded-full  "
              to="/home"
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
    </div>
  );
};

export default PosInvoicePayment;
