import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { KYCScreen } from "../../../components/KYCScreen";
import { ButtonPrimary } from "../../../components/Button/ButtonPrimary";
import { InputText } from "../../../components/Input";

export interface OwnerInfoProps {}
const OwnerInfo: FC<OwnerInfoProps> = () => {
  const { t } = useTranslation("KYC");
  const navigate = useNavigate();
  return (
    <KYCScreen
      className="relative"
      onAction={() => navigate("")}
      title={t("verifyOwnerCompanyTitle", { defaultValue: "Confirm owner information" })}
      subTitle="We will use this information to verify owner ID, please check these information carefully."
      footer={
        <>
          <ButtonPrimary onClick={() => navigate("/kyc/profile/owner-info-review")} className="w-full" size={"medium"}>
            {t("next", { defaultValue: "Confirm" })}
          </ButtonPrimary>
        </>
      }
    >
      <div className="w-full">
        <InputText
          label={t("ownerInfoLabel", { defaultValue: "ownerInfo no" })}
          placeholder={t("ownerInfoPlaceholder", { defaultValue: "Information 1" })}
        ></InputText>
        <InputText
          label={t("ownerInfoLabel", { defaultValue: "ownerInfo no" })}
          placeholder={t("ownerInfoPlaceholder", { defaultValue: "Information 2" })}
        ></InputText>
        <InputText
          label={t("ownerInfoLabel", { defaultValue: "ownerInfo no" })}
          placeholder={t("ownerInfoPlaceholder", { defaultValue: "Information 3" })}
        ></InputText>
        <InputText
          label={t("ownerInfoLabel", { defaultValue: "ownerInfo no" })}
          placeholder={t("ownerInfoPlaceholder", { defaultValue: "Information 4" })}
        ></InputText>
        <InputText
          label={t("ownerInfoLabel", { defaultValue: "ownerInfo no" })}
          placeholder={t("ownerInfoPlaceholder", { defaultValue: "Information 5" })}
        ></InputText>
      </div>
    </KYCScreen>
  );
};

export default OwnerInfo;
