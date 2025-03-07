import React from "react";
import { ModalBottomLayout } from "./index";
import { CancelSVG } from "../Svg";
import { ButtonPrimary } from "../Button/ButtonPrimary";
import sms from "../../../public/sms.png";
import { useCreateStaffDetail } from "../../store/team-store/use-staff-creation";

interface SMSModalProps {
  handleHide: () => void;
  handleClick: () => void;
}

const SMSModal: React.FC<SMSModalProps> = ({ handleHide, handleClick }) => {
  const {staffName, staffPhone}= useCreateStaffDetail();
  return (
    <ModalBottomLayout className="flex-col h-[350px] w-[98%] bg-[#ffffff] absolute bottom-0 mb-3">
      {/* for cross part */}

      <div className="  flex  justify-end p-1  ">
        <div
          className="flex justify-center items-center mt-0.5 text-secondaryColorTextBtn rounded-full text-lg cursor-pointer h-8 w-8"
          onClick={handleHide}
        >
          <CancelSVG />
        </div>
      </div>
      {/* delete Icon */}
      <div className="flex w-full  justify-center items-center">
        <div className=" w-[74px] h-[74px] bg-[#f5f6f7] rounded-full flex justify-center items-center">
          <img src={sms} alt="sms" />
        </div>
      </div>
      {/* text section  */}
      <div className=" w-full h-[78px] mt-4">
        <div className="flex justify-center flex-col items-center px-4">
          <span className="flex justify-center flex-col items-center">
            <h1 className="font-semibold font-poppins text-lg  md:w-auto">We sent a sms to {staffName}</h1>
            <h1 className="font-semibold font-poppins  text-lg  md:w-auto">phone number: {staffPhone}</h1>
          </span>
          <span className="flex justify-center flex-col items-center ">
            <p className="text-[13px] mt-2 font-poppins font-normal  text-secondaryColorTextBtn">
              Ask your member to check message app and
            </p>
            <p className="text-[13px]  font-poppins font-normal  text-secondaryColorTextBtn">
              download #REDTAB app
            </p>
          </span>
        </div>
      </div>

      {/* last section */}
      <div className="absolute bottom-0 left-0 right-0 pl-4 pr-4 mb-4 ">
        <ButtonPrimary className="w-full" size="small" disabled={false} onClick={handleClick}>
          {"Continue"}
        </ButtonPrimary>
      </div>
    </ModalBottomLayout>
  );
};

export default SMSModal;
