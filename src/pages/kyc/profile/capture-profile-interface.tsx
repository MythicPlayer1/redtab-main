import { FC, useRef, useState } from "react";
import { KYCScreen } from "../../../components/KYCScreen";
import { useNavigate } from "react-router-dom";
import Selfiebg from "../pan/upload-id/images/pan-bg.png";
import CaptureIcon from "../pan/upload-id/images/capture-btn.svg";
import CheckCircle from "../pan/upload-id/images/CheckCircle.svg";
import { CameraType } from "../pan/upload-id/capture-pan-front";
import { Camera } from "react-camera-pro";
import { useOwnerStore } from "../../../store/owner-identity/use-owner-verification-store";
import { useSubmitOwnerDetail } from "../../../store/owner-identity/use-owner-details";
import { useOwnerInfoUpdate } from "../../../store/owner-identity/use-owner-edit";

export interface CaptureProfileInterfaceProps {}
const CaptureProfileInterface: FC<CaptureProfileInterfaceProps> = () => {
  const camera = useRef<CameraType>(null);
  const [image, setImage] = useState<string | null>(null);
  const { country, idFrontImage, idBackImage, setOwnerImage } = useOwnerStore();
  const navigate = useNavigate();
  const { verifyOwner } = useSubmitOwnerDetail();
  const editSelected = localStorage.getItem("isEdit");
  const { updateOwnerInfo } = useOwnerInfoUpdate();

  const handleCameraClick = () => {
    if (camera.current) {
      const photo = camera.current.takePhoto();
      setImage(photo as string);
      setOwnerImage(photo as string);
      navigate("/kyc/profile/verify", { state: { selfieImageUrl: photo } });
    }
  };

  const handleSkip = async () => {
    const outlet = localStorage.getItem("outlet-uuid-storage");
    const outletUUID = JSON.parse(outlet as string)?.state?.outletUUID;
    const owner_selfie = null;
    if (!country && !idFrontImage && !idBackImage && !owner_selfie) {
      navigate("/kyc/profile/review-success");
    } else {
      if (editSelected === "true") {
        await updateOwnerInfo(outletUUID, {
          country: country,
          id_front_image: idFrontImage,
          id_back_image: idBackImage,
          owner_image: owner_selfie,
        });
        if (useOwnerInfoUpdate?.getState().verifySuccess) {
          localStorage.removeItem("isEdit");
          navigate("/kyc/profile/review-success");
        }
      } else {
        await verifyOwner({
          country: country,
          id_front_image: idFrontImage,
          id_back_image: idBackImage,
          owner_image: owner_selfie,
          outlet: outletUUID,
        });
        if (useSubmitOwnerDetail?.getState().verifySuccess) {
          // resetState();
          navigate("/kyc/profile/review-success");
        }
      }
    }
  };

  return (
    <>
      <div className="relative">
        <div className="absolute w-full">
          <div className="bg-gradient-to-b from-[#4f3526] via-[#030303] to-[#000000] h-screen w-full absolute z-10 opacity-[0.99] backdrop-blur-md"></div>
          <img src={Selfiebg} alt="selfie-bg" className="w-full h-screen object-cover blur-md" />
        </div>
      </div>
      <KYCScreen
        className="relative opacity-100 z-50"
        color="color"
        onSkip={handleSkip}
        onAction={() => navigate("/kyc/pan/upload-back")}
        footer={
          <div className="h-[116px] w-full flex justify-center items-center">
            <img
              src={CaptureIcon}
              alt="capture_image"
              onClick={handleCameraClick}
              className="cursor-pointer h-[70px] w-[70px]"
            />
          </div>
        }
      >
        <div className="overflow-hidden w-[225.41px] h-[300px]  rounded-[184px] absolute top-[68px] left-1/2 transform -translate-x-1/2">
          <Camera
            ref={camera}
            errorMessages={{
              noCameraAccessible: "No camera device accessible",
              permissionDenied: "Permission denied. Please refresh and give camera permission.",
              switchCamera:
                "It is not possible to switch camera to different one because there is only one video device accessible",
              canvas: "Canvas is not supported",
            }}
          />
          {image && <img src={image} alt="pan_photo" className="w-[277.41px] h-[369px] rounded-[184px]" />}
        </div>
        <div className="w-[310.99px] h-[30px] absolute top-[394px] left-1/2 transform -translate-x-1/2">
          <p className="text-xl font-bold text-[#FFFFFF] text-center">Keep your face within the oval</p>
        </div>
        <div className="flex flex-col justify-between w-[326px] h-[86px] absolute top-[438px] left-1/2 transform -translate-x-1/2">
          <div className="w-full h-[38px]">
            <div className="flex flex-row justify-between w-full h-[38px]">
              <div className="h-[36px] w-[36px] flex justify-center items-center">
                <img src={CheckCircle} alt="check_image" />
              </div>
              <div className="w-[286px] h-[32px]">
                <p className="text-xs font-poppins font-normal text-[#FFFFFF]">
                  Faceforward and make sure your eyes are clearly visible
                </p>
              </div>
            </div>
          </div>
          <div className="w-full h-[38px]">
            <div className="flex flex-row justify-between w-full h-[38px]">
              <div className="h-[36px] w-[36px] flex justify-center items-center">
                <img src={CheckCircle} alt="check_image" />
              </div>
              <div className="w-[286px] h-[32px]">
                <p className="text-xs font-poppins font-normal text-[#FFFFFF]">
                  Remove anything that covers your face. Eyeglasses are okay
                </p>
              </div>
            </div>
          </div>
        </div>
      </KYCScreen>
    </>
  );
};

export default CaptureProfileInterface;
