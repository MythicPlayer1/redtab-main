import React from "react";
import { Link } from "react-router-dom";

interface AuthRedirectProps {
  message: string;
  btnText: string;
  to: string;
}
const AuthRedirectCard: React.FC<AuthRedirectProps> = ({ message, btnText, to }) => {
  return (
    <div className="h-[calc(100dvh-75px)] flex justify-center items-center">
    <div className="p-4 flex flex-col border1 shadow-md rounded-2xl gap-2">
      <div className="flex justify-between font-normal text-sm text-[#1D2939] w-full">
        <p className="text-center mx-auto text-base font-normal px-16">{message}</p>
      </div>
      <Link
        to={to}
        className="bg-primaryColor text-sm text-primaryColorText py-3 px-3 font-semibold rounded-[32px] text-center"
      >
        {btnText}
      </Link>
    </div>
    </div>
  );
};

export default AuthRedirectCard;
