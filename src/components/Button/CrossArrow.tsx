import React from "react";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

interface CrossArrowProps {
  onClick?: () => void;
  className?: string;
  to: string;
}

const CrossArrow: React.FC<CrossArrowProps> = ({ onClick, className, to }) => {
  return (
    <div onClick={onClick} className={className}>
      <Link to={to}>
        <RxCross2 className="text-2xl" />
      </Link>
    </div>
  );
};

export default CrossArrow;
