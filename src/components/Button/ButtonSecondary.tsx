import { FC, PropsWithChildren } from "react";
import clsx from 'clsx'


const ButtonPrimarySize: { [key: string]: string } = {
  small: 'px-2 py-1 text-xs',
  normal: 'px-4 py-2 text-base',
  large: 'px-6 py-3 text-large'
}

export interface ButtonSecondaryProps {
  disabled?: boolean;
  className?: string;
  size?: string | 'normal' | 'small' | 'large';
  onClick?: () => void;
}

export const ButtonSecondary: FC<PropsWithChildren<ButtonSecondaryProps>> = (props) => {
  const styles = clsx(
    props.disabled ? 'bg-disabledColor2 hover:bg-disabledColor2 active:bg-disabledColor2 text-disabledColorText2 rounded-full text-bold h-[44px]' :
      'bg-secondaryColor hover:bg-secondaryColor2 active:bg-secondaryColor2 text-secondaryColorText rounded-full text-bold h-[44px]',
    props.size ?
      ButtonPrimarySize[props.size] : '',
    props.className,
  );

  return (
    <button {...props} className={styles}>{props.children}</button>
  );
}