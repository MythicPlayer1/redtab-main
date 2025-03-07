import { MdCancel } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import React, { useState } from "react";
import clsx from "clsx";

interface InputSearchProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputSearch: React.FC<InputSearchProps> = ({
  type = "text",
  placeholder = "Search name of your member",
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState<string>(value || "");

  const inputClasses = clsx(
    "pl-10 w-full h-[36px]  px-3",
    "text-gray-800 leading-tight focus:outline-none focus:ring-purple-600",
    "placeholder:font-poppins placeholder:font-normal placeholder:text-xs",
    "placeholder:text-[placeHolderTextColor] bg-[#F5F6F7] rounded-full"
  );

  const rightIconClasses = clsx(
    "absolute right-0 inset-y-0  flex justify-center items-center",
    "mt-0.5 text-secondaryColorTextBtn   bg-[#EAECF0]  rounded-full text-lg cursor-pointer h-8 w-8"
  );

  const leftIconClasses = clsx("absolute left-3 inset-y-2 flex items-center h-5 w-5", "text-xl font-extrabold");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  const handleClearInput = () => {
    setInputValue("");
    if (onChange) {
      onChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className="relative">
      <input
        className={inputClasses}
        type={type}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
      />
      <div className={rightIconClasses} onClick={handleClearInput}>
        <MdCancel />
      </div>
      <div className={leftIconClasses}>
        <CiSearch className="text-[#98A2B3]" />
      </div>
    </div>
  );
};

export default InputSearch;
