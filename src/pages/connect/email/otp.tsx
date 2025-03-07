import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ModalLayout } from "../../../components/ModalLayout";
import { ButtonPrimary } from "../../../components/Button/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import { useEmailStore } from "../../../store/email-store/use-email-store";
import { useEmailOTPVerifyStore } from "../../../store/email-store/use-email-otp-verify";
import { useEmailOTPRequestStore } from "../../../store/email-store/use-email-otp-request";
import { useStatusStore } from "../../../store/email-store/use-status-store";
import Language from "../../../components/Language";
import EmailProtectedRoute from "../../../protected-routes/EmailProtectedRoute";

export interface SignupOTPStepProps {}

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
          placeholder="-----"
          className="text-[1.5rem] placeholder:text-[#98A2B3] w-full focus:outline-none tracking-[.5rem]"
        />
        {/* <InputMask autoFocus mask="999 999" value={`${props.value}`} onChange={(e) => props.onChange?.(`${e.target.value}`)} className='text-[1.5rem] placeholder:text-[#98A2B3] border-none w-full' /> */}
      </div>
    </div>
  );
};

const SignupOTPStep: FC<PropsWithChildren<SignupOTPStepProps>> = () => {
  // const [counter, setCounter] = useState<number>(60);
  const { t } = useTranslation("SignupOTPStep");
  const [otp, setOtp] = useState<string>("");
  const navigate = useNavigate();

  const { email } = useEmailStore();
  const { setStatus } = useStatusStore();
  const { emailOPTVerify, verifySuccess } = useEmailOTPVerifyStore();
  const { emailOPTRequest, isLoading } = useEmailOTPRequestStore();

  const initialCounter = Number(localStorage.getItem("counter")) || 60;
  const [counter, setCounter] = useState<number>(initialCounter);
  // setting the counter values to local storage
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
      navigate("/connect/email/password");
    }
  }),
    [verifySuccess];

  const handleChangeOTP = async (_newOTP: string) => {
    const newOTP = `${_newOTP}`.replace(/[^\d]/, "").replace(/\s+/, "").replace(/_/, "");
    setOtp(newOTP);
    if (`${newOTP}`.length === 5) {
      emailOPTVerify(email, newOTP);
    }
  };

  const handleChangeEmail = () => {
    setStatus("check");
    navigate("/connect/email");
  };

  return (
    <EmailProtectedRoute>
      <ModalLayout
        title={t("letGetStarted", { defaultValue: "Enter OTP code" })}
        subTitle={`${t("otpSent", { defaultValue: "We sent an OTP to " })} ${email}`}
        footer={
          <>
            {/* <>
              <ButtonPrimary disabled className="w-full" size="large" onClick={() => console.log("Verify-OTP")}>
                {t("verifyOTP", { defaultValue: "Verify OTP" })}
              </ButtonPrimary>
            </> */}
            <>
              <button onClick={handleChangeEmail} className="w-[244px] h-[44px] text-sm font-semibold text-[#EA4335]">
                {t("changeEmail", { defaultValue: "Change Email" })}
              </button>
              <ButtonPrimary
                isLoading={isLoading}
                disabled={counter > 0}
                className={counter > 0 ? "w-full text-primaryColor" : "w-full"}
                size="medium"
                onClick={() => {
                  emailOPTRequest(email);
                  setCounter(60);
                }}
              >
                <span>Resend</span>
                {counter > 0 && ` in ${counter}...`}
              </ButtonPrimary>
            </>
          </>
        }
      >
        <Language />
        <InputOTP value={otp} onChange={handleChangeOTP} />
      </ModalLayout>
    </EmailProtectedRoute>
  );
};

export default SignupOTPStep;
