import { FC, PropsWithChildren, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ModalLayout } from "../../components/ModalLayout";
import { ButtonPrimary } from "../../components/Button/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import { useHandlePhoneNumberCheckStore } from "../../store/phone-store/use-phone-check-store";
import { useStatusStore } from "../../store/phone-store/use-phone-status-store";
import { usePhoneNumberStore } from "../../store/phone-store/use-phone-store";
import { usePhoneNumberOTPRequestStore } from "../../store/phone-store/use-phone-otp-request";
import { usePrefixStore } from "../../store/phone-store/use-prefix-store";
import Language from "../../components/Language";
import NPflag from "./nepal-flag.png";
import { toast } from "react-toastify";
import React from "react";
import { useLoginStatusStore } from "../../store/login-status-store/use-login-status-store";

export interface ConnectViaPhoneProps {
  onAction?: (action: string) => void;
  onSubmit?: (newState: any) => void;
}

interface InputPhoneNumberProps {
  value?: string;
  onChange?: (newValue: string) => void;
  disabled?: boolean;
  prefix?: string;
  onChangePrefix?: (newPrefix: string) => void;
}

const prefix = ["+84", "+977"];

export const InputPhoneNumber: FC<InputPhoneNumberProps> = (props) => {
  const { t } = useTranslation("InputPhoneNumber");

  const val = useMemo(() => {
    // strip prefix in value
    return props.value
      ?.replace(new RegExp(`^\\+(${prefix.map((s) => s.replace("+", "")).join("|")})`, "g"), "")
      .replace(/\D/g, "");
  }, [props.value]);

  return (
    <div className="flex items-center gap-3 w-full">
      <button
        onClick={() => {
          props.onChangePrefix?.("+977");
        }}
        className="flex px-[16px] py-[8px] items-center justify-center gap-1 bg-[#fff] rounded-[24px] border border-[#d0d5dd] "
      >
        <img src={NPflag} alt="nepal_flag" className="h-[16px]" />
        <p className="text-sm font-semibold">+977</p>
      </button>

      <div className="flex items-center grow">
        <input
          type="tel"
          placeholder={t("placeholder", { defaultValue: "Phone number" })}
          autoFocus
          className="text-[1.5rem] placeholder:text-[#98A2B3] border-none w-full ms-auto focus:outline-none"
          value={val}
          onChange={(e) => props.onChange?.(`${e.target.value}`)}
        />
        {val && (
          <svg
            className="cursor-pointer"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => props.onChange?.("")}
          >
            <rect width="40" height="40" fill="white" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M28 20C28 15.5817 24.4183 12 20 12C15.5817 12 12 15.5817 12 20C12 24.4183 15.5817 28 20 28C24.4183 28 28 24.4183 28 20ZM16.5635 16.5635C16.212 16.915 16.212 17.4849 16.5635 17.8363L18.7271 20L16.5635 22.1636C16.212 22.515 16.212 23.0849 16.5635 23.4364C16.9149 23.7878 17.4848 23.7878 17.8363 23.4364L19.9999 21.2727L22.1636 23.4364C22.5151 23.7878 23.0849 23.7878 23.4364 23.4364C23.7879 23.0849 23.7879 22.515 23.4364 22.1636L21.2727 20L23.4364 17.8363C23.7879 17.4849 23.7879 16.915 23.4364 16.5635C23.0849 16.2121 22.5151 16.2121 22.1636 16.5635L19.9999 18.7272L17.8363 16.5635C17.4848 16.2121 16.9149 16.2121 16.5635 16.5635Z"
              fill="#98A2B3"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

const ConnectViaPhone: FC<PropsWithChildren<ConnectViaPhoneProps>> = () => {
  const { t } = useTranslation("InputPhoneStep");
  const navigate = useNavigate();
  const { prefix, setPrefix } = usePrefixStore();
  const { phoneNumber, setPhoneNumber } = usePhoneNumberStore();
  const { handlePhoneNumberCheck, isLoading: isLoading1 } = useHandlePhoneNumberCheckStore();
  const { status } = useStatusStore();
  const { phoneNumberOTPRequest, isLoading: isLoading2 } = usePhoneNumberOTPRequestStore();
  const { isLoggedIn } = useLoginStatusStore();

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/home");
    } else {
      navigate("/connect/phone");
    }
  }, [isLoggedIn]);

  return (
    <div>
      <ModalLayout
        title={t("letGetStarted", { defaultValue: "Let's get started!" })}
        subTitle={t("enterPhoneNumber", {
          defaultValue: "Please enter your mobile phone number",
        })}
        footer={
          <>
            {status === "signup" && phoneNumber && (
              <span className="max-w-[200px] text-center">You don't have an account with this number, Create one?</span>
            )}
            <button
              onClick={() => {navigate("/connect/email");setPhoneNumber("");}}
              className="w-[244px] h-[44px] text-sm font-semibold text-[#EA4335]"
            >
              {t("useEmail", { defaultValue: "Use email" })}
            </button>

            <ButtonPrimary
              // disabled={isDisabled}
              className="w-full"
              size="medium"
              isLoading={(status === "check" && isLoading1) || (status === "signup" && isLoading2)}
              onClick={async () => {
                const phoneRegix = /^9\d{9}$/;
                if (!phoneRegix.test(phoneNumber)) {
                  toast.error("Please Enter Valid Phone Number.");
                } else if (status === "check") {
                  await handlePhoneNumberCheck(phoneNumber);
                  const { status } = useStatusStore.getState();
                  if (status === "login") {
                    navigate("/connect/phone/password");
                  }
                } else if (status === "signup") {
                  phoneNumberOTPRequest(phoneNumber, prefix);
                  navigate("/connect/phone/otp");
                }else if(status === "login"){
                  navigate("/connect/phone/password");
                }
              }}
            >
              {status !== "signup" ? "Continue" : "Create Account"}{" "}
            </ButtonPrimary>
          </>
        }
      >
        <Language />
        <InputPhoneNumber value={phoneNumber} onChange={setPhoneNumber} prefix={prefix} onChangePrefix={setPrefix} />
      </ModalLayout>
    </div>
  );
};

export default ConnectViaPhone;
