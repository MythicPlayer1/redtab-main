import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import InputSearch from "../Input/InputSearch";
import StaffList from "./StaffList";
import LeftArrowButton from "../Button/LeftArrowButton";
import { ManageStaffModal } from "../PopUpModal";
import { useStaffListStore, useStaffUuidStore } from "../../store/team-store/use-staff-list-store";
import { useEditStaffUsername } from "../../store/team-store/use-staff-username-edit";

const ManageStaff = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isModalDisabled, setIsModalDisabled] = React.useState<boolean>(true);
  const { staffList } = useStaffListStore();
  const { selectedStaffId } = useStaffUuidStore();
  const { verifySuccess, setVerifySuccess } = useEditStaffUsername.getState();
  const selectedStaff = staffList?.find((staff) => staff.uuid === selectedStaffId);

  const handleHide = () => {
    setIsModalDisabled(false);
    setVerifySuccess(false);
  };

  return (
    <>
      <div className="w-full h-auto px-5 py-5">
        {/* first section */}
        <div className="flex items-center justify-between ">
          <LeftArrowButton to="/profile" />
          {/* needed link add in to section */}
          {/* new staff button start here */}
          <Link to="/staff-information">
            <div className="flex items-center justify-center bg-primaryColor text-secondaryColor p-2 rounded-2xl  space-x-[1px] h-[28px]">
              <AiOutlinePlus className="text-secondaryColor w-3 h-3" />
              <h2 className="text-xs pr-0.5 font-semibold font-poppins">New Member</h2>
            </div>
          </Link>
          {/* new staff button end here */}
        </div>

        {/* second section Manage staff for search box */}
        <div className="pt-5 space-y-3">
          <h1 className="text-3xl font-semibold font-poppins">Manage Team</h1>
          <InputSearch value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        </div>

        {/* Third section for staff list */}
        <div className="mt-3">
          <StaffList searchValue={searchValue} />
        </div>

        {verifySuccess && isModalDisabled && (
          <div className="fixed bottom-0 h-screen  left-0 right-0 z-50 black-trans" onClick={handleHide}>
            <ManageStaffModal handleClick={() => {}} handleHide={handleHide} selectedStaff={selectedStaff}/>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageStaff;
