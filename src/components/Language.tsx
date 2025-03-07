import { FC } from "react";

export interface LanguageProps {}

const Language: FC<LanguageProps> = () => {
  return (
    <div className="w-full h-[44px] absolute top-[28px] right-3 flex justify-end items-end">
      <div className="h-full w-[355px]"></div>
      <button className="text-[#EA4335] flex items-center justify-center bg-[#fff] text-sm font-normal appearance-none w-[18px] h-[20px]">
        EN
      </button>
    </div>
  );
};

export default Language;
