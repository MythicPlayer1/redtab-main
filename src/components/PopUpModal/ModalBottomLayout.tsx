import React, { ReactNode } from "react";

interface ModalBottomLayoutProps {
  children: ReactNode;
  className?: string;
  width?: string;
}

const ModalBottomLayout: React.FC<ModalBottomLayoutProps> = ({ children, className = "h-[300px]" }) => {
  return (
    <>
      <div className="flex justify-center items-center p-4">
        <div
          className={`flex ${className}  rounded-2xl`}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default ModalBottomLayout;
