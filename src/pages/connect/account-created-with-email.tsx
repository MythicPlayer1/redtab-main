import { t } from "i18next";
import CheckIcon from "../../components/check.png";
import { ButtonPrimary } from "../../components/Button/ButtonPrimary";
import { useEmailStore } from "../../store/email-store/use-email-store";

const AccountCreatedWithEmail = () => {
    const { email } = useEmailStore();
    return (
        <div className="flex items-center justify-center min-h-[100dvh] flex-col">
            <img src={CheckIcon} className=" ml-8" />

            <div className="text-center">
                <div className="text-[#1D2939] font-semibold text-[1.25rem]">
                    {t("yourAccountCreated", {
                        defaultValue: "Your account was created",
                    })}
                    <p className="text-sm font-normal w-[262px] mt-2">
                        Your account have been created using{" "}
                        <span className="font-semibold">{email}</span>
                    </p>
                </div>
                <div className="text-[0.875rem] text-[#1D2939]"></div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5">
                <ButtonPrimary onClick={() => (window.location.href = "/home")} className="w-full" size="large">
                    {t("continue", { defaultValue: "Continue" })}
                </ButtonPrimary>
            </div>
        </div>
    );
};

export default AccountCreatedWithEmail;
