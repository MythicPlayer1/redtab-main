import { FC } from "react";


export interface SwitchActionsProps {
  items: Array<{
    title: string;
  }>;
  value: number;
}

export const SwitchActions: FC<SwitchActionsProps> = ({ value, items }) => {
  return (
    <div className="flex rounded-full bg-[#EAECF0] px-1 py-1 text-xs text-[#667085] gap-2 font-bold cursor-pointer">
      {items.map(({ title }, index) => {
        if (value == index) {
          return <div className="text-[#1D2939] shadow-sm rounded-full bg-[#fff] px-5 py-2 items-center justify-center ">{title}</div>
        }

        return <div className="px-5 py-2">{title}</div>
      })}
    </div>
  );
}