import { FC, PropsWithChildren } from "react";
import { LoginModal } from "./LoginModal";
import { useLoginStatusStore } from "../store/login-status-store/use-login-status-store";

export interface ProtectedRouteProps {}

export const ProtectedRoute: FC<PropsWithChildren<ProtectedRouteProps>> = (props) => {
  const { isLoggedIn } = useLoginStatusStore();

  if (isLoggedIn) {
    return <>{props.children}</>;
  }

  return <LoginModal />;
};
