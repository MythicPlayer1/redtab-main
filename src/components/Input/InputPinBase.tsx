import { FC, ReactNode, forwardRef, Ref } from "react";
import clsx from "clsx";

export interface InputBaseProps<T> {
  label?: string | boolean;
  removable?: boolean;
  value?: T;
  autoFocus?: boolean;
  placeholder?: string;
  onChange?: (newValue: string) => void;
  prependOn?: ReactNode;
  appendOn?: ReactNode;
  Input: FC<any>;
  inputProps?: any;
  required?: boolean;
  helper?: ReactNode;
  error?: ReactNode;
  ref?: Ref<HTMLInputElement>;
  focusWithinBorder?: string;
}

export const InputPinBase = forwardRef(<T,>({ Input, inputProps,  focusWithinBorder, ...props }: InputBaseProps<T>, ref: Ref<HTMLInputElement>) => {
  return (
    <div className='mb-4 font-poppins'>
     <div className={`${focusWithinBorder !== 'none' ? 'focus-within:border-b-[#EA4335]' : ''} gap-2 w-full min-h-[3.75rem] py-[0.3rem] border-b-[1px] border-b-[#EAECF0] capitalize border-[transparent] flex items-center justify-between`}>

        {props.prependOn}
        <div className="grow">
          {props.label !== false && (
            <label className={clsx("text-xs font-medium text-[#1D2939] tracking-wide" , { 'hidden': !props.value })}>
              {props.label}
            </label>
          )}
          <Input
            {...inputProps}
            ref={ref}
            autoFocus={props.autoFocus}
            placeholder={props.placeholder}
            className="w-full bg-[transparent] focus-visible:outline-none font-normal capitalize"
            onChange={props.onChange}
            value={props.value}
          />
        </div>
        {props.removable && (
          <svg onClick={() => props.onChange?.('')} className="cursor-pointer" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8ZM4.56347 4.56354C4.212 4.91501 4.212 5.48486 4.56347 5.83633L6.72713 7.99995L4.56348 10.1636C4.212 10.515 4.212 11.0849 4.56347 11.4364C4.91494 11.7878 5.48479 11.7878 5.83626 11.4364L7.99993 9.27274L10.1636 11.4364C10.5151 11.7878 11.0849 11.7878 11.4364 11.4364C11.7879 11.0849 11.7879 10.515 11.4364 10.1636L9.27273 7.99995L11.4364 5.83633C11.7879 5.48486 11.7879 4.91501 11.4364 4.56354C11.0849 4.21206 10.5151 4.21206 10.1636 4.56353L7.99993 6.72717L5.83626 4.56353C5.48478 4.21206 4.91493 4.21206 4.56347 4.56354Z" fill="#D0D5DD" />
          </svg>
        )}
        {props.appendOn}
      </div>
      {props.helper && <div className='max-h-[2.5rem] text-[#7A7E83] text-[0.75rem] p-1'>{props.helper}</div>}
      {props.error && (
        <div className='max-h-[2.5rem] text-[0.75rem] p-1 text-[#F04438]'>
          <svg className='inline mr-2' width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_566_11403)">
              <path fillRule="evenodd" clipRule="evenodd" d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12ZM6 1.99999C6.41421 1.99999 6.75 2.33578 6.75 2.74999V6.3C6.75 6.71421 6.41421 7.05 6 7.05C5.58579 7.05 5.25 6.71421 5.25 6.3V2.74999C5.25 2.33578 5.58579 1.99999 6 1.99999ZM6.90156 8.99998C6.90156 9.49703 6.49862 9.89997 6.00156 9.89997C5.50451 9.89997 5.10156 9.49703 5.10156 8.99998C5.10156 8.50292 5.50451 8.09998 6.00156 8.09998C6.49862 8.09998 6.90156 8.50292 6.90156 8.99998Z" fill="#FF453A" />
            </g>
            <defs>
              <clipPath id="clip0_566_11403">
                <rect width="12" height="12" fill="white" />
              </clipPath>
            </defs>
          </svg>
          {props.error}
        </div>
      )}
    </div>
  );
});