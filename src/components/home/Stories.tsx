import React from "react";
import ProfileLogo from "../profile-logo";
import { BusinessTypeSupplierData } from "../../store/business-type-store/use-business-type-supplier";
import { useNavigate } from "react-router-dom";

interface storiesProps {
  businessType?: BusinessTypeSupplierData[] | undefined;
}

const stories: React.FC<storiesProps> = (props) => {
  const navigate = useNavigate();
  const handleSupplier = (uuid: string) => {
    navigate(`/supplier-list/${uuid}`);
  };

  return (
      <div className="p-4 flex  md:justify-between w-[auto] md:w-full overflow-scroll gap-4 md:gap-0 scroll-smooth no-scrollbar">
      {props?.businessType?.map((business) => (
        <div key={business.uuid} className="flex flex-col gap-1 items-center text-center" onClick={() => handleSupplier(business.uuid)}>
          <ProfileLogo src="/app.jpeg" height={64} width={64} />
          <p className="text-xs">{business.business_type_name}</p>
        </div>
      ))}
    </div>
  );
};

export default stories;
