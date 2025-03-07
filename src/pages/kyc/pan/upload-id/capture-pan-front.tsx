import { FC, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera } from "react-camera-pro";
import { KYCScreen } from "../../../../components/KYCScreen";
import CaptureIcon from "./images/capture-btn.svg";
import PanBg from "./images/pan-bg.png";
import { useOwnerStore } from "../../../../store/owner-identity/use-owner-verification-store";

export declare type FacingMode = "user" | "environment";
export declare type SetPermissionDenied = React.Dispatch<React.SetStateAction<boolean>>;

export interface CameraProps {
  facingMode?: FacingMode;
  numberOfCamerasCallback?(numberOfCameras: number): void;
  errorMessages: {
    noCameraAccessible?: string;
    permissionDenied?: string;
    switchCamera?: string;
    canvas?: string;
  };
}

export declare type CameraType = React.ForwardRefExoticComponent<CameraProps & React.RefAttributes<unknown>> & {
  takePhoto(type?: "base64url" | "imgData"): string | ImageData;
  switchCamera(): FacingMode;
  getNumberOfCameras(): number;
};
export interface KYCPANFrontPhotoProps {}

const KYCPANFrontPhoto: FC<KYCPANFrontPhotoProps> = () => {
  const camera = useRef<CameraType>(null);
  const [image, setImage] = useState<string | null>(null);
  const { setIdFrontImage } = useOwnerStore();
  const navigate = useNavigate();

  const handleCameraClick = () => {
    if (camera.current) {
      const photo = camera.current.takePhoto();
      setImage(photo as string);
      setIdFrontImage(photo as string);
      navigate("/kyc/pan/upload-front");
    }
  };

  return (
    <>
      <div
        className="w-full h-screen absolute left-0"
        style={{
          background: "linear-gradient(2deg, #170d0b 11%, #543534 38%, #26344d 75%)",
        }}
      ></div>
      <KYCScreen
        color="color"
        className="relative"
        onAction={() => navigate("/kyc/pan/verify-owner")}
        onSkip={() => navigate("/kyc/pan/capture-back")}
        footer={
          <div className="h-[116px] w-full flex justify-center items-center">
            <img src={CaptureIcon} alt="capture_image" onClick={handleCameraClick} className="cursor-pointer" />
          </div>
        }
      >
        <div className="w-fit">
          <p className="w-[329px] h-[60px] text-[#ffffff] text-xl text-center font-poppins font-bold leading-[30px] absolute left-1/2 top-[179px] transform -translate-x-1/2">
            Position of the front of your document in the frame
          </p>
          <div className="w-[328px] h-[232px] absolute left-[50%] top-[272px] transform -translate-x-1/2">
            <img src={PanBg} alt="pan_bg" className="w-[328px] h-[232px] object-cover relative rounded-[20px]" />
            <div className="w-[289px] h-[185px] bg-[#000000] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
              {image && <img src={image} alt="pan_photo" />}
            </div>
          </div>
        </div>
      </KYCScreen>
    </>
  );
};

export default KYCPANFrontPhoto;
