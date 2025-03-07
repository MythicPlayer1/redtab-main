import React, { useEffect, useState } from "react";
import { getInitials } from "../Utils/GetInitials";
import { useStaffListStore, useStaffUuidStore } from "../../store/team-store/use-staff-list-store";
import { useHandleStaffList } from "../../store/team-store/use-staff-list";
import { Link, useLocation } from "react-router-dom";
import { useSelectedOutletUuidStore } from "../../store/merchant-profile/use-merchant-profile-outlet-store";
import { MdKeyboardArrowRight } from "react-icons/md";

interface StaffListProps {
  searchValue: string;
}

const StaffList: React.FC<StaffListProps> = ({ searchValue }) => {
  const location = useLocation();
  const { setSelectedStaffId } = useStaffUuidStore();
  const { getStaffList } = useHandleStaffList();
  const { setStaffList } = useStaffListStore();
  const { selectedOutletId } = useSelectedOutletUuidStore();
  const [staffList, setStaffLists] = useState<any[]>([]);

  useEffect(() => {
    const fetchStaffList = async () => {
      if (location.pathname === "/manage-staffs" && selectedOutletId) {
        const staffData = await getStaffList(selectedOutletId);
        if (staffData) {
          setStaffLists(staffData); 
          setStaffList(staffData)
        }
      }
    };
    fetchStaffList();
  }, [location.pathname, selectedOutletId]);

  const handleSelectedUUID = (uuid: string) => {
    setSelectedStaffId(uuid);
  }
 
  //perform search staff's name based on staff's full_name and search query
  const filteredStaffData = staffList?.filter((staff) =>
    staff.full_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="py-4">
      <div className="flex space-x-1 mb-4">
        <h1 className="text-xs font-medium text-[#1D2939] font-poppins">Member List</h1>
        <div className="flex items-center justify-center">
          <div className="h-1 w-1 bg-[#667085] rounded-full flex items-center justify-center"></div>
        </div>
        <h1 className="text-xs font-medium font-poppins">{filteredStaffData.length} member</h1>
      </div>

      {filteredStaffData.length === 0 ? (
        <div className="text-center mt-12 text-[#667085] text-sm font-normal font-poppins">
          You don’t have any member yet
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {filteredStaffData.map((staff) => (
            <Link to="/staff-profile" onClick={() => handleSelectedUUID(staff.uuid)} className="bg-[#F5F6F7] h-14 rounded-xl p-2 flex justify-center flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 h-8 w-8 rounded-full mr-2 flex items-center justify-center text-[white] font-semibold text-sm bg-primaryColor">
                    {getInitials(staff.full_name)}
                  </div>
                  <div className="ml-2 min-w-0">
                    <p className="text-sm font-medium font-poppins">{staff.full_name}</p>
                  </div>
                </div>
                <MdKeyboardArrowRight size={20}/>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default StaffList;
