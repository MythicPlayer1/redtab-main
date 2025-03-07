import { useState } from "react";
import { PaymentCompletSVG, PaymentFailedSVG, PaymentPendingSVG } from "../../Svg";
import { Link } from "react-router-dom";

const AccountBalancePaymentDetail = () => {
    const [transactionStatus] = useState("complete"); // Set initial status to "complete"

    const renderStatusIcon = () => {
        switch (transactionStatus) {
            case "complete":
                return <PaymentCompletSVG />;
            case "failed":
                return <PaymentFailedSVG />;
            case "pending":
                return <PaymentPendingSVG />;
            default:
                return null;
        }
    };

    const renderStatusMessage = () => {
        switch (transactionStatus) {
            case "complete":
                return "Payment success";
            case "failed":
                return "Payment failed";
            case "pending":
                return "Payment pending";
            default:
                return "";
        }
    };

    return (
        <div className="w-full h-screen bg-[#f8f8f8]">
            <div className="h-[30%]">
                <div className="h-[44px]  flex justify-center items-center">
                    <h1 className=" font-poppins font-semibold text-sm">Payment Detail</h1>
                </div>
                {/* First section */}
                <div className="flex justify-center items-center mt-8">
                    <div className="w-14 h-14">{renderStatusIcon()}</div>
                </div>
                {/* Second section */}
                <div className="flex justify-center items-center flex-col mt-2 ">
                    <h1 className=" font-poppins font-semibold text-2xl">{renderStatusMessage()}</h1>
                    <h1 className="font-poppins font-semibold text-2xl">100.000रु</h1>
                </div>
            </div>
            {/* Third section */}
            <div className="h-[70%] bg-[#FFFFFF] rounded-t-3xl">
                <div className=" w-full flex justify-center flex-col items-center ">
                    <div className="grid grid-cols-1 gap-1 lg:grid-cols-2 lg:gap-8  mt-6 border-b-2  border-[#E6E8E9] w-[95%] ">
                        <h1 className="font-poppins text-sm font-semibold ml-2">Transfer detail</h1>
                        {/* Wallet transaction id */}
                        <div className="h-8 rounded-lg flex items-center justify-between mt-2">
                            <h1 className="ml-2 font-poppins text-xs font-normal text-secondaryColorTextBtn">
                                IMEPAY transaction ID
                            </h1>
                            <h1 className="mr-2 font-poppins text-xs font-medium">9P2114333 </h1>
                        </div>
                        {/* Transaction time wallet */}
                        <div className="h-8 rounded-lg flex items-center justify-between">
                            <h1 className="ml-2 font-poppins text-xs font-normal text-secondaryColorTextBtn">Transaction time</h1>
                            <h1 className="mr-2 font-poppins text-xs font-medium">22/07/2021 - 22:11</h1>
                        </div>
                        {/* Redtab pay transaction id */}
                        <div className="h-8 rounded-lg flex items-center justify-between">
                            <h1 className="ml-2 font-poppins text-xs font-normal text-secondaryColorTextBtn">
                                REDTAB Transaction ID
                            </h1>
                            <h1 className="mr-2 font-poppins text-xs font-medium">9P2114333</h1>
                        </div>
                        {/* Redtab pay transaction time */}
                        <div className="h-8 rounded-lg flex items-center justify-between">
                            <h1 className="ml-2 font-poppins text-xs font-normal text-secondaryColorTextBtn">Transaction time</h1>
                            <h1 className="mr-2 font-poppins text-xs font-medium">22/07/2021 - 22:11</h1>
                        </div>
                        {/* Transaction fee */}
                        <div className="h-8 rounded-lg flex mb-4 items-center justify-between">
                            <h1 className="ml-2 font-poppins text-xs font-normal text-secondaryColorTextBtn">Transfer fee</h1>
                            <h1 className="mr-2 font-poppins text-sm text-textGreen font-medium">Free</h1>
                        </div>
                    </div>
                </div>
                {/* Fourth section */}
                <div className="grid grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-8 mt-6">
                    <h1 className="font-poppins text-sm font-semibold ml-4">Receiver detail</h1>
                    {/* Merchant name */}
                    <div className="h-8 rounded-lg flex items-center justify-between mt-2">
                        <h1 className="ml-4 text-secondaryColorTextBtn font-poppins text-xs font-normal">To merchant</h1>
                        <h1 className="mr-4 font-poppins text-xs font-medium">Arumfazula Store</h1>
                    </div>
                    {/* Wallet name */}
                    <div className="h-8 rounded-lg flex items-center justify-between">
                        <h1 className="ml-4 font-poppins text-xs font-normal text-secondaryColorTextBtn">Wallet name</h1>
                        <h1 className="mr-4 font-poppins text-xs font-medium">IMEPAY wallet name</h1>
                    </div>
                    {/* Account number */}
                    <div className="h-8 rounded-lg flex items-center justify-between">
                        <h1 className="ml-4 font-poppins text-xs font-normal text-secondaryColorTextBtn">Account number</h1>
                        <h1 className="mr-4 font-poppins text-xs font-medium">1231241515151</h1>
                    </div>
                </div>

                {/* last || button section */}
                {/* and also add in the link section for navigation  */}
                <div className="fixed bottom-0 left-0 right-0 mb-4  h-[44px] flex justify-center  w-full ">
                    <div className="flex items-center w-[95%]  justify-center    space-x-1.5">
                        <Link
                            className="flex justify-center items-center bg-[#F5F6F7]  w-[50%] h-[44px] font-semibold text-primaryColor text-sm font-poppins rounded-full  "
                            to=""
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

export default AccountBalancePaymentDetail;
