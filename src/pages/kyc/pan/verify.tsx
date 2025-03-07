import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { KYCScreen } from "../../../components/KYCScreen";
import { ButtonPrimary } from "../../../components/Button/ButtonPrimary";
import { InputText } from "../../../components/Input";
import { InputImage } from "../../../components/Input/InputImage";
import { usePanVerificationInformationStore } from "../../../store/pan-verification-store/use-pan-verification-store";
import { useMerchantContactStore } from "../../../store/merchant-profile/use-merchant-contact-store";
import { useSubmitPanDetail } from "../../../store/pan-verification-store/use-submit-pan-detail";
import React from "react";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import { convertDateToNepali, futureDateValidator } from "../../../utils/useful-func";
import { useOutletInfoUpdate } from "../../../store/pan-verification-store/use-outlet-Info-edit";

export interface KYCPANVerifyProps {}

const KYCVerifyPAN: FC<KYCPANVerifyProps> = () => {
  const { t } = useTranslation("KYC");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    setPanNumber,
    setSelectedPanFile,
    panNumber,
    setIssueDate,
    issueDate,
    selectedPanFile,
    setImagePreviewURL,
    imagePreviewURL,
  } = usePanVerificationInformationStore();
  const { submitPanDetail, createIRDProfile } = useSubmitPanDetail();
  const { merchantProfile, name } = useMerchantContactStore();
  const outlet = localStorage.getItem("outlet-uuid-storage");
  const outletUUID = JSON.parse(outlet as string)?.state?.outletUUID;
  const [showDatePicker, setShowDatePicker] = React.useState<boolean>(false);
  const [, setMaxYear] = React.useState<number>(0);
  const [, setDateError] = React.useState<string>("");
  const editSelected = localStorage.getItem("isEdit");
  const { updatePanInfo } = useOutletInfoUpdate();
  const fileSizeLimitMB = parseFloat(import.meta.env.VITE_MAX_IMAGE_SIZE_MB || "1"); // read size in MB
  const fileSizeLimitBytes = fileSizeLimitMB * 1024 * 1024; //convert the size in bytes

  useEffect(() => {
    if (editSelected === "true") {
      setPanNumber(panNumber);
      setIssueDate(issueDate);
      setImagePreviewURL(imagePreviewURL);
    }
  }, [editSelected, panNumber, issueDate, imagePreviewURL]);

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleIdentityVerification = async () => {
    if (editSelected === "true") {
      await updatePanInfo(outletUUID, {
        pan_no: panNumber,
        issued_local_date: issueDate,
        pan_image: selectedPanFile ? await convertFileToBase64(selectedPanFile) : "",
        merchant_profile: merchantProfile,
        name: name,
        outlet: outletUUID,
      });
      const { verifySuccess } = useOutletInfoUpdate?.getState();
      if (verifySuccess === true) {
        localStorage.removeItem("isEdit");
        navigate("/profile");
      }
    } else {
      await submitPanDetail({
        pan_no: panNumber,
        issued_local_date: issueDate,
        pan_image: selectedPanFile ? await convertFileToBase64(selectedPanFile) : "",
        merchant_profile: merchantProfile,
        name: name,
        outlet: outletUUID,
      });
      //here the IRD profile will be hit and at last after the successfull verification the user will be redirected to the next page along with clearing the data
      const { verifySuccess } = useSubmitPanDetail?.getState();
      if (verifySuccess === true) {
        navigate("/kyc/pan/verify-company");
        setPanNumber("");
        setIssueDate("");
        setImagePreviewURL("");
      }
      await createIRDProfile({
        pan: panNumber,
        outlet: outletUUID,
      });
    }
  };

  const [isDisabled, setIsDisabled] = React.useState(true);

  useEffect(() => {
    const isdatevalid = futureDateValidator(issueDate);
    const nepaliTodayYear = convertDateToNepali();

    setMaxYear(nepaliTodayYear.year);
    if (panNumber && panNumber.length !== 9) {
      setIsDisabled(true);
      setErrorMessage("Invalid PAN number");
    } else if (
      panNumber &&
      isdatevalid === true &&
      imagePreviewURL &&
      selectedPanFile &&
      selectedPanFile.size <= fileSizeLimitBytes
    ) {
      setIsDisabled(false);
      setDateError("");
      setErrorMessage("");
    } else {
      setIsDisabled(true);
      setErrorMessage("");
    }
  }, [panNumber, issueDate, selectedPanFile, fileSizeLimitBytes]);

  //image handler function to handle the image upload
  const imageHandler = (imageSelected: File, imagePreview: string) => {
    setSelectedPanFile(imageSelected);
    setImagePreviewURL(imagePreview);
    //check the file size and if the uploaded file size is less than or equal to file size limit then the button will be enabled else disabled
    if (imageSelected.size <= fileSizeLimitBytes) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  return (
    <KYCScreen
      onAction={() => {
        navigate("/profile");
      }}
      title={t("verifyPANTitle", { defaultValue: "Verify your PAN information" })}
      footer={
        <>
          <ButtonPrimary
            disabled={isDisabled}
            onClick={() => {
              handleIdentityVerification();
            }}
            className="w-full"
          >
            {t("next", { defaultValue: "Continue" })}
          </ButtonPrimary>
        </>
      }
    >
      <InputText
        label={t("panNumberLabel", { defaultValue: "PAN Number" })}
        placeholder={t("panNumberPlaceholder", { defaultValue: "PAN Number" })}
        onChange={setPanNumber}
        value={panNumber}
        errorMessage={errorMessage}
      ></InputText>

      <div
        className="flex flex-col border-b border-b-[#EAECF0] focus-within:border-b-primaryColor py-2"
        onClick={() => {
          setShowDatePicker(true);
        }}
      >
        {!showDatePicker ? (
          <label
            className="font-normal font-poppins text-normal text-[#667085] "
            onClick={() => {
              setShowDatePicker(true);
            }}
          >
            PAN Issue Date
          </label>
        ) : (
          <div className="flex flex-col gap-1">
            <label htmlFor="date" className="text-xs text-[#98A2B3] font-normal  tracking-wide">
              PAN Issue date
            </label>
            <NepaliDatePicker
              inputClassName=" w-full focus:outline-none text-base text-[#667085] placeholder-[#667085]"
              className="w-full"
              value={issueDate}
              onChange={(value: string) => setIssueDate(value)}
            />
          </div>
        )}
      </div>

      <div className="text-[#475467] text-[0.875rem] mt-16 mb-4">
        Make sure the photo is bright enough, detailed enough, and not blown out or blurry.
      </div>

      <InputImage onChange={imageHandler} imagePreview={imagePreviewURL}>
        <div className="flex flex-col justify-center items-center">
          <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.69166 0C5.24388 0 4.16477 0.215622 3.06946 0.801398C2.09426 1.32294 1.32294 2.09426 0.801398 3.06946C0.215622 4.16477 0 5.24388 0 7.69166V14.3083C0 16.7561 0.215622 17.8352 0.801398 18.9305C1.32294 19.9057 2.09426 20.6771 3.06946 21.1986C4.16477 21.7844 5.24388 22 7.69166 22H11.5C12.0523 22 12.5 21.5523 12.5 21C12.5 20.4477 12.0523 20 11.5 20H7.69166C5.35671 20 4.67339 19.7883 4.01266 19.435C3.80888 19.326 3.62 19.2011 3.44634 19.0606L6.3885 16.1184C6.79367 15.7132 7.0557 15.4523 7.271 15.2694C7.47732 15.0942 7.57461 15.0497 7.62727 15.0324C7.82708 14.9671 8.0424 14.9663 8.24266 15.0303C8.29544 15.0472 8.39303 15.091 8.60057 15.2648C8.81713 15.4462 9.08097 15.7053 9.48894 16.1076L10.1017 16.712C10.493 17.0979 11.1224 17.0957 11.511 16.7071L15.011 13.2071C15.4016 12.8166 15.4016 12.1834 15.011 11.7929C14.6205 11.4024 13.9873 11.4024 13.5968 11.7929L10.799 14.5907C10.4543 14.2509 10.1539 13.957 9.88466 13.7315C9.58212 13.4781 9.25394 13.2538 8.85144 13.1252C8.25068 12.9332 7.60469 12.9355 7.00528 13.1316C6.60368 13.263 6.27707 13.4896 5.97629 13.7451C5.69142 13.987 5.37179 14.3067 5.00144 14.677L5.00142 14.6771L4.97429 14.7042L2.29911 17.3794C2.10823 16.8031 2 15.978 2 14.3083V7.69166C2 5.35671 2.21166 4.67339 2.56502 4.01266C2.90017 3.386 3.386 2.90017 4.01266 2.56502C4.67339 2.21166 5.35671 2 7.69166 2H14.3083C16.6433 2 17.3266 2.21166 17.9873 2.56502C18.614 2.90017 19.0998 3.386 19.435 4.01266C19.7883 4.67339 20 5.35671 20 7.69166V11.5C20 12.0523 20.4477 12.5 21 12.5C21.5523 12.5 22 12.0523 22 11.5V7.69166C22 5.24388 21.7844 4.16477 21.1986 3.06946C20.6771 2.09426 19.9057 1.32294 18.9305 0.801398C17.8352 0.215622 16.7561 0 14.3083 0H7.69166ZM7.5 9C8.32843 9 9 8.32843 9 7.5C9 6.67157 8.32843 6 7.5 6C6.67157 6 6 6.67157 6 7.5C6 8.32843 6.67157 9 7.5 9ZM18.9933 13.8834C18.9355 13.386 18.5128 13 18 13C17.4477 13 17 13.4477 17 14V17H14L13.8834 17.0067C13.386 17.0645 13 17.4872 13 18L13.0067 18.1166C13.0645 18.614 13.4872 19 14 19H17V22L17.0067 22.1166C17.0645 22.614 17.4872 23 18 23C18.5523 23 19 22.5523 19 22V19H22L22.1166 18.9933C22.614 18.9355 23 18.5128 23 18L22.9933 17.8834C22.9355 17.386 22.5128 17 22 17H19V14L18.9933 13.8834Z"
              fill="#EA4335"
            />
          </svg>

          <div className="mt-2 text-[0.875rem]">
            {t("kycUploadPANHint", { defaultValue: "Upload front side your PAN" })}
          </div>
        </div>
      </InputImage>
    </KYCScreen>
  );
};

export default KYCVerifyPAN;
