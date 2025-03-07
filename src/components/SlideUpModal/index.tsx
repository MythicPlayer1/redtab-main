import React from 'react'

export interface SlideUpModalProps {
  children?: React.ReactNode;
  visible?: boolean;
  onClose?: () => void;
  title?: string;
  subTitle?: string;
}

export const SlideUpModal = (props: SlideUpModalProps) => {
  return (
    <>
      {props.visible && <div className="fixed top-0 h-full w-full">
        <div className="fixed bottom-0 top-0 w-full z-20 bg-[#fff] rounded-t-l">
          <div className="px-4 pb-4 h-full">
            {props.children}
          </div>
        </div>
        <div className="absolute h-screen w-full bg-[rgba(0,0,0,0.5)]" onClick={props.onClose}></div>
      </div>
      }
    </>
  );
}