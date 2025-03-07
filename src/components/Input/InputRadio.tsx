import React from "react";

interface InputRadioProps {
  name: string;
  value: string;
  label: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputRadio: React.FC<InputRadioProps> = ({ name, value, label, checked, onChange }) => {
  return (
    <label
      htmlFor=""
      className="block size-4 cursor-pointer rounded-full bg-primaryColor shadow-sm has-[:checked]:ring-2 has-[:checked]:ring-primaryColor has-[:checked]:ring-offset-2"
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      <span className="sr-only">{label}</span>
    </label>
  );
};

export default InputRadio;
