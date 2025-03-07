import { FC, PropsWithChildren} from "react";
import clsx from "clsx";
import React from "react";

export interface ActivityLayoutProps {
  footer?: React.ReactNode;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  arrowBack?: React.ReactNode;
  noMy?: boolean;
  noMyFooter?: boolean;
  contentClassName?: string;
}

const Title: FC<PropsWithChildren> = (props: PropsWithChildren) => (
  <div className="text-[1.875rem] capitalize font-semibold font-poppins w-[90%] leading-tight">{props.children}</div>
);
const SubTitle: FC<PropsWithChildren> = (props: PropsWithChildren) => (
  <div className="text-[0.875rem] text-[#667085] text-xs font-poppins font-normal mt-2">{props.children}</div>
);



export const ActivityLayout: FC<PropsWithChildren<ActivityLayoutProps>> = (
  props: PropsWithChildren<ActivityLayoutProps>,
  arrowBackClass?: string
) => {
 
  const backIconProps = clsx(`${arrowBackClass}`);
  return (
    <div className="flex flex-col min-h-screen">
      {props.arrowBack ? props.arrowBack : <div className={backIconProps} />}

      {props.title && <Title>{props.title}</Title>}
      {props.subTitle && <SubTitle>{props.subTitle}</SubTitle>}

      <div
        className={clsx(
          {
            "my-5": !props.noMy,
          },
          "flex flex-col grow",
          props.contentClassName
        )}
      >
        <div className="w-full h-full">{props.children}</div>
      </div>

      <div className={clsx("flex items-center justify-between gap-2 flex-col", props.noMyFooter ? "" : "pb-4")} >
        {props.footer}
      </div>
    </div>
  );
};
