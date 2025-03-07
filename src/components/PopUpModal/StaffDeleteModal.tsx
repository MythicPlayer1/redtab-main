import React from "react";
import { ModalBottomLayout } from "./index";
import { CancelSVG, DeleteModalsSVG } from "../Svg";
import { ButtonPrimary } from "../Button/ButtonPrimary";

interface StaffDeleteModalProps {
  handleHide: () => void;
  handleClick: () => void;
}

const StaffDeleteModal: React.FC<StaffDeleteModalProps> = ({ handleHide, handleClick }) => {
  return (
    <ModalBottomLayout className="flex-col h-[300px] w-[98%] bg-[#ffffff] absolute bottom-0 mb-3">
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
          <DeleteModalsSVG />
        </div>
      </div>
      {/* text section  */}
      <div className=" w-full h-[78px] mt-3">
        <div className="flex justify-center flex-col items-center">
          <h1 className="font-semibold font-poppins text-lg">Are you sure you want to </h1>
          <h1 className="font-semibold font-poppins text-lg">remove this member?</h1>
          <p className="text-[13px] mt-2 font-poppins font-normal text-secondaryColorTextBtn">
            You can’t undo this action
          </p>
        </div>
      </div>

      {/* last section */}
      <div className="absolute bottom-0 left-0 right-0 pl-4 pr-4 mb-4">
        <ButtonPrimary className="w-full" size="small" disabled={false} onClick={handleClick}>
          {"Remove member"}
        </ButtonPrimary>
      </div>
    </ModalBottomLayout>
  );
};

export default StaffDeleteModal;
