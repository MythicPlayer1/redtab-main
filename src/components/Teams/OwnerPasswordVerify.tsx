import React, { FC, useState } from "react";
import LeftArrowButton from "../Button/LeftArrowButton";
import { ButtonPrimary } from "../Button/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import { useVerifyPassword } from "../../store/team-store/use-verify-password";
import { useTranslation } from "react-i18next";

interface InputPasswordProps {
  value?: string;
  onChange?: (newValue: string) => void;
  disabled?: boolean;
  placeholder: string;
  autoFocus?: boolean;
  isConfirmPw?: boolean;
}

const InputPassword: FC<InputPasswordProps> = (props) => {
  const [visible, setVisible] = useState(false);

  const { t } = useTranslation("InputPassword");
  return (
    <div className="custom_input flex items-center w-full border-b border-b-[#EAECF0] focus-within:border-b-primaryColor">
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
            autoFocus={props.autoFocus}
            className="w-full mt-2 h-[32px] text-[16px] font-normal placeholder:text-[#98A2B3] border-none focus:outline-none"
            value={props.value}
            onChange={(e) => props.onChange?.(e.target.value)}
          />

          {props.value && (
            <svg
              onClick={() => setVisible(!visible)}
              className="cursor-pointer"
              width="19"
              height="14"
              viewBox="0 0 19 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.5 0C14.4516 0 19 3.76418 19 6.6087C19 9.45321 14.4516 13.2174 9.5 13.2174C4.54839 13.2174 0 9.45321 0 6.6087C0 3.76418 4.54839 0 9.5 0ZM9.5 1.65217C5.39908 1.65217 1.65217 4.75306 1.65217 6.6087C1.65217 8.46433 5.39908 11.5652 9.5 11.5652C13.6009 11.5652 17.3478 8.46433 17.3478 6.6087C17.3478 4.75306 13.6009 1.65217 9.5 1.65217ZM9.5 3.30435C11.3249 3.30435 12.8043 4.78375 12.8043 6.6087C12.8043 8.43364 11.3249 9.91304 9.5 9.91304C7.67506 9.91304 6.19565 8.43364 6.19565 6.6087C6.19565 4.78375 7.67506 3.30435 9.5 3.30435ZM9.5 4.95652C8.58753 4.95652 7.84783 5.69623 7.84783 6.6087C7.84783 7.52117 8.58753 8.26087 9.5 8.26087C10.4125 8.26087 11.1522 7.52117 11.1522 6.6087C11.1522 5.69623 10.4125 4.95652 9.5 4.95652Z"
                fill="#98A2B3"
              />
            </svg>
          )}

          {props.value && (
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
    </div>
  );
};
const OwnerPasswordVerify: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const { verifyPassword } = useVerifyPassword();
  const actionType = sessionStorage.getItem("staffActionName");

  const handleSubmit = async () => {
    await verifyPassword({
      password: password,
    });
    if (useVerifyPassword.getState()?.verifySuccess) {
      if (actionType === "Manage Member's permissions") {
        navigate("/permission-access");
      }else{
        navigate("/staff-username-change");
      }
    }
  };

  return (
    <>
      <div className="w-full p-5">
        <div className="flex items-center flex-wrap justify-between">
          <LeftArrowButton to="/staff-profile" />
        </div>
        <div className="pt-5">
          <span className="flex flex-col flex-wrap w-[301px] md:w-auto">
            <h1 className="text-[28px] font-semibold font-poppins">Enter your account password</h1>
            <h1 className="text-[28px] font-semibold font-poppins"></h1>
          </span>
          <p className="text-justify mt-1 text-sm flex flex-wrap w-[327px] md:w-auto font-normal font-poppins text-[h-screen]">
            {actionType === "Manage Staff's permissions"
              ? "We need to verify that you and only you can update your member permissions."
              : "We need to verify that you and only you can change your member PIN code."}
          </p>
          <p className="text-justify mt-1 text-sm font-normal font-poppins text-secondaryColorTextBtn"></p>
        </div>
        <div className="mt-10 space-y-8">
          <InputPassword placeholder="Enter Password" value={password} onChange={setPassword} autoFocus={true} />
        </div>
        <div className="fixed bottom-0 left-0 right-0 p-5">
          <ButtonPrimary className="w-full" size="large" disabled={!password} onClick={handleSubmit}>
            {"Continue"}
          </ButtonPrimary>
        </div>
      </div>
    </>
  );
};

export default OwnerPasswordVerify;
