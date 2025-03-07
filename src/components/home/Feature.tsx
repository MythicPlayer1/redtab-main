import React from "react";

interface featureProps {}

const feature: React.FC<featureProps> = () => {
  return (
    <div className="flex p-4 h-36 w-full">
          <div className="h-full w-full bg-primaryColor rounded-xl"></div>
    </div>
  );
};

export default feature;
