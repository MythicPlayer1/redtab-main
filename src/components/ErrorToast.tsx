import { FC } from "react";

export interface ErrorToastProps {
  message: string;
}

export const ErrorToast: FC<ErrorToastProps> = (props) => {
  return (
    <div className="z-50 fixed top-8 left-0 right-0">
      <div className="text-[#fff] gap-3 mx-4 rounded-3xl bg-[#1D2939] px-4 py-3 flex items-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.80005 11.9998C1.80005 6.3665 6.36674 1.7998 12 1.7998C17.6334 1.7998 22.2001 6.3665 22.2001 11.9998C22.2001 17.6331 17.6334 22.1998 12 22.1998C6.36674 22.1998 1.80005 17.6331 1.80005 11.9998ZM12.0002 6.5998C11.5031 6.5998 11.1002 7.00275 11.1002 7.4998V12.8998C11.1002 13.3969 11.5031 13.7998 12.0002 13.7998C12.4973 13.7998 12.9002 13.3969 12.9002 12.8998V7.4998C12.9002 7.00275 12.4973 6.5998 12.0002 6.5998ZM10.9202 16.6798C10.9202 16.0833 11.4037 15.5998 12.0002 15.5998C12.5966 15.5998 13.0802 16.0833 13.0802 16.6798C13.0802 17.2763 12.5966 17.7598 12.0002 17.7598C11.4037 17.7598 10.9202 17.2763 10.9202 16.6798Z"
            fill="#FF453A"
          />
        </svg>
        {props.message}
      </div>
    </div>
  );
};
