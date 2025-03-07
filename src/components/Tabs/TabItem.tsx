import clsx from "clsx";
import React, { PropsWithChildren } from "react";

interface TabItemProps {
  active?: boolean;
  icon?: React.ReactNode;
  backgroundColor?: string;
}

const TabItem: React.FC<PropsWithChildren<TabItemProps>> = (props) => (
  <div
    className={clsx(
      "text-center w-1/4 cursor-pointer grow flex items-center flex-col px-4 py-4 group text-[#98A2B3] hover:text-primaryColor hover:bg-secondaryColor",
      props.active && "text-primaryColor"
    )}
  >
    {props.icon}
    <div className="text-currentColor">{props.children}</div>
  </div>
);
export default TabItem;
