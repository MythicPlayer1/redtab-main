import { Link } from "react-router-dom";

interface BackLessVGProps {
  to?: string;
  onClick?: () => void;
}

const BackArrowLess: React.FC<BackLessVGProps> = ({ to, onClick }) => {
  return (
    <>
      <Link to={to || "#"} onClick={onClick} className="h-6 w-6 flex items-center justify-center">
        <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.225521 8.54307C-0.0751736 8.24288 -0.0751736 7.7579 0.225521 7.45693L7.362 0.325723C7.79608 -0.108574 8.50232 -0.108574 8.93717 0.325723C9.37125 0.76002 9.37125 1.46488 8.93717 1.89917L2.83231 8.00039L8.93717 14.1C9.37125 14.5351 9.37125 15.24 8.93717 15.6743C8.50232 16.1086 7.79608 16.1086 7.362 15.6743L0.225521 8.54307Z"
            fill="#25282B"
          />
        </svg>
      </Link>
    </>
  );
};

export default BackArrowLess;
