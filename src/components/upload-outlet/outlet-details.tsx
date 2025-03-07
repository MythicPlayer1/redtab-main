import React, { MutableRefObject } from "react";
import PANDetail from "./pan-details";
import CompanyRegistration from "./company-registration";

interface OutletDetail{
  box?: MutableRefObject<HTMLDivElement | null>
}
const OutletDetail = () => {
  return (
    <>
      <PANDetail />
      <CompanyRegistration />
    </>
  );
};

export default OutletDetail;
