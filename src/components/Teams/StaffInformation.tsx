import React, { useState, useEffect } from "react";
import { ButtonPrimary } from "../Button/ButtonPrimary";
import LeftArrowButton from "../Button/LeftArrowButton";
import { useStaffCreateStore } from "../../store/team-store/use-staff-information-store";
import { useNavigate } from "react-router-dom";
import { phoneValidator } from "../../utils/useful-func";
import { InputText } from "../Input";
import { t } from "i18next";
import { useCreateStaffDetail } from "../../store/team-store/use-staff-creation";
import { useHandlePhoneNumberCheckStore } from "../../store/phone-store/use-phone-check-store";
import { toast } from "react-toastify";

const StaffInformation: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const { setPhoneNo, setfullName } = useStaffCreateStore();
  const { setStaffName, setStaffPhone } = useCreateStaffDetail();
  const { handlePhoneNumberCheck } = useHandlePhoneNumberCheckStore();

  useEffect(() => {
    const isPhoneValidate = phoneValidator(phone);
    if (name.length > 3 && isPhoneValidate) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [name, phone]);

  const handleButtonClick = async () => {
    setPhoneNo(phone);
    setfullName(name);
    setStaffName(name);
    setStaffPhone(phone);
    await handlePhoneNumberCheck(phone);
    if (useHandlePhoneNumberCheckStore?.getState()?.message) {
      toast.error(useHandlePhoneNumberCheckStore?.getState()?.message);
    } else {
      navigate("/staff-username-information");
    }
  };

  const handlePhoneChange = (newValue: string) => {
    // Allow only digits
    if (/^\d*$/.test(newValue)) {
      setPhone(newValue);
    }
  };

  return (
    <div className="w-full h-auto p-5">
      <div className="flex items-center justify-between">
        <LeftArrowButton to="/manage-staffs" />
      </div>
      <div className="">
        <h1 className="text-[28px] pt-5 font-semibold font-poppins w-[268px] md:w-auto">Enter Member information</h1>
      </div>
      <div className="mt-10 space-y-8">
        <InputText
          label={t("staffNameLabel", { defaultValue: "Member name" })}
          placeholder={t("staffNamePlaceholder", { defaultValue: "Member name" })}
          value={name}
          onChange={setName}
        ></InputText>
        <InputText
          label={t("staffPhoneNumberLabel", { defaultValue: "Member Phone number" })}
          placeholder={t("staffPhoneNumberPlaceholder", { defaultValue: "Member Phone number" })}
          value={phone}
          onChange={handlePhoneChange}
        ></InputText>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-5">
        <ButtonPrimary className="w-full" size="large" disabled={isButtonDisabled} onClick={handleButtonClick}>
          {"Continue"}
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default StaffInformation;
