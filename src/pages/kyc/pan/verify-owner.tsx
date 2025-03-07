import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { KYCScreen } from "../../../components/KYCScreen";
import { ButtonPrimary } from "../../../components/Button/ButtonPrimary";
import { useOwnerStore } from "../../../store/owner-identity/use-owner-verification-store";
import { countryValidator } from "../../../utils/useful-func";
import LocationDropDown from "../../../components/Input/dropdown/lcoation-drop";
import { Country} from "country-state-city";
import { NepalStatesStore } from "../../../store/kyc/kyc-info-store";

export interface KYCVerifyOwnerProps {}

const KYCVerifyOwner: FC<KYCVerifyOwnerProps> = () => {
  const { t } = useTranslation("KYC");
  const navigate = useNavigate();
  const { setCountry } = useOwnerStore();
  const {country}= NepalStatesStore();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const handleContinue = () => {
    setCountry(country);
    navigate("/kyc/pan/capture-front");
  };
  useEffect(()=>{
    const isCountry = countryValidator(country)
    if(country && isCountry){
      setIsDisabled(false);
    }else{
      setIsDisabled(true);
    }
  },[country])

  const countriesName= Country.getAllCountries();

  return (
    <KYCScreen
      onAction={() => {navigate("/profile")}}
      onSkip={() => navigate("/kyc/profile/interface")}
      title={t("verifyOwnerCompanyTitle", { defaultValue: "Verify owner identity" })}
      footer={
        <>
          <ButtonPrimary onClick={handleContinue} className="w-full"  size={'medium'} disabled={isDisabled}>
            {t("next", { defaultValue: "Continue" })}
          </ButtonPrimary>
        </>
      }
    >
      <LocationDropDown  countriesName={countriesName} name="Select Country" />
    </KYCScreen>
  );
};

export default KYCVerifyOwner;
