import { FC, PropsWithChildren } from "react";

export interface LayoutProps {
  footer?: React.ReactNode;
  title?: string;
  subTitle?: string;
  arrowBack?: React.ReactNode;
}

const Title: FC<PropsWithChildren> = (props: PropsWithChildren) => <div className="text-[1.875rem] font-semibold">{props.children}</div>
const SubTitle: FC<PropsWithChildren> = (props: PropsWithChildren) => <div className="text-[0.875rem] text-[#667085]">{props.children}</div>

export const Layout: FC<PropsWithChildren<LayoutProps>> = (props: PropsWithChildren<LayoutProps>) => {
  return (
    <div className="flex flex-col h-full px-4">
      {props.arrowBack ? props.arrowBack : (
        <div className="min-h-20" />
      )}

      <Title>{props.title}</Title>
      <SubTitle>{props.subTitle}</SubTitle>

      <div className="my-5 flex flex-col grow">
        <div className="w-full">
          {props.children}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 mb-4 flex-col">
        {props.footer}
      </div>
    </div>
  );
}