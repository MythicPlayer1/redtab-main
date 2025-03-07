import { FC, PropsWithChildren } from "react";
import { SignUpModal } from "./SignUpModal";

export interface MainLayoutProps {

}

export const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = (props) => {

  return (
    <div>
      {props.children}

      <SignUpModal />
    </div>
  );
}