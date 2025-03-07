import { FC, PropsWithChildren, ReactNode } from "react";

export interface MasterLayoutProps {
  header?: ReactNode;
}

export const MasterLayout: FC<PropsWithChildren<MasterLayoutProps>> = (props) => {
  return (
    <div className="bg-primaryColor">
      <div className="bg-primaryColor text-primaryColorText">{props.header}</div>
      <div className="rounded-t-3xl bg-[#fff] pt-8">{props.children}</div>
    </div>
  );
};
