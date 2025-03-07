import { FC, useEffect, useState } from "react";
import { KYCScreen } from "../../../components/KYCScreen";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ButtonPrimary } from "../../../components/Button/ButtonPrimary";
import { InputText } from "../../../components/Input";
import { useMerchantContactStore } from "../../../store/merchant-profile/use-merchant-contact-store";
import { KYCFormStore } from "../../../store/kyc/kyc-info-store";
import {
  useCreateMerchantProfile,
  useMerchantProfile,
} from "../../../store/merchant-profile/use-create-merchant-profile";
import { usePhoneNumberStore } from "../../../store/phone-store/use-phone-store";
import { useEmailStore } from "../../../store/email-store/use-email-store";
import OutletSelectModals from "../../../components/main-profile/outlet-select-modals";
import { InputMerchantName } from "../../../components/kyc/shortcut-merchant-creation";
import { useSelectedOutletUuidStore } from "../../../store/merchant-profile/use-merchant-profile-outlet-store";
import { useLoginStatusStore } from "../../../store/login-status-store/use-login-status-store";

export interface KYCNameProps {}

const KYCName: FC<KYCNameProps> = () => {
  const { t } = useTranslation("KYC");
  const { phoneNumber, merchantOrStaff } = usePhoneNumberStore();
  const { email } = useEmailStore();
  const navigate = useNavigate();
  const [edit, setEdit] = useState<string>("");
  const [name, setName] = useState<string>();
  const [email1] = useState<string>(email);
  const [phoneNumber1] = useState<string>(phoneNumber);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const { setMerchantName, merchantUpdateStatus, setMerchantUpdateStatus } = useMerchantContactStore();
  const { setMerchantNames } = KYCFormStore();
  const {} = useCreateMerchantProfile();
  const [open, setOpen] = useState<boolean>(false);
  const { selectedOutletName, setSelectedOutletName } = useSelectedOutletUuidStore();
  const { updateMerchantProfile } = useCreateMerchantProfile();
  const { merchantProfileUUID } = useMerchantProfile();
  const { setUpdateMerchantName } = useLoginStatusStore();

  const style: React.CSSProperties = {
    top: "0",
  };
  const styles: React.CSSProperties = {
    background: "transparent",
  };

  useEffect(() => {
    const editSelected = localStorage.getItem("isEdit");
    setEdit(editSelected as string);
  }, []);

  //for creating the merchant profile and navigating to the next page on successful response
  const handleMerchantName = async () => {
    if (name) {
      setMerchantName(name);
      setMerchantNames(name);
      localStorage.setItem("toastStatus", "true");
      const getStatus = localStorage.getItem("status");
      if (getStatus === "true" || (merchantUpdateStatus === true && merchantOrStaff === "merchant")) {
        setUpdateMerchantName(name);
        await updateMerchantProfile({ merchant_name: name }, merchantProfileUUID);
        if (useCreateMerchantProfile?.getState()?.verifySuccess === true) {
          localStorage.removeItem("status");
          setMerchantUpdateStatus(false);
          localStorage.setItem("outlethandle", "true");
          navigate("/kyc/select-biz-type");
        }
      } else if (edit) {
        setSelectedOutletName(name);
        navigate("/kyc/select-biz-type");
      } else {
        navigate("/kyc/select-biz-type");
      }
    }
  };

  //email, phone, name validation
  useEffect(() => {
    if (!name) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [name, email1, phoneNumber1]);

  //set the selected outlet name, email or phone to the input field
  useEffect(() => {
    const getStatus = localStorage.getItem("status");
    const edit = localStorage.getItem("isEdit");

    if (getStatus && !name) {
      if (selectedOutletName) {
        setName(selectedOutletName);
      }
    } else if (merchantUpdateStatus && !name) {
      if (email) {
        setName(email);
      } else {
        setName(phoneNumber);
      }
    } else if (edit === "true" && merchantUpdateStatus === false) {
      if (selectedOutletName) {
        setName(selectedOutletName);
      }
    }
  }, [selectedOutletName, merchantUpdateStatus]);

  return (
    <KYCScreen
      onAction={() => {
        navigate("/profile");
      }}
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
        label={t("merchantNameLabel", { defaultValue: "Merchant name" })}
        placeholder={t("merchantNamePlaceholder", { defaultValue: "Merchant's name" })}
        value={name}
        onChange={setName}
        onClick={() => setOpen(true)}
      ></InputText>

      <OutletSelectModals
        open={open}
        onClose={() => setOpen(false)}
        dialogStyle={style}
        styles={styles}
        hideDialogHeader={true}
      >
        <InputMerchantName onClose={() => setOpen(false)} onChange={setName} textValue={name} />
      </OutletSelectModals>
    </KYCScreen>
  );
};

export default KYCName;
