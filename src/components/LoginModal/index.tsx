import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LoginModal = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/connect/phone");
  }, [navigate]);

  return <div />;
};
