import { FC, PropsWithChildren } from "react";
import { SlideUpModal } from "./SlideUpModal";

export interface ModalLayoutProps {
  footer?: React.ReactNode;
  title?: string;
  subTitle?: string;
  arrowBack?: React.ReactNode;
}

const Title: FC<PropsWithChildren> = (props: PropsWithChildren) => <div className="text-[30px] w-[70%] font-semibold leading-[38px]">{props.children}</div>
const SubTitle: FC<PropsWithChildren> = (props: PropsWithChildren) => <div className="text-xs text-[#667085] font-normal">{props.children}</div>

export const ModalLayout: FC<PropsWithChildren<ModalLayoutProps>> = (props: PropsWithChildren<ModalLayoutProps>) => {
  return (
    <SlideUpModal visible>
      <div className="flex flex-col h-full gap-[32px]">
        <div className="flex flex-col gap-1">
          {props.arrowBack ? props.arrowBack : (
            <div className="min-h-20" />
          )}

          <Title>{props.title}</Title>
          <SubTitle>{props.subTitle}</SubTitle>

        </div>


        <div className="my-5 flex flex-col grow gap-2">
          <div className="w-full">
            {props.children}
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 mb-4 flex-col">
          {props.footer}
        </div>
      </div>
    </SlideUpModal>
  );
}