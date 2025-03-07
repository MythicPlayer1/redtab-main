import React, { forwardRef } from "react";
import { useControllableValue } from "ahooks";
import { InputBaseProps, InputPinBase } from "./InputPinBase";

export interface InputTextProps extends Omit<InputBaseProps<string>, "Input"> {
  multiline?: boolean;
  rows?: number;
  count?: boolean;
  required?: boolean;
  type?: "text" | "password";
  ref?: React.Ref<HTMLInputElement>;
}

interface InputProps {
  placeholder?: string;
  autoFocus?: boolean;
  onChange?: (newValue: string) => void;
  value?: string;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
  type: "text" | "password";
  label: string | boolean;
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>((props, ref) => {
  if (props.multiline) {
    return (
      <textarea
        ref={ref as React.Ref<HTMLTextAreaElement>}
        placeholder={props.placeholder}
        autoFocus={props.autoFocus}
        rows={props.rows}
        className="w-full  bg-[transparent] focus-visible:outline-none font-normal"
        onChange={(e) => props.onChange?.(e.target.value)}
        value={props.value}
      />
    );
  }

  return (
    <input
      ref={ref as React.Ref<HTMLInputElement>}
      type={props.type}
      placeholder={props.placeholder}
      autoFocus={props.autoFocus}
      className="w-full bg-[transparent] focus-visible:outline-none text-[
      #C5CAD1] placeholder:text-[#667085] text-base font-normal"
      onChange={(e) => props.onChange?.(e.target.value)}
      value={props.value}
      required={props?.required}
    />
  );
});

export const InputPin = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputTextProps>((props, ref) => {
  const [newValue, setValue] = useControllableValue(props, {
    defaultValue: "",
  });

  return (
    <InputPinBase
      {...props}
      inputProps={{
        ...props.inputProps,
        rows: props.rows,
        multiline: props.multiline,
        type: "password",
      }}
      Input={Input}
      value={newValue}
      required={props?.required}
      onChange={setValue}
      ref={ref as React.Ref<HTMLInputElement>}
      appendOn={<>{props.appendOn}</>}
    />
  );
});
