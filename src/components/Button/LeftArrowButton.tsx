import { Link } from "react-router-dom";
import { IconBack } from "../IconBack";

interface LeftArrowButtonProps {
  to: string;
  onClick?: () => void;
}

const LeftArrowButton: React.FC<LeftArrowButtonProps> = ({ to, onClick }) => {
  return (
    <>
      {/* left side arrow  */}
      <Link to={to} onClick={onClick} >
        <IconBack  />
      </Link>
    </>
  );
};

export default LeftArrowButton;
