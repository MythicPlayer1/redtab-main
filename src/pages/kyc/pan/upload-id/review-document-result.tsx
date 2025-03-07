import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { KYCScreen } from "../../../../components/KYCScreen";
import { ButtonPrimary } from "../../../../components/Button/ButtonPrimary";
import PanBg from "./images/pan-bg.png";
import PanPhoto from "./images/pan-front.png";
import Correct from "./images/↳ correct-icon.svg";
import Wrong from "./images/wrong-icon.svg";

export interface ReviewDocumentResultProps {}
const ReviewDocumentResult: FC<ReviewDocumentResultProps> = () => {
  const { t } = useTranslation("KYC");
  const navigate = useNavigate();
  return (
    <KYCScreen
      onSkip={() => navigate("")}
      onAction={() => navigate("/kyc/pan/capture-back")}
      title={t("verifyOwnerCompanyTitle", { defaultValue: "Result of document photo" })}
      footer={
        <ButtonPrimary onClick={() => navigate("")} className="w-full"  size={'medium'}>
          {t("next", { defaultValue: "Upload photo" })}
        </ButtonPrimary>
      }
    >
      <div className="flex flex-col gap-[21px]">
        <div className="min-w-[328px] min-h-[206px] bg-[#F5F6F7] rounded-[24px] relative">
          <div className="flex flex-col justify-between w-[191px] h-[167.1px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex justify-center items-center space-x-2">
              <p className="text-sm font-normal font-poppins">Front side</p>
              <div className="w-[23px] h-[23px] flex justify-center items-center">
                <img src={Correct} alt="tick_img" />
              </div>
            </div>
            <div className="relative">
              <img src={PanBg} alt="pan_bg" className="w-[191px] h-[135.1px] object-cover rounded-[20px]" />
              <div className="w-[168.29px] h-[107.73px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img src={PanPhoto} alt="pan_photo" />
              </div>
            </div>
          </div>
        </div>
        <div className="min-w-[328px] min-h-[218px] bg-[#F5F6F7] rounded-[24px] relative">
          <div className="flex flex-col justify-between w-[191px] h-[167.1px] absolute top-[13.45px] left-1/2 transform -translate-x-1/2">
            <div className="flex justify-center space-x-2">
              <p>Back side</p>
              <img src={Wrong} alt="tick_img" />
            </div>
            <div className="relative">
              <img src={PanBg} alt="pan_bg" className="w-[191px] h-[135.1px] object-cover rounded-[20px]" />
              <div className="w-[168.29px] h-[107.73px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img src={PanPhoto} alt="pan_photo" />
              </div>
            </div>
          </div>
          <p className="absolute top-[187px] left-1/2 transform -translate-x-1/2 text-center text-[#C7322D] text-sm font-semibold font-poppins">
            Photo too blurry
          </p>
        </div>
      </div>
    </KYCScreen>
  );
};

export default ReviewDocumentResult;
