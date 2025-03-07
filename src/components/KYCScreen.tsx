import { FC, PropsWithChildren } from "react";
import { ActivityLayout } from "./ActivityLayout";
import { IconBack, IconBackWhite } from "./IconBack";
import clsx from "clsx";

export interface KYCScreenProps {
  className?: string;
  onAction?: () => void;
  title?: string;
  subTitle?: string;
  footer?: React.ReactNode;
  color?: string;
  //skipButton?: boolean;
  onSkip?: () => void;
  noMy?: boolean;
}

export const KYCScreen: FC<PropsWithChildren<KYCScreenProps>> = (props) => {
  return (
    <div className={clsx("px-5 h-screen", props.className)}>
      <ActivityLayout
        arrowBack={
          <div className="py-5 min-h-20 flex justify-between items-center">
            <button onClick={() => props.onAction?.()}>{props.color ? <IconBackWhite /> : <IconBack />}</button>
            {props.onSkip && (
              <button onClick={props.onSkip} className="w-[30px] h-[20px] text-normal font-poppins font-medium text-[#EA4335]">
                Skip
              </button>
            )}
          </div>
        }
        noMy={props.noMy}
        title={props.title}
        subTitle={props.subTitle}
        footer={props.footer}
      >
        {props.children}
      </ActivityLayout>
    </div>
  );
};
