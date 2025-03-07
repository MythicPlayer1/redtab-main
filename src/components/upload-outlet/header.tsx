import React from "react";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import {
  useContactVerifyStore,
  useLocationVerifyStore,
} from "../../store/merchant-profile/use-basic-information-verify";
import { useCompanyVerifyStore, usePanVerifyStore } from "../../store/pan-verification-store/use-outlet-verification";
import { useOwnerVerifyStore } from "../../store/owner-identity/use-owner-verification";

interface HeaderProps {
  title: string;
  path?: string;
  onClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, path }) => {
  const navigate = useNavigate();
  const { locationVerify } = useLocationVerifyStore();
  const { contactVerify } = useContactVerifyStore();
  const { panVerify } = usePanVerifyStore();
  const { companyVerify } = useCompanyVerifyStore();
  const { ownerVerify } = useOwnerVerifyStore();

  // check to display edit icon
  const displayEditIcon = () => {
    if (title === "Basic Information" && locationVerify.length != 0 && contactVerify.length != 0) {
      return <CiEdit color="#5f6675" size={25} onClick={handleNavigate} className="cursor-pointer" />;
    }
    if (title === "PAN Information" && panVerify.length != 0) {
      return <CiEdit color="#5f6675" size={25} onClick={handleNavigate} className="cursor-pointer" />;
    }
    if (title === "Company Registration Document" && companyVerify.length != 0) {
      return <CiEdit color="#5f6675" size={25} onClick={handleNavigate} className="cursor-pointer" />;
    }
    if (title === "Owner Identity" && ownerVerify.length != 0) {
      return <CiEdit color="#5f6675" size={25} onClick={handleNavigate} className="cursor-pointer" />;
    }
  };

  // handle navigation
  const handleNavigate = () => {
    localStorage.setItem("isEdit", true.toString());
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="flex flex-row justify-between items-center mt-6">
      <h1 className="text-base text-[#1D2939] font-semibold">{title}</h1>
      {displayEditIcon()}
    </div>
  );
};

export default Header;
