import React from "react";
import { useNavigate } from "react-router-dom";

interface cardProps {
  name?: string;
  img?: string;
  short_desc?: string;
  uuid?: string;
}

const Card: React.FC<cardProps> = ({ name, img, short_desc }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate("/products");
  };

  return (
    <div
      className="min-w-[250px] w-full h-[173px] rounded-xl flex flex-col justify-between shadow-lg cursor-pointer"
      onClick={handleProductClick}
    >
      {img ? (
        <img src={img} className="w-full h-[110px] object-cover rounded-t-xl" alt={name} />
      ) : (
        <img src="/redtab.jpg" className="w-full h-[110px] object-cover rounded-t-xl" alt={"redtab"} />
      )}
      <div className="flex flex-col px-3 pb-2 text-wrap">
        <p className="font-medium text-xs">{name}</p>
        <p className="text-[#667085] text-xs">{short_desc}</p>
      </div>
    </div>
  );
};

export default Card;