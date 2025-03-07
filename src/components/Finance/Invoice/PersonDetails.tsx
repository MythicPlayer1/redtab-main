import React from "react";

interface PersonDetailsProps {
  storeName: string;
  walletName: string;
  Accountnumber: string;
}

const PersonDetails: React.FC<PersonDetailsProps> = ({ storeName, walletName, Accountnumber }) => {
  return (
    <>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-10 flex items-start flex-col w-[92%] h-auto">
        <div className="h-auto w-full  flex items-start flex-col space-y-5">
          <div className="h-auto w-full space-y-1 ">
            <h1 className="font-poppins font-medium text-xs text-[#667085]">To merchant</h1>
            <h2 className="font-poppins text-[16px] font-medium">{storeName}</h2>
          </div>
          <div className="h-auto w-full space-y-1">
            <h1 className="font-poppins font-medium text-xs text-[#667085]">Gateway name</h1>
            <h2 className="font-poppins text-[16px] font-medium">{walletName}</h2>
          </div>
          <div className="h-auto w-full space-y-1">
            <h1 className="font-poppins font-medium text-xs text-[#667085]">Gateway Account number</h1>
            <h2 className="font-poppins text-[16px] font-medium">{Accountnumber}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonDetails;
