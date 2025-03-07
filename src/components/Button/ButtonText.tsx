import { FC, PropsWithChildren } from "react";
import clsx from 'clsx'

export interface ButtonTextProps {
  disabled?: boolean;
  onClick?: () => void;
}

export const ButtonText: FC<PropsWithChildren<ButtonTextProps>> = (props) => {
  const styles = clsx(
    props.disabled ? 'text-disabledColor2 rounded-full px-4 py-2 text-bold' :
      'text-primaryColor hover:text-primaryColor2 active:text-primaryColor2 rounded-full px-4 py-2 text-bold'
  );

  return (
    <button {...props} className={styles}>{props.children}</button>
  );
}