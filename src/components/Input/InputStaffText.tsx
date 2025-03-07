import React from "react";
import clsx from "clsx";

interface InputStaffTextProps {
  inputType: string;
  value?: string;
  placeholder: string;
  required: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputStaffText: React.FC<InputStaffTextProps> = ({ inputType, placeholder, required, value, onChange }) => {
  const inputClasses = clsx(
    "h-14 rounded-md",
    "placeholder:font-poppins placeholder:font-normal placeholder:text-base",
    "placeholder:text-[#667085]",
    "focus:outline-none",
    "text-[#667085]"
  );

  return (
    <>
        <div className="relative border-b-[1px] border-[#EAECF0] focus-within:border-b-[#EA4335]">
          <input
            type={inputType}
            className={inputClasses}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={onChange}
          />
        </div>
    </>
  );
};

export default InputStaffText;

