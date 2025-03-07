import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEmailStore } from "../store/email-store/use-email-store";

interface EmailRouteProps {
  children: React.ReactNode;
}

const EmailProtectedRoute: React.FC<EmailRouteProps> = ({ children }) => {
  const { email } = useEmailStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!email) {
      navigate("/connect/phone");
    }
  }, [email]);

  return <>{children}</>;
};

export default EmailProtectedRoute;
