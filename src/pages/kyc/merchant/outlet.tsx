import { FC, useEffect, useState } from "react";
import { KYCScreen } from "../../../components/KYCScreen";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ButtonPrimary } from "../../../components/Button/ButtonPrimary";
import { InputText } from "../../../components/Input";
import { useMerchantContactStore } from "../../../store/merchant-profile/use-merchant-contact-store";
import { KYCFormStore } from "../../../store/kyc/kyc-info-store";
import { useCreateOutletProfile } from "../../../store/kyc/use-create-outlet-profile";


export interface KYCNameProps {}

const KYCOutlet: FC<KYCNameProps> = () => {
  const { t } = useTranslation("KYC");
  const navigate = useNavigate();
  const {setOutletName}= KYCFormStore();
  const [outletName, setName] = useState<string>();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const merchantProfile = localStorage.getItem('merchant-profile-storage');
  const merchantProfileUUID = JSON.parse(merchantProfile as string)?.state?.merchantProfileUUID;

  const { setMerchantName } = useMerchantContactStore();
  const merchant_profile= merchantProfileUUID 
  const {createOutletProfile} = useCreateOutletProfile();
  const handleMerchantName = async () => {
    if (outletName) {
      setMerchantName(outletName);
      setOutletName(outletName);
    }
    createOutletProfile({outlet_name: outletName, merchant_profile: merchant_profile}).then(() => {
        const {verifySuccess} = useCreateOutletProfile.getState();
        if(verifySuccess){
            navigate("/kyc/merchant/location");
          }

    });
  };
  useEffect(() => {
    if (outletName) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [outletName]);
  return (
    <KYCScreen
      onAction={() => navigate("/home")}
      title={t("YourBusinessInfoName", { defaultValue: "Tell us about your business." })}
      footer={
        <>
          <ButtonPrimary onClick={handleMerchantName} className="w-full" disabled={isDisabled}>
            {t("next", { defaultValue: "Continue" })}
          </ButtonPrimary>
        </>
      }
    >
      <InputText
        label={t("merchantNameLabel", { defaultValue: "Outlet Name" })}
        placeholder={t("merchantNamePlaceholder", { defaultValue: "Outlet Name" })}
        value={outletName}
        onChange={setName}
      ></InputText>
    </KYCScreen>
  );
};

export default KYCOutlet;
