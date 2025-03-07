import { FC, PropsWithChildren } from "react";
import clsx from "clsx";

const ButtonPrimarySize: { [key: string]: string } = {
    small: "px-2 py-1 text-xs",
    normal: "px-4 py-2 text-base",
    medium: "px-4 py-2 text-sm",
    large: "px-6 py-2 text-large",
};

export interface ButtonPrimaryProps {
  disabled?: boolean;
  className?: string;
  size?: string | "normal" | "small" | "medium" | "large";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
}

export const ButtonPrimary: FC<PropsWithChildren<ButtonPrimaryProps>> = (
  props: PropsWithChildren<ButtonPrimaryProps>
) => {
  const { size = "normal", isLoading } = props;
  const styles = clsx(
    props.disabled
      ? "bg-disabledColor py-2 hover:bg-disabledColor active:bg-disabledColor text-disabledColorText rounded-full text-bolder text-sm h-[44px]"
          : "bg-primaryColor py-2 hover:bg-primaryColor2 active:bg-primaryColor2 text-primaryColorText rounded-full text-bold text-sm h-[44px]",

    size ? ButtonPrimarySize[size] : "",

    props.className
  );

  return (
    <button {...props} className={styles} type={props?.type} onClick={props?.onClick}>
      {isLoading ? (
        <div className="flex justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <mask id="path-1-inside-1_113_4416" fill="white">
                          <path d="M24 12C24 9.62662 23.2962 7.30655 21.9776 5.33316C20.6591 3.35977 18.7849 1.8217 16.5922 0.913446C14.3995 0.005194 11.9867 -0.232446 9.65892 0.230577C7.33114 0.693599 5.19295 1.83649 3.51472 3.51472C1.83649 5.19295 0.693599 7.33114 0.230577 9.65892C-0.232446 11.9867 0.00519403 14.3995 0.913446 16.5922C1.8217 18.7849 3.35977 20.6591 5.33316 21.9776C7.30655 23.2962 9.62662 24 12 24V21.281C10.1644 21.281 8.37001 20.7367 6.84375 19.7169C5.3175 18.6971 4.12793 17.2476 3.42548 15.5517C2.72302 13.8558 2.53923 11.9897 2.89734 10.1894C3.25544 8.38903 4.13937 6.73532 5.43734 5.43734C6.73532 4.13937 8.38903 3.25544 10.1894 2.89734C11.9897 2.53923 13.8558 2.72302 15.5517 3.42548C17.2476 4.12793 18.6971 5.3175 19.7169 6.84375C20.7367 8.37001 21.281 10.1644 21.281 12H24Z" />
                      </mask>
                      <path d="M24 12C24 9.62662 23.2962 7.30655 21.9776 5.33316C20.6591 3.35977 18.7849 1.8217 16.5922 0.913446C14.3995 0.005194 11.9867 -0.232446 9.65892 0.230577C7.33114 0.693599 5.19295 1.83649 3.51472 3.51472C1.83649 5.19295 0.693599 7.33114 0.230577 9.65892C-0.232446 11.9867 0.00519403 14.3995 0.913446 16.5922C1.8217 18.7849 3.35977 20.6591 5.33316 21.9776C7.30655 23.2962 9.62662 24 12 24V21.281C10.1644 21.281 8.37001 20.7367 6.84375 19.7169C5.3175 18.6971 4.12793 17.2476 3.42548 15.5517C2.72302 13.8558 2.53923 11.9897 2.89734 10.1894C3.25544 8.38903 4.13937 6.73532 5.43734 5.43734C6.73532 4.13937 8.38903 3.25544 10.1894 2.89734C11.9897 2.53923 13.8558 2.72302 15.5517 3.42548C17.2476 4.12793 18.6971 5.3175 19.7169 6.84375C20.7367 8.37001 21.281 10.1644 21.281 12H24Z" stroke="white" stroke-width="6" mask="url(#path-1-inside-1_113_4416)" />
                  </svg>

        </div>
      ) : (
        props.children
      )}
    </button>
  );
};
