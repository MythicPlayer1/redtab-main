import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { KYCScreen } from "../../../components/KYCScreen";
import { InputText } from "../../../components/Input";
import { InputAddress } from "../../../components/Input/InputAddress";
import { KYCFormStore } from "../../../store/kyc/kyc-info-store";



export interface KYCLocationProps {
}

const KYCLocation: FC<KYCLocationProps> = () => {
  const { t } = useTranslation('KYCLocation');
  const navigate = useNavigate();
  const {outletName} = KYCFormStore();
  return (
    <KYCScreen onAction={() => navigate('/kyc/merchant/name')}
      title={t('YourBusinessInfoLocation', { defaultValue: `${outletName} location.` })}
    >
      <InputText value="Nepal" label={t('merchantCountryLabel', { defaultValue: 'Country' })}></InputText>
      <InputAddress label={t('merchantAddressLabel', { defaultValue: 'Enter Address' })} placeholder={t('merchantAddressPlaceholder', { defaultValue: 'Enter Address' })}></InputAddress>
    </KYCScreen>
  );
}
 
export default KYCLocation