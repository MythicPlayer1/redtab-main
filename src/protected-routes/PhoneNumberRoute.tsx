import React, { useEffect } from "react";
import { usePhoneNumberStore } from "../store/phone-store/use-phone-store";
import { useNavigate } from "react-router-dom";

interface PhoneNumberRouteProps {
  children: React.ReactNode;
}

const PhoneNumberRoute: React.FC<PhoneNumberRouteProps> = ({ children }) => {
  const { phoneNumber } = usePhoneNumberStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!phoneNumber) {
      navigate("/connect/phone");
    }
  }, [phoneNumber]);

  return <>{children}</>;
};

export default PhoneNumberRoute;
