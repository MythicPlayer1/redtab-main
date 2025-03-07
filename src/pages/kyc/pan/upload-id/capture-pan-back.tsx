import { FC, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { KYCScreen } from "../../../../components/KYCScreen";
import CaptureIcon from "./images/capture-btn.svg";
import PanBg from "./images/pan-bg.png";
import { Camera } from "react-camera-pro";
import { CameraType } from "./capture-pan-front";
import { useOwnerStore } from "../../../../store/owner-identity/use-owner-verification-store";

export interface KYCPANBackPhotoProps {}

const KYCPANBackPhoto: FC<KYCPANBackPhotoProps> = () => {
  const camera = useRef<CameraType>(null);
  const [image, setImage] = useState<string | null>(null);
  const { setIdBackImage } = useOwnerStore();
  const navigate = useNavigate();

  const handleCameraClick = () => {
    if (camera.current) {
      const photo = camera.current.takePhoto();
      setImage(photo as string);
      setIdBackImage(photo as string);
      navigate("/kyc/pan/upload-back");
    }
  };
  return (
    <>
      <div
        className="w-full h-screen absolute left-0 "
        style={{
          background: "linear-gradient(2deg, #170d0b 11%, #543534 38%, #26344d 75%)",
        }}
      ></div>
      <KYCScreen
        color="color"
        className="relative"
        onAction={() => navigate("/kyc/pan/upload-front")}
        onSkip={() => navigate("/kyc/pan/review-success")}
        footer={
          <div className="h-[116px] w-full flex justify-center items-center">
            <img src={CaptureIcon} alt="capture_image" onClick={handleCameraClick} className="cursor-pointer"/>
          </div>
        }
      >
        <div className="w-fit">
          <p className="w-[329px] h-[60px] text-[#ffffff] text-xl text-center font-poppins font-bold leading-[30px] absolute left-1/2 top-[179px] transform -translate-x-1/2">
            Position of the back of your document in the frame
          </p>
          <div className="w-[328px] h-[232px] absolute left-[50%] top-[272px] transform -translate-x-1/2">
            <img src={PanBg} alt="pan_bg" className="w-[328px] h-[232px] object-cover relative rounded-[20px]" />
            <div className="w-[289px] h-[185px] bg-[#000] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Camera
                ref={camera}
                facingMode="environment"
                errorMessages={{
                  noCameraAccessible: "No camera device accessible",
                  permissionDenied: "Permission denied. Please refresh and give camera permission.",
                  switchCamera:
                    "It is not possible to switch camera to different one because there is only one video device accessible",
                  canvas: "Canvas is not supported",
                }}
              />
              <div>{image && <img src={image} alt="pan_photo" />}</div>
            </div>
          </div>
        </div>
      </KYCScreen>
    </>
  );
};

export default KYCPANBackPhoto;
