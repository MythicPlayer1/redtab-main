import React, { forwardRef } from "react";
import { InputBase, InputBaseProps } from "./InputBase";
import { useControllableValue } from "ahooks";

export interface InputTextProps extends Omit<InputBaseProps<string>, "Input"> {
  multiline?: boolean;
  rows?: number;
  count?: boolean;
  required?: boolean;
  /// <reference path="" />
  ref?: React.Ref<HTMLInputElement>;
  onClick?: () => void;
  errorMessage?: string;
}

interface InputProps {
  placeholder?: string;
  autoFocus?: boolean;
  onChange?: (newValue: string) => void;
  value?: string;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
  onClick?: () => void;
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>((props, ref) => {
  if (props.multiline) {
    return (
      <textarea
        ref={ref as React.Ref<HTMLTextAreaElement>}
        placeholder={props.placeholder}
        autoFocus={props.autoFocus}
        rows={props.rows}
        className="w-full bg-[transparent] focus-visible:outline-none text-[#667085] font-normal"
        onChange={(e) => props.onChange?.(e.target.value)}
        value={props.value}
      />
    );
  }

  return (
    <input
      ref={ref as React.Ref<HTMLInputElement>}
      placeholder={props.placeholder}
      autoFocus={props.autoFocus}
      className="w-full bg-[transparent] focus-visible:outline-none text-[#1D2939] placeholder:text-[#667085] text-base font-normal"
      onChange={(e) => props.onChange?.(e.target.value)}
      onClick={props.onClick}
      value={props.value}
      required={props?.required}
    />
  );
});

export const InputText = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputTextProps>((props, ref) => {
  const [newValue, setValue] = useControllableValue(props, {
    defaultValue: "",
  });

  return (
    <InputBase
      {...props}
      inputProps={{
        ...props.inputProps,
        rows: props.rows,
        multiline: props.multiline,
      }}
      Input={Input}
      value={newValue}
      autoFocus={props?.autoFocus}
      required={props?.required}
      onChange={setValue}
      onClick={props.onClick}
      ref={ref as React.Ref<HTMLInputElement>}
      appendOn={
        <>
          {props.appendOn}
          {props.count && <span className="text-[#98A2B3] text-xs">{newValue.length}</span>}
        </>
      }
      errorMessage={props.errorMessage}
    />
  );
});
