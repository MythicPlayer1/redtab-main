import React from "react";

interface CardDetailProps {
  title: string;
  transactionIDName: string;
  transactionTime: string;
  transactionID: string;
  transactionYear?: string;
}

const CardDetail: React.FC<CardDetailProps> = ({ title, transactionIDName, transactionTime, transactionYear, transactionID }) => {
  return (
    <>
      <div className="pt-1 absolute left-1/2 transform -translate-x-1/2 top-10 flex items-start flex-col w-[92%] h-auto space-y-2">
        <h1 className=" text-[#667085] text-xs ml-1 font-poppins font-medium">{title}</h1>
        <div className="p-1 w-full h-auto bg-[#ffffff] shadow rounded-xl flex">
          <div className="flex items-center justify-center">
            <div className="flex justify-center items-center flex-col mr-6">
              <h1 className="text-xs font-normal font-poppins text-[#7A7E83] text-center">{transactionIDName}</h1>
              <h1 className="font-medium text-[13px] font-poppins text-center">{transactionID}</h1>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className=" flex justify-center items-center flex-col mr-6">
              <h1 className="text-xs font-normal font-poppins text-[#7A7E83] text-center">Transaction time</h1>
              <h1 className="font-medium text-[13px] font-poppins text-center"><span>{transactionYear}</span>
                <span className="px-1">-</span>
                <span>{transactionTime}</span></h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDetail;
