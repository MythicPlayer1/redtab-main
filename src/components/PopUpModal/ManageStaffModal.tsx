import React from "react";
import { ModalBottomLayout } from "./index";
import { CancelSVG } from "../Svg";
import { ButtonPrimary } from "../Button/ButtonPrimary";
import sms from "../../../public/sms.png";

interface AuthUser {
  phone: string | null;
}

interface StaffData {
  auth_user: AuthUser;
}
interface SMSModalProps {
  handleHide: () => void;
  handleClick: () => void;
  selectedStaff?: StaffData;
}
const ManageStaffModal: React.FC<SMSModalProps> = ({ handleHide, handleClick, selectedStaff }) => {
  return (
    <ModalBottomLayout className="flex-col h-[288px] w-[98%]  bg-[#ffffff] absolute bottom-0 mb-3">
      {/* for cross part */}

      <div className=" flex  justify-end p-1 ">
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
        <div className="flex justify-center flex-col items-center">
          <span className="flex justify-center flex-col items-center ">
            <h1 className="font-semibold font-poppins text-center text-lg md:w-auto">
              We notifiy your member through SMS message
            </h1>
            <h1 className="font-semibold font-poppins  text-center text-lg w-[312px] md:w-auto"></h1>
          </span>
          <span className="flex justify-center flex-col items-center">
            <p className="text-[13px] mt-2 text-center  font-poppins font-normal w-[312px] text-secondaryColorTextBtn">
              Member phone number: {selectedStaff && selectedStaff.auth_user.phone && selectedStaff.auth_user.phone}
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

export default ManageStaffModal;
