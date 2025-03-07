import clsx from "clsx";
import React, { PropsWithChildren } from "react";
interface TabItemProps {
    active?: boolean;
    icon?: React.ReactNode;
    onClick?: () => void;
}

const BottomTabItem: React.FC<PropsWithChildren<TabItemProps>> = (props) => (
    <div
        className={clsx(
            "text-center  w-[72px] cursor-pointer grow flex items-center justify-between flex-col px-4 py-[6px] group h-[54px]",
            props.active ? "text-primaryColor" : "text-[#98A2B3]",
            props.active ? "bg-primaryColorText" : "hover:text-primaryColor"
        )}
        onClick={props.onClick}
    >
        <div className="w-[24px] h-[24px] flex justify-center items-center">{props.icon}</div>
        <div className="text-current text-[12px] font-semibold leading-[16px]">{props.children}</div>
    </div>
);

export default BottomTabItem;

