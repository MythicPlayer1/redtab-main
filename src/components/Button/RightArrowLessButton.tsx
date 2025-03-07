import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { useStaffUuidStore } from "../../store/team-store/use-staff-list-store";
import { useSelectedOutletUuidStore } from "../../store/merchant-profile/use-merchant-profile-outlet-store";

interface RightArrowLessButtonProps {
  to: string;
  className?: string;
  staffId?: string;
  outletId?: string;
}

const RightArrowLessButton: React.FC<RightArrowLessButtonProps> = ({ to, className, staffId, outletId }) => {
  const { setSelectedStaffId } = useStaffUuidStore();
  const { setSelectedOutletId } = useSelectedOutletUuidStore();

  const handleClick = () => {
    //store selected staff uuid if particular staff is selected and true
    if (staffId) {
      setSelectedStaffId(staffId);
    }
    //store selected outlet uuid if particular outlet is selected and true
    if (outletId) {
      setSelectedOutletId(outletId);
    }
  };

  return (
    <Link to={to} className={className} onClick={handleClick}>
      <MdKeyboardArrowRight className="text-lg text-[placeHolderTextColor] text-secondaryColorTextBtn" />
    </Link>
  );
};

export default RightArrowLessButton;
