import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LeftArrowButton from "../Button/LeftArrowButton";
import { FaPhoneAlt } from "react-icons/fa";
import RightArrowLessButton from "../Button/RightArrowLessButton";
import { LockSVG, DeleteSVG } from "../Svg";
import { StaffDeleteModal } from "../PopUpModal";
import { getInitials } from "../Utils/GetInitials";
import { useStaffListStore, useStaffUuidStore } from "../../store/team-store/use-staff-list-store";
import { useDeleteStaff } from "../../store/team-store/use-staff-delete";
import PermissionSvg from "../Svg/PermissionSVG";

interface Staff {
  id: number;
  name: string;
  imageUrl: any;
  path?: string;
  onClick?: () => void;
}

const StaffProfile: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const { staffList } = useStaffListStore();
  const { selectedStaffId } = useStaffUuidStore();
  const { deleteStaff } = useDeleteStaff();

  // Find the selected staff details
  const selectedStaff = staffList?.find((staff) => staff.uuid === selectedStaffId);
  
  //function to delete staff
  const handleDeleteStaff = async () => {
    await deleteStaff(selectedStaffId);
    if (useDeleteStaff?.getState().verifySuccess) {
      navigate("/manage-staffs");
    }
  };
  const staffData: Staff[] = [
    {
      id: 1,
      name: "Manage Member's permissions",
      imageUrl: <PermissionSvg />,
      path: "/owner-password-verify",
    },
    {
      id: 2,
      name: "Edit Member PIN code",
      imageUrl: <LockSVG />,
      path: "/owner-password-verify",
    },
    {
      id: 3,
      name: "Remove Member",
      imageUrl: <DeleteSVG />,
      path: "",
    },
  ];

  const handleHide = () => {
    setIsModalVisible(false);
  };

  const handleClick = () => {
    setIsModalVisible(true);
  };
  const handleSetName = (name: string) => {
    sessionStorage.setItem("staffActionName", name);
  }

  return (
    <div className="relative">
      <div className={`w-full h-screen bg-[#f5f6f7] p-5`}>
        <div className="flex items-center justify-between">
          <LeftArrowButton to="/manage-staffs" />
        </div>
        <div className="flex justify-between pt-5">
          <div className="flex flex-col">
            <h1 className="text-[28px] font-semibold font-poppins">{selectedStaff && selectedStaff.full_name}</h1>
            <p className="flex items-center pl-2">
              <FaPhoneAlt className="mr-1 h-3 w-3" />
              <span className="text-sm font-normal font-poppins">
                {selectedStaff && selectedStaff.auth_user.phone && selectedStaff.auth_user.phone}
              </span>
            </p>
          </div>
          <div
            className={`p-2 h-11 w-11 rounded-full flex items-center justify-center text-[white] font-poppins bg-[#F96A65] ${
              isModalVisible ? "" : ""
            }`}
          >
            {getInitials(selectedStaff?.full_name || "")}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-8">
          {staffData?.map((staff) => (
            <div
              key={staff.id}
              className={`w-full bg-[#ffffff] h-14 flex items-center rounded-xl ${isModalVisible ? "" : ""} `}
              onClick={staff.id === 3 ? handleClick : undefined}
            >
              <Link to={staff.path || "#"} 
              className="w-[100%] "
              onClick={() => handleSetName(staff.name)}
              >
                <div className={`flex items-center justify-between w-[98%]`}>
                  <div className="flex items-center">
                    <span className="ml-3">{staff.imageUrl}</span>
                    <div className="ml-3 min-w-0 flex items-center">
                      <p className="text-sm font-medium font-poppins">{staff.name}</p>
                    </div>
                  </div>
                  <RightArrowLessButton to={staff.path || "#"} />
                </div>
              </Link>
            </div>
          ))}
        </div>
        {isModalVisible && (
          <div className="fixed bottom-0 h-screen  left-0 right-0 z-50 black-trans" onClick={handleHide}>
            <StaffDeleteModal handleHide={handleHide} handleClick={handleDeleteStaff} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffProfile;
