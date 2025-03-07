import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { KYCScreen } from "../../../components/KYCScreen";
import { ButtonPrimary } from "../../../components/Button/ButtonPrimary";
import { InputText } from "../../../components/Input";
import { useMerchantContactStore } from "../../../store/merchant-profile/use-merchant-contact-store";
import { emailValidator, phoneValidator } from "../../../utils/useful-func";
import { useCreateOutletProfile } from "../../../store/kyc/use-create-outlet-profile";
import { useCreateMerchantProfile } from "../../../store/merchant-profile/use-create-merchant-profile";
import { useBasicInfoUpdate } from "../../../store/merchant-profile/use-basic-info-update";
import { NepalStatesStore } from "../../../store/kyc/kyc-info-store";

export interface KYCContactProps {}

const KYCContact: FC<KYCContactProps> = () => {
  const { t } = useTranslation("KYC");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const outlet = localStorage.getItem("outlet-uuid-storage");
  const outletUUID = JSON.parse(outlet as string)?.state?.outletUUID;
  const { name, email, phoneNumber, setMerchantEmail, setMerchantPhoneNumber } = useMerchantContactStore();
  const { verifyContact } = useCreateOutletProfile();
  const businessInfo = localStorage.getItem("sub-business-type-storage");
  const businessUUID = JSON.parse(businessInfo as string)?.state?.businessResponse?.value;
  const merchantProfile = localStorage.getItem("merchant-profile-storage");
  const merchantProfileUUID = JSON.parse(merchantProfile as string)?.state?.merchantProfileUUID;
  const getMerchantData = localStorage.getItem("merchant-getProfile-storage");
  const merchantProfileData = JSON.parse(getMerchantData as string)?.state?.merchantProfile;
  const { updateMerchantProfile } = useCreateMerchantProfile();
  const { provinces, districts, municipalities, country, wards, streets } = NepalStatesStore();
  const { updateContact, updateLocation } = useBasicInfoUpdate();

  useEffect(() => {
    const editSelected = localStorage.getItem("isEdit");
    if (editSelected) {
      setMerchantEmail(email);
      setMerchantPhoneNumber(phoneNumber);
    }
  }, [email, phoneNumber]);
  //for verify contact and navigate to the next page
  const handleOuletContactCreation = async () => {
    const editSelected = localStorage.getItem("isEdit");

    if (editSelected) {
      await updateContact(outletUUID, { outlet: outletUUID, email: email, contact_number: phoneNumber });
      await updateLocation(outletUUID, {
        outlet: outletUUID,
        district: districts,
        province: provinces,
        vdc_or_municipality: municipalities,
        ward: wards,
        street: streets,
        country: country,
      });
      if (useBasicInfoUpdate?.getState()?.verifySuccess) {
        localStorage.removeItem("isEdit");
        navigate("/profile");
      }
    } else {
      if (merchantProfileData?.contact_number || merchantProfileData?.merchant_email) {
        await verifyContact({ email, contact_number: phoneNumber, outlet: outletUUID }).then(() => {
          const { verifySuccess } = useCreateOutletProfile.getState();
          if (verifySuccess) {
            navigate("/kyc/pan/verify");
            setMerchantEmail("");
            setMerchantPhoneNumber("");
          }
        });
      } else {
        await verifyContact({ email, contact_number: phoneNumber, outlet: outletUUID });
        await updateMerchantProfile(
          { merchant_email: email, contact_number: phoneNumber, business_type: businessUUID, merchant_name: name },
          merchantProfileUUID
        );
        const { verifySuccess } = useCreateOutletProfile.getState();
        if (verifySuccess === true) {
          navigate("/kyc/pan/verify");
          setMerchantEmail("");
          setMerchantPhoneNumber("");
        }
      }
    }
  };

  // for validating the email as well as phone number
  useEffect(() => {
    const isEmailValidate = emailValidator(email as string);
    const isPhoneNumber = phoneValidator(phoneNumber as string);

    if (phoneNumber.includes("-")) {
      setErrorMessage("Invalid phone number");
      setIsDisabled(true);
    } else {
      setErrorMessage("");
      if (isEmailValidate && isPhoneNumber) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }
  }, [name, email, phoneNumber]);

  return (
    <KYCScreen
      onAction={() => navigate("/kyc/merchant/confirm-location")}
      title={t("YourBusinessInfoContact", { defaultValue: "How can we contact you?" })}
      footer={
        <>
          <ButtonPrimary disabled={isDisabled} onClick={handleOuletContactCreation} className="w-full" type="submit">
            {t("next", { defaultValue: "Create" })}
          </ButtonPrimary>
        </>
      }
    >
      <InputText
        label={t("merchantPhoneLabel", { defaultValue: "Contact Number" })}
        placeholder={t("merchantPhonePlaceholder", { defaultValue: "Contact Number" })}
        onChange={(phone) => setMerchantPhoneNumber(phone)}
        value={phoneNumber}
        errorMessage={errorMessage}
      ></InputText>
      <InputText
        label={t("merchantEmailLabel", { defaultValue: "Email" })}
        placeholder={t("merchantEmailPlaceholder", { defaultValue: "Email" })}
        onChange={(email) => setMerchantEmail(email)}
        value={email}
      ></InputText>
    </KYCScreen>
  );
};

export default KYCContact;
