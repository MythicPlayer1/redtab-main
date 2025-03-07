/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ButtonPrimary } from "../../../components/Button/ButtonPrimary";
import { ModalLayout } from "../../../components/ModalLayout";
import { useNavigate } from "react-router-dom";

import { useLoginStore } from "../../../store/phone-store/use-phone-login-store";
import { useStatusStore } from "../../../store/phone-store/use-phone-status-store";
import { usePhoneNumberStore } from "../../../store/phone-store/use-phone-store";
import { useSignupStore } from "../../../store/phone-store/use-phone-signup-store";
import { usePrefixStore } from "../../../store/phone-store/use-prefix-store";
import { useLoginStatusStore } from "../../../store/login-status-store/use-login-status-store";
import Language from "../../../components/Language";
import PhoneNumberRoute from "../../../protected-routes/PhoneNumberRoute";
import { toast } from "react-toastify";

import { IoEyeOutline, IoCloseCircle } from "react-icons/io5";
import { useCreateMerchantProfile } from "../../../store/merchant-profile/use-create-merchant-profile";
import { useTeamMemberLoginStore } from "../../../store/team-member-login/use-team-member-login";

export interface InputCreatePasswordStepProps {}

interface InputPasswordProps {
  value?: string;
  onChange?: (newValue: string) => void;
  disabled?: boolean;
  placeholder: string;
  autofocus: boolean;
  isConfirmPw?: boolean;
  errorMessage?: string;
}

const InputPassword: FC<InputPasswordProps> = (props) => {
  const [visible, setVisible] = useState(false);

  const { t } = useTranslation("InputPassword");
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center w-full mt-2 border-b border-b-[#EAECF0] focus-within:border-b-primaryColor">
        <div className="flex flex-col w-full">
          {props?.value && props?.isConfirmPw === false && (
            <label className="font-poppins font-normal text-xs text-[#98A2B3] ">Password</label>
          )}
          {props?.value && props?.isConfirmPw && (
            <label className="font-poppins font-normal text-xs text-[#98A2B3] ">Confirm Password</label>
          )}
          <div className="flex items-center">
            <input
              type={visible ? "text" : "password"}
              placeholder={t("placeholder", { defaultValue: props.placeholder })}
              autoFocus={props.autofocus}
              className="w-full mt-2 h-[32px] text-[1.5rem] font-normal placeholder:text-[#98A2B3] border-none focus:outline-none"
              value={props.value}
              onChange={(e) => props.onChange?.(e.target.value)}
            />
            <div className="flex items-center">
              {props.value && (
                <div onClick={() => setVisible(!visible)} className="cursor-pointer w-10 flex justify-center">
                  <IoEyeOutline size={24} color="#98A2B3" />
                </div>
              )}

              {props.value && (
                <div onClick={() => props.onChange?.("")} className="cursor-pointer w-10 flex justify-center">
                  <IoCloseCircle size={24} color="#98A2B3" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {props?.value && (
        <p className="w-full text-sm font-normal tracking-wide text-primaryColor mt-1">{props?.errorMessage}</p>
      )}
    </div>
  );
};

const InputCreatePasswordStep: FC<PropsWithChildren<InputCreatePasswordStepProps>> = () => {
  const { t } = useTranslation("InputCreatePasswordStep");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate();

  const { phoneNumber, merchantOrStaff } = usePhoneNumberStore();
  const { prefix } = usePrefixStore();
  const { signup, isLoading: isLoading1, signupSuccess } = useSignupStore();
  const { login, isLoading: isLoading2 } = useLoginStore();
  const { staffLogin } = useTeamMemberLoginStore();
  const { isLoggedIn } = useLoginStatusStore();
  const { status } = useStatusStore();
  const [isDisabled, setIsDisable] = useState(true);
  const [error, setError] = useState<string>("");
  const [error1, setError1] = useState<string>("");
  const merchantProfile = localStorage.getItem("token-storage")
    ? JSON.parse(localStorage.getItem("token-storage") || "{}")
    : null;
  const merChantUUID = !!merchantProfile?.state?.merchantProfileUUID?.[0]?.uuid;
  const { createMerchantProfile } = useCreateMerchantProfile();

  useEffect(() => {
    if (status !== "login") {
      if (password.length === 0 || confirmPassword.length === 0) {
        setIsDisable(true);
      }
      if (password.length < 8) {
        setIsDisable(true);
        setError("Password must be at least 8 characters.");
      } else {
        setError("");
      }
      if (confirmPassword.length < 8) {
        setIsDisable(true);
        setError1("Password must be at least 8 characters.");
      } else {
        if (password !== confirmPassword) {
          setIsDisable(true);
          setError1("Passwords do not match.");
        } else {
          setError1("");
          setIsDisable(false);
        }
      }
    } else {
      setIsDisable(false);
    }
  }, [password, confirmPassword]);

  const handleClick = async () => {
    if (status === "login") {
      if (merchantOrStaff === "staff") {
        await staffLogin({ country_code: prefix, phone: phoneNumber, pin: password });
      } else {
        await login(prefix, phoneNumber, password);
      }
    } else {
      if (password !== confirmPassword) {
        toast.error("Password didn't match.");
      } else {
        await signup(phoneNumber, password, confirmPassword, prefix);
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn && merChantUUID) {
      navigate("/home");
    } else if (isLoggedIn && !merChantUUID) {
      navigate("/home");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (signupSuccess) {
      createMerchantProfile({ merchant_name: phoneNumber });
      localStorage.setItem("status", "true");
      navigate("/account-created");
    }
  }, [signupSuccess]);

  return (
    <PhoneNumberRoute>
      <ModalLayout
        title={t("letGetStarted", { defaultValue: status === "login" ? "Enter Password" : "Create password" })}
        subTitle={t("enterPassword", {
          defaultValue: merchantOrStaff === "staff" ? "Enter 4 digits pin" : "Minimum 8 character",
        })}
        footer={
          <>
            <ButtonPrimary
              isLoading={(status === "login" && isLoading2) || (status !== "login" && isLoading1)}
              disabled={isDisabled}
              className="w-full"
              size="medium"
              onClick={handleClick}
            >
              {t("createPassword", { defaultValue: status === "login" ? "Login" : "Create" })}
            </ButtonPrimary>
          </>
        }
      >
        <Language />
        <div className="flex flex-col gap-[24px]">
          <InputPassword
            autofocus={true}
            placeholder="Enter Password"
            value={password}
            onChange={setPassword}
            isConfirmPw={false}
            errorMessage={error}
          />
          {status !== "login" && (
            <InputPassword
              autofocus={false}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              isConfirmPw={true}
              errorMessage={error1}
            />
          )}
        </div>
      </ModalLayout>
    </PhoneNumberRoute>
  );
};

export default InputCreatePasswordStep;
