import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { KYCScreen } from "../../../components/KYCScreen";
import { ButtonPrimary } from "../../../components/Button/ButtonPrimary";
import  Cross  from "../pan/upload-id/images/wrong-icon.svg";

export interface ProfileReviewResultProps {}
const ProfileReviewResult: FC<ProfileReviewResultProps> = () => {
  const { t } = useTranslation("KYC");
  const navigate = useNavigate();
  return (
    <KYCScreen
      className="relative"
      onSkip={() => navigate("")}
      onAction={() => navigate("")}
      title={t("verifyOwnerCompanyTitle", { defaultValue: "Result of your selfie" })}
      footer={
        <>
          <ButtonPrimary onClick={() => navigate("")} className="w-full" size={'medium'}>
            {t("next", { defaultValue: "Upload photo" })}
          </ButtonPrimary>
        </>
      }
    >
      <div className="h-auto absolute top-[178px] left-1/2 transform -translate-x-1/2">
        <div className="w-[170.77px] h-[221px] bg-[#D9D9D9] rounded-[184px] mx-auto"></div>
        <div className="flex flex-col justify-between w-[326px] h-[88px] mt-[42px]">
          <div className="flex flex-row justify-between w-full h-[38px] bg-[white]">
            <div className="h-[36px] w-[36px] flex justify-center items-center">
              <img src={Cross} alt="check_image" />
            </div>
            <div className="w-[286px] h-[32px]">
              <p className="text-xs font-poppins font-normal text-[#475467]">Faceforward and make sure your eyes are clearly visible</p>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full h-[38px] bg-[white]">
            <div className="h-[36px] w-[36px] flex justify-center items-center">
              <img src={Cross} alt="check_image"/>
            </div>
            <div className="w-[286px] h-[32px]">
              <p className="text-xs font-poppins font-normal text-[#475467]">Remove anything that covers your face. Eyeglasses are okay</p>
            </div>
          </div>
        </div>
      </div>
    </KYCScreen>
  );
};

export default ProfileReviewResult;
