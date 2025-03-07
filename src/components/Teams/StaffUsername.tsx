import React from "react";
import LeftArrowButton from "../Button/LeftArrowButton";
import { ButtonPrimary } from "../Button/ButtonPrimary";
import { SMSModal } from "../PopUpModal";
import { useStaffCreateStore } from "../../store/team-store/use-staff-information-store";
import { useCreateStaffDetail } from "../../store/team-store/use-staff-creation";
import { t } from "i18next";
import { useSelectedOutletUuidStore } from "../../store/merchant-profile/use-merchant-profile-outlet-store";
import { useNavigate } from "react-router-dom";
import { InputPin } from "../Input/InputPin";
import { useStaffUuidStore } from "../../store/team-store/use-staff-list-store";

const StaffUsername = () => {
  const navigate= useNavigate();
  const [staffPin, setStaffPin] = React.useState<string>("");
  const [confirmStaffPin, setConfirmStaffPin] = React.useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = React.useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const { fullName, phoneNo, pin, confirmPin, setPin,  setConfirmPin } = useStaffCreateStore();
  const { createStaff } = useCreateStaffDetail();
  const { selectedOutletId } = useSelectedOutletUuidStore();
  const { setSelectedStaffId } = useStaffUuidStore();
  const staffUuid = sessionStorage.getItem('staffUuid');
 

  const handleCreateStaff = async () => {
    await createStaff({
      auth_user: {phone: phoneNo, pin: pin, confirm_pin: confirmPin},
      full_name: fullName,
      outlet: selectedOutletId,
    });
    if (useCreateStaffDetail?.getState().verifySuccess) {
      setIsModalVisible(true);
    }
  };

  // To disable the button
  React.useEffect(() => {
    if (staffPin.length > 3 && confirmStaffPin.length > 3 && staffPin === confirmStaffPin) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [staffPin, confirmStaffPin]);

  const handleHide = () => {
    setIsModalVisible(false);
  };

  const handlePinChange = (newValue: string) => {
  if (/^\d{0,4}$/.test(newValue)) {
    setStaffPin(newValue);
    setPin(newValue);
  }
  };

  const handleConfirmPinChange = (newValue: string) => {
  if (/^\d{0,4}$/.test(newValue)) {
    setConfirmPin(newValue);
    setConfirmStaffPin(newValue);
  }
  };

  const handlePermission = () => {
    if(staffUuid){
      setSelectedStaffId(staffUuid);
    }
    navigate('/permission-access')
  }

  return (
    <>
      <div className="w-full p-5">
        <div className="flex items-center justify-between">
          <LeftArrowButton to="/staff-information" />
        </div>
        <div className="pt-5">
          <h1 className="text-[28px] font-semibold font-poppins w-[301px] md:w-auto">Set up PIN code for your member</h1>
          <p className="text-justify mt-0.5 text-sm font-normal font-poppins text-[#667085]">
            This PIN code will be used by your member to log-in
          </p>
        </div>
        <div className="staff-pin space-y-8 mt-10">
          <InputPin
            label={t("staffPinCodeLabel", { defaultValue: "Enter PIN code" })}
            placeholder={t("staffPinCodePlaceholder", { defaultValue: "Enter PIN code" })}
            value={staffPin}
            onChange={handlePinChange}
          ></InputPin>
          <InputPin
            label={t("staffPinCodeLabel", { defaultValue: "Re-enter PIN code" })}
            placeholder={t("staffPinCodePlaceholder", { defaultValue: "Re-enter PIN code" })}
            value={confirmStaffPin}
            onChange={handleConfirmPinChange}
          ></InputPin>
        </div>
        <div className="fixed bottom-0 left-0 right-0 p-5">
          <ButtonPrimary className="w-full" size="large" disabled={isButtonDisabled} onClick={handleCreateStaff}>
            {"Continue"}
          </ButtonPrimary>
          {/* <StaffModal /> */}
        </div>
        {useCreateStaffDetail?.getState().verifySuccess && isModalVisible && (
          <div className="fixed bottom-0 h-screen  left-0 right-0 z-50 black-trans" onClick={handleHide}>
            <SMSModal handleHide={handleHide} handleClick={handlePermission} />
          </div>
        )}
      </div>
    </>
  );
};

export default StaffUsername;
