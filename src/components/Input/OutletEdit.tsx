import React, { FC } from "react";

interface EditProps {
  label: string;
  value: string;
}

const OutletEdit: FC<EditProps> = ({ label, value }) => {
  return (
    <div className="w-full h-auto flex justify-between items-center space-x-4">
      <span className="text-[#667085] text-sm font-normal">{label}</span>
      <p className="w-[200px] h-auto break-words text-right text-[#1D2939] text-sm font-semibold border-none outline-none focus:ring-0 p-0 m-0 bg-transparent">{value}</p>
    </div>
  );
}

export default OutletEdit;
