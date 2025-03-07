import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ModalLayout } from "../../../components/ModalLayout";
import { ButtonPrimary } from "../../../components/Button/ButtonPrimary";
import { useNavigate } from "react-router-dom";

import { usePhoneNumberStore } from "../../../store/phone-store/use-phone-store";
import { useStatusStore } from "../../../store/phone-store/use-phone-status-store";
import { usePhoneNumberOTPRequestStore } from "../../../store/phone-store/use-phone-otp-request";
import { usePhoneNumberOTPVerifyStore } from "../../../store/phone-store/use-phone-otp-verify";
import { usePrefixStore } from "../../../store/phone-store/use-prefix-store";
import Language from "../../../components/Language";
import PhoneNumberRoute from "../../../protected-routes/PhoneNumberRoute";

export interface InputOTPStepProps {}

interface InputOTPProps {
  value?: string;
  onChange?: (newValue: string) => void;
  disabled?: boolean;
}

const InputOTP: FC<InputOTPProps> = (props) => {
  return (
    <div className="flex items-center gap-4 w-full">
      <div className="flex items-center w-full">
        <input
          type="text"
          autoFocus
          value={`${props.value}`}
          onChange={(e) => props.onChange?.(`${e.target.value}`)}
          className="text-[1.5rem] placeholder:text-[#98A2B3] w-full focus:outline-none tracking-[.5rem]"
          placeholder="-----"
        />
        {/* <InputMask autoFocus mask="999 999" value={`${props.value}`} onChange={(e) => props.onChange?.(`${e.target.value}`)} className='text-[1.5rem] placeholder:text-[#98A2B3] border-none w-full' /> */}
      </div>
    </div>
  );
};

const InputOTPStep: FC<PropsWithChildren<InputOTPStepProps>> = () => {
 // const [counter, setCounter] = useState<number>(60);
  const { t } = useTranslation("InputOTPStep");
  const [otp, setOtp] = useState<string>("");

  const navigate = useNavigate();

  const { phoneNumber } = usePhoneNumberStore();
  const { prefix } = usePrefixStore();
  const { setStatus } = useStatusStore();
  const { phoneNumberOTPVerify, verifySuccess } = usePhoneNumberOTPVerifyStore();
  const { phoneNumberOTPRequest, isLoading } = usePhoneNumberOTPRequestStore();

  const initialCounter = Number(localStorage.getItem("counter")) || 60;
  const [counter, setCounter] = useState<number>(initialCounter);

 useEffect(() => {
    const interval = setInterval(() => {
      if (counter > 0) {
        setCounter((prevCounter) => {
          const newCounter = prevCounter - 1;
          localStorage.setItem("counter", newCounter.toString());
          return newCounter;
        });
      } else {
        clearInterval(interval);
        localStorage.removeItem("counter");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [counter]);
  
  useEffect(() => {
    if (verifySuccess) {
      navigate("/connect/phone/password");
    }
  }),
    [verifySuccess];

  const handleChangeOTP = async (_newOTP: string) => {
    const newOTP = `${_newOTP}`.replace(/[^\d]/, "").replace(/\s+/, "").replace(/_/, "");
    setOtp(newOTP);
    if (`${newOTP}`.length === 5) {
      phoneNumberOTPVerify(phoneNumber, newOTP, prefix);
    }
  };
  const handleChangePhone = () => {
    setStatus("check");
    navigate("/connect/phone");
  };
  return (
    <PhoneNumberRoute>
      <ModalLayout
        title={t("letGetStarted", { defaultValue: "Enter OTP code" })}
        subTitle={`${t("otpSent", { defaultValue: "We sent an OTP to " })} ${phoneNumber}`}
        footer={
          <>
            <button onClick={handleChangePhone} className="w-[244px] h-[44px] text-sm font-semibold text-[#EA4335]">
              {t("changePhone", { defaultValue: "Change number" })}
            </button>
            <ButtonPrimary
              isLoading={isLoading}
              disabled={counter > 0}
              className={counter > 0 ? "w-full text-primaryColor" : "w-full"}
              size="medium"
              onClick={() => {
                phoneNumberOTPRequest(phoneNumber, prefix);
                setCounter(60);
              }}
            >
              <span>Resend</span>
              {counter > 0 && ` in ${counter}...`}
            </ButtonPrimary>
          </>
        }
      >
        <Language />
        <InputOTP value={otp} onChange={handleChangeOTP} />
      </ModalLayout>
    </PhoneNumberRoute>
  );
};

export default InputOTPStep;
