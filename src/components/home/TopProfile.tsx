import ProfileLogo from "../profile-logo";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelectedOutletUuidStore } from "../../store/merchant-profile/use-merchant-profile-outlet-store";
import { Link } from "react-router-dom";

const TopProfile = () => {
  const navigate = useNavigate();
  const tokenStorage = localStorage?.getItem("token-storage");
  const accessTokenExist = JSON?.parse(tokenStorage as string)?.state?.accessToken;
  const merchantName = JSON?.parse(tokenStorage as string)?.state?.merchantProfileUUID?.[0]?.merchant_name;
  const { selectedOutletName } = useSelectedOutletUuidStore();

  //check user logged in or not
  const handleProfileClick = () => {
    if (accessTokenExist) {
      navigate("/profile"); //navigate to profile page if user logged in
    } else {
      //navigate to phone page if user not logged in
      window.location.href = "/connect/phone";
    }
  };

  //navigate to phone page on click on login / sign up
  const handleAuthClick = () => {
    window.location.href = "/connect/phone";
  };

  return (
    <div className="flex  items-center justify-between px-4 pt-5 pb-4 text-[#fff]">
      <div className="flex gap-4 items-center cursor-pointer">
        <ProfileLogo src="/app.jpeg" height={36} width={36} onClick={handleProfileClick} />
        <div className="flex flex-col w-[250px] md:w-auto">
          {selectedOutletName ? (
            <p className="text-sm font-medium">{selectedOutletName}</p>
          ) : merchantName ? (
            <p className="text-sm font-medium">{merchantName}</p>
          ) : (
            <p className="text-base font-semibold" onClick={handleAuthClick}>
              Login / Sign Up
            </p>
          )}
          {selectedOutletName && <p className="font-semibold leading-6">0.00</p>}
        </div>
      </div>
      <Link to="/notification">
        <FaBell size={24} />
      </Link>
    </div>
  );
};

export default TopProfile;
