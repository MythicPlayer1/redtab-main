import { MdEdit } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import OutletSelectModals from "./outlet-select-modals";
import { useEffect, useState } from "react";
import UserList from "../lists/user-list";
import { FaRegPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  MerchantProfileOutletData,
  useMerchantProfileOutletListStore,
  useSelectedOutletUuidStore,
} from "../../store/merchant-profile/use-merchant-profile-outlet-store";
import { useMerchantProfileStore } from "../../store/merchant-profile/use-merchant-profile-store";
import ShortName from "../short-name";
import { checkMerchantUUID } from "../../utils/useful-func";
import { useMerchantContactStore } from "../../store/merchant-profile/use-merchant-contact-store";
import { IoIosLogOut } from "react-icons/io";
import { usePanVerificationInformationStore } from "../../store/pan-verification-store/use-pan-verification-store";
import { useEmailStore } from "../../store/email-store/use-email-store";
import { usePhoneNumberStore } from "../../store/phone-store/use-phone-store";
import { NepalStatesStore } from "../../store/kyc/kyc-info-store";
import { useHandleLogout } from "../../store/logout-store/use-logout-store";
import { useLoginStatusStore } from "../../store/login-status-store/use-login-status-store";

const TopSection = () => {
  const isName = true;
  const [isOpen, setIsopen] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const { merchantOutletList } = useMerchantProfileOutletListStore();
  const { merchantProfile } = useMerchantProfileStore();
  const { selectedOutletName } = useSelectedOutletUuidStore();
  const { setMerchantEmail, setMerchantPhoneNumber } = useMerchantContactStore();
  const [, setMerchantProfileUUID] = useState<string>();
  const { clearOutletInfo } = usePanVerificationInformationStore();
  const { setEmail } = useEmailStore();
  const { setPhoneNumber } = usePhoneNumberStore();
  const { setMunicipalities } = NepalStatesStore();
  const { refreshToken } = useLoginStatusStore();
  const { logout } = useHandleLogout();

  // check if merchantUUID is available
  //allow switch outlets only if merchant exists
  const handleSwitchOutlet = () => {
    localStorage.removeItem("isEdit");
    setMerchantEmail("");
    setMerchantPhoneNumber("");
    clearOutletInfo();
    setIsopen(true);
  };
  
  //close the modal
  const handleClose = () => {
    setIsopen(false);
  };

  //function to logout
  const handleLogout = async () => {
    if (refreshToken) {
      await logout({ refresh_token: refreshToken });
      if (useHandleLogout.getState().verifySuccess) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/home";
      }
    }
  };
  
  useEffect(() => {
    const merchantUUID = checkMerchantUUID();
    setMerchantProfileUUID(merchantUUID);
    const storedStatus = localStorage.getItem("status");
    setStatus(storedStatus);
  }, []);

  const style: React.CSSProperties = {
    bottom: "0",
  };

  const AddNewOutlet = () => {
    return (
      <Link to="/kyc/merchant/name" className="p-3 items-center justify-center text-primaryColor ">
        <div
          className="flex items-center justify-center gap-3"
          onClick={() => {
            setEmail("");
            setPhoneNumber("");
            setMunicipalities("");
          }}
        >
          <FaRegPlusSquare size={20} />
          <p className="text-sm font-medium">Add New Outlet</p>
        </div>
      </Link>
    );
  };
  return (
    <div className="w-full flex flex-col items-center justify-center text-center font-poppins gap-4">
      <div className="w-full flex  justify-between">
        {/* Left Spacer */}
        <div></div>
        {/* Profile Section Centered */}
        <div className="h-[92px] w-[92px] ms-[24px] flex items-center justify-center bg-secondaryColorTextBtn rounded-full relative border-none">
          {!isName && <img className="w-full h-full object-cover" src="/emoji.png" alt="profile icon" />}
          {isName && (
            <ShortName name={selectedOutletName || (merchantProfile?.merchant_name as string)} textSize="36px" />
          )}
          <button className=" absolute flex items-center justify-center rounded-full bottom-[-15px] right-0 bg-primaryColorText p-1">
            <div className="rounded-full flex items-center justify-center border border-[#EAECF0] p-1">
              <MdEdit className="text-placeHolderTextColor text-[24px]" />
            </div>
          </button>
        </div>

        {/* Logout Button on the Right */}
        <div className="cursor-pointer h-[100%]">
          <IoIosLogOut size={24} color="#eb4536" onClick={handleLogout} />
        </div>
      </div>

      <div className="flex flex-col gap-2 pb-3">
        <p className="font-semibold text-[20px] ">
          {selectedOutletName ? selectedOutletName : (merchantProfile?.merchant_name as string)}
        </p>
        {status !== "true" && (
          <button
            className="flex items-center justify-center gap-1 px-6 text-[#EA4335] font-semibold text-xs bg-[#F5F6F7] rounded-[48px]  py-2"
            onClick={handleSwitchOutlet}
          >
            Switch Outlet
            <MdKeyboardArrowDown className="text-[#EA4335] text-[20px] " />
          </button>
        )}
      </div>
      <OutletSelectModals open={isOpen} onClose={handleClose} name="Select Outlet" dialogStyle={style}>
        <UserList handleClose={handleClose} merchantOutletList={merchantOutletList as MerchantProfileOutletData[]}>
          <AddNewOutlet />
        </UserList>
      </OutletSelectModals>
    </div>
  );
};

export default TopSection;
