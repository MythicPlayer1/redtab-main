import React from "react";
import LeftArrowButton from "../Button/LeftArrowButton";
import { ButtonPrimary } from "../Button/ButtonPrimary";
import { useStaffUuidStore } from "../../store/team-store/use-staff-list-store";
import { useEditStaffUsername } from "../../store/team-store/use-staff-username-edit";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { InputPin } from "../Input/InputPin";
import { useVerifyPassword } from "../../store/team-store/use-verify-password";

const StaffUsernameChange = () => {
  const navigate = useNavigate();
  const [staffPin, setStaffPin] = React.useState<string>("");
  const [confirmStaffPin, setConfirmStaffPin] = React.useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = React.useState<boolean>(true);
  const { selectedStaffId } = useStaffUuidStore();
  const { editStaffUsername } = useEditStaffUsername();
  const { setVerifySuccess} = useVerifyPassword.getState();

  // To handle the pin change
  const handlePinChange = (newValue: string) => {
    if (/^\d{0,4}$/.test(newValue)) {
    setStaffPin(newValue || '');
    }
  };

  // To handle the confirm pin change
  const handleConfirmPinChange = (newValue: string) => {
    if (/^\d{0,4}$/.test(newValue)) {
    setConfirmStaffPin(newValue || '');
    }
  };

  // To hit team member pin code edit API
  const handleUsernameUpdate = async () => {
    if (selectedStaffId) {
      await editStaffUsername(selectedStaffId, { pin: staffPin, confirm_pin: confirmStaffPin });
      if (useEditStaffUsername?.getState().verifySuccess) {
        navigate("/manage-staffs");
      }
    }
  };

  // set verify success false
  React.useEffect(() => {
    setVerifySuccess(false);
  }, [ setVerifySuccess])

  // To disable the button
  React.useEffect(() => {
    if (staffPin.length > 3 && confirmStaffPin.length > 3 && staffPin === confirmStaffPin) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [staffPin, confirmStaffPin]);

  return (
      <div className="w-full h-auto p-5">
        <div className="flex items-center justify-between">
          <LeftArrowButton to="/staff-information" />
        </div>
        <div className="pt-5">
          <h1 className="text-[28px] font-semibold font-poppins w-[301px] md:w-auto">Change your member PIN code </h1>
          <p className="text-justify mt-0.5 text-sm font-normal font-poppins text-secondaryColorTextBtn">
            This PIN code will be used by your member to log-in
          </p>
        </div>
        <div className="staff-pin space-y-8 mt-10">
          <InputPin
            label={t("staffPinCodeLabel", { defaultValue: "Enter new PIN code" })}
            placeholder={t("staffPinCodePlaceholder", { defaultValue: "Enter new PIN code" })}
            value={staffPin}
            onChange={handlePinChange}
          ></InputPin>
          <InputPin
            label={t("staffPinCodeLabel", { defaultValue: "Re-enter new PIN code" })}
            placeholder={t("staffPinCodePlaceholder", { defaultValue: "Re-enter new PIN code" })}
            value={confirmStaffPin}
            onChange={handleConfirmPinChange}
          ></InputPin>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-5">
          <ButtonPrimary className="w-full" size="large" disabled={isButtonDisabled} onClick={handleUsernameUpdate}>
            {"Continue"}
          </ButtonPrimary>
        </div>
      </div>
  );
};

export default StaffUsernameChange;
