import React, { useEffect } from "react";
import Header from "./header";
import { useCompanyVerifyStore } from "../../store/pan-verification-store/use-outlet-verification";
import { usePanVerificationInformationStore } from "../../store/pan-verification-store/use-pan-verification-store";

const CompanyRegistration = () => {
  const { companyVerify } = useCompanyVerifyStore();
  const [companyRegImage, setCompanyRegImage] = React.useState<string>("");
  const { setImagePreviewURL1 } = usePanVerificationInformationStore();

  useEffect(() => {
    if (companyVerify[0]?.company_register_doc_image) {
      const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
      const companyImage = companyVerify[0]?.company_register_doc_image;
      setCompanyRegImage(`${baseUrl}${companyImage}`);
      setImagePreviewURL1(`${baseUrl}${companyImage}`);
    }
  }, [companyVerify]);

  return (
    <>
      <Header title="Company Registration Document" path="/kyc/pan/verify-company"/>
      {companyRegImage ? (
        <div className="mt-4 border border-[#d0d5dd] bg-primaryColorText rounded-[0.75rem] flex text-center items-center justify-center">
          <img src={companyRegImage} alt="company_doc_image" className="w-full h-full" />
        </div>
      ) : (
        <p className="mt-[1px]">No company registration document uploaded</p>
      )}
    </>
  );
};

export default CompanyRegistration;
