import React from "react";
import clsx from "clsx";

interface InputStaffTextProps {
  inputType: "text" | "password"; // Use "password" to display dots for PIN
  value?: string;
  placeholder: string;
  labelText?: string;
  required: boolean;
  maxLength?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputStaffUsername: React.FC<InputStaffTextProps> = ({
  inputType,
  placeholder,
  required,
  value,
  onChange,
  labelText,
  maxLength,
}) => {
  const inputClasses = clsx(
    "h-14 rounded-md w-[93%]",
    "placeholder:font-poppins placeholder:font-normal placeholder:text-base",
    "placeholder:text-[#667085]",
    "focus:outline-none "
  );

  return (
    <div className="relative border-b-[1px] border-[#EAECF0] focus-within:border-b-[#EA4335]">
      <label className="font-poppins  font-medium text-xs">{labelText}</label>
      <input
        type={inputType}
        className={inputClasses}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
      />
      <hr className="h-px  bg-[#EAECF0] border-0 w-[93%]" />
    </div>
  );
};

export default InputStaffUsername;
