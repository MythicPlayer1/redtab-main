import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { KYCScreen } from "../../../components/KYCScreen";
import { ButtonPrimary } from "../../../components/Button/ButtonPrimary";
import CheckCircle from "../pan/upload-id/images/CheckCircle.svg";
import { useOwnerStore } from "../../../store/owner-identity/use-owner-verification-store";
import { useSubmitOwnerDetail } from "../../../store/owner-identity/use-owner-details";
import { useOwnerInfoUpdate } from "../../../store/owner-identity/use-owner-edit";

export interface ProfileVerifyProps {}
const ProfileVerify: FC<ProfileVerifyProps> = () => {
  const { t } = useTranslation("KYC");
  const navigate = useNavigate();
  const { country, idFrontImage, idBackImage, ownerImage } = useOwnerStore();
  const { verifyOwner } = useSubmitOwnerDetail();
  const editSelected = localStorage.getItem("isEdit");
  const { updateOwnerInfo } = useOwnerInfoUpdate();

  const handleUpload = async () => {
    const outlet = localStorage.getItem("outlet-uuid-storage");
    const outletUUID = JSON.parse(outlet as string)?.state?.outletUUID;

    if (editSelected === "true") {
      await updateOwnerInfo(outletUUID, {
        country: country,
        id_front_image: idFrontImage,
        id_back_image: idBackImage,
        owner_image: ownerImage,
      });
      if (useOwnerInfoUpdate?.getState().verifySuccess) {
        localStorage.removeItem("isEdit");
        navigate("/kyc/profile/review");
      }
    } else {
      await verifyOwner({
        country: country,
        id_front_image: idFrontImage,
        id_back_image: idBackImage,
        owner_image: ownerImage,
        outlet: outletUUID,
      });
      if (useSubmitOwnerDetail?.getState().verifySuccess) {
        // resetState();
        navigate("/kyc/profile/review");
      }
    }
  };
  return (
    <KYCScreen
      className="relative"
      onSkip={() => navigate("/kyc/profile/review-success")}
      onAction={() => navigate("/kyc/profile/interface")}
      title={t("verifyOwnerCompanyTitle", { defaultValue: "Check your selfie" })}
      subTitle="Make sure that your photo is good."
      footer={
        <>
          <ButtonPrimary onClick={handleUpload} className="w-full" size={"medium"}>
            {t("next", { defaultValue: "Upload photo" })}
          </ButtonPrimary>
        </>
      }
    >
      <div className="h-auto absolute top-[178px] left-1/2 transform -translate-x-1/2">
        <img src={ownerImage || ""} alt="selfie_image" className="w-[170.77px] h-[221px] rounded-[184px] mx-auto" />
        <div className="flex flex-col justify-between w-[326px] h-[88px] mt-[42px]">
          <div className="flex flex-row justify-between w-full h-[38px] bg-[white]">
            <div className="h-[36px] w-[36px] flex justify-center items-center">
              <img src={CheckCircle} alt="check_image" />
            </div>
            <div className="w-[286px] h-[32px]">
              <p className="text-xs font-poppins font-normal text-[#475467]">
                Faceforward and make sure your eyes are clearly visible
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full h-[38px] bg-[white]">
            <div className="h-[36px] w-[36px] flex justify-center items-center">
              <img src={CheckCircle} alt="check_image" />
            </div>
            <div className="w-[286px] h-[32px]">
              <p className="text-xs font-poppins font-normal text-[#475467]">
                Remove anything that covers your face. Eyeglasses are okay
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[244px] h-[44px] flex justify-center items-center absolute left-1/2 bottom-[70px] transform -translate-x-1/2">
        <p
          className="w-[95px] h-[20px] text-[14px] font-poppins font-semibold text-[#EA4335] cursor-pointer"
          onClick={() => navigate("/kyc/profile/interface")}
        >
          Retake Photo
        </p>
      </div>
    </KYCScreen>
  );
};

export default ProfileVerify;
