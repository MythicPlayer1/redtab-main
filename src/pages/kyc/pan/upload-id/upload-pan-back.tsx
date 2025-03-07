import { FC } from "react";
import { KYCScreen } from "../../../../components/KYCScreen";
import { ButtonPrimary } from "../../../../components/Button/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PanBg from "./images/pan-bg.png";
import CheckCircle from "./images/CheckCircle.svg";
import { useOwnerStore } from "../../../../store/owner-identity/use-owner-verification-store";


export interface KYCUploadPanBackProps {}
const KYCUploadPanBack: FC<KYCUploadPanBackProps> = () => {
  const { t } = useTranslation("KYC");
  const navigate = useNavigate();
  const { idBackImage } = useOwnerStore();
 
  return (
    <div className="h-screen w-auto">
     <KYCScreen
     className="relative"
      onSkip={() => navigate('/kyc/pan/review-success')}
      onAction={() => navigate("/kyc/pan/capture-back")}
      title={t("verifyOwnerCompanyTitle", { defaultValue: "Check your photo" })}
      subTitle="Make sure that your photo is good."
      footer={
        <>
          <ButtonPrimary onClick={() => navigate("/kyc/pan/review")} className="w-full"  size={'medium'}>
            {t("next", { defaultValue: "Upload photo" })}
          </ButtonPrimary>
        </>
      }
    >
      <div className="w-[328px] h-[232px] absolute left-[50%] top-[186px] transform -translate-x-1/2">
        <img src={PanBg} alt="pan_bg" className="w-[328px] h-[232px] object-cover relative rounded-[20px]" />
        <div className="w-[289px] h-[185px] bg-[black] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img src={idBackImage || ''} alt="pan_photo" className="text-white" />
        </div>
      </div>
      <div className="w-[332px] h-[36px] flex items-center absolute top-[445px] left-1/2 transform -translate-x-1/2">
        <div className="h-[36px] w-[36px] flex items-center">
          <div className="h-[24px] w-[24px] flex items-center justify-center">
            <img src={CheckCircle} alt="check-circle" className="h-[19.5px] w-[19.5px]" />
          </div>
        </div>
        <div className="w-[292px] h-[32px] flex items-center">
          <p className="text-[12px] font-poppins font-normal text-[#1D2939]">
            Make sure the photo is bright enough, detailed enough, and not blown out or blurry.
          </p>
        </div>
      </div>
      <div className="w-[244px] h-[44px] flex justify-center items-center absolute left-1/2 bottom-[70px] transform -translate-x-1/2">
        <p
          className="w-[95px] h-[20px] text-[14px] font-poppins font-semibold text-[#EA4335] cursor-pointer"
          onClick={() => navigate("/kyc/pan/capture-back")}
        >
          Retake Photo
        </p>
      </div>
    </KYCScreen>
    </div>
  );
};

export default KYCUploadPanBack;

