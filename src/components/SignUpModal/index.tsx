import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { SlideUpModal } from "../SlideUpModal";
import { ButtonPrimary } from "../Button/ButtonPrimary";
import CheckIcon from "../check.png";
import { InputPhoneStep } from "./InputPhoneStep";
import { InputEmailStep } from "./InputEmailStep";
import { InputOTPStep } from "./InputOTPStep";
import { InputCheckEmailStep } from "./InputCheckEmailStep";
import { InputCreatePasswordStep } from "./InputCreatePasswordStep";
import { InputConfirmPasswordStep } from "./InputConfirmPasswordStep";

export const SignUpModal = () => {
    const [visible, setVisible] = useState(true);

    const { t } = useTranslation("signup");

    const [step, setStep] = useState("phone");

    const [form, setForm] = useState({
        phone: "",
        email: "",
        otp: "",
        password: "",
    });

    return (
        <div>
            <SlideUpModal visible={visible} onClose={() => setVisible(false)}>
                {step == "phone" && (
                    <InputPhoneStep
                        onAction={() => setStep("email")}
                        onSubmit={(value) => {
                            setForm({
                                ...form,
                                ...value,
                            });
                            setStep("otp");
                        }}
                    />
                )}

                {step == "email" && (
                    <InputEmailStep
                        onAction={() => setStep("phone")}
                        onSubmit={(value) => {
                            setForm({
                                ...form,
                                ...value,
                            });
                            setStep("checkEmail");
                        }}
                    />
                )}

                {step == "otp" && (
                    <InputOTPStep
                        phone={form.phone}
                        onAction={() => setStep("phone")}
                        onSubmit={(value) => {
                            setForm({
                                ...form,
                                ...value,
                            });
                            setStep("createPassword");
                        }}
                    />
                )}

                {step == "checkEmail" && (
                    <InputCheckEmailStep
                        phone={form.phone}
                        onAction={() => setStep("phone")}
                        onSubmit={(value) => {
                            setForm({
                                ...form,
                                ...value,
                            });
                            setStep("createPassword");
                        }}
                    />
                )}

                {step == "createPassword" && (
                    <InputCreatePasswordStep
                        onSubmit={(value) => {
                            setForm({
                                ...form,
                                ...value,
                            });
                            setStep("reEnterPassword");
                        }}
                    />
                )}

                {step == "reEnterPassword" && (
                    <InputConfirmPasswordStep
                        password={form.password}
                        onSubmit={(value) => {
                            setForm({
                                ...form,
                                ...value,
                            });
                            setStep("phoneCreated");
                        }}
                    />
                )}

                {step == "phoneCreated" && (
                    <div className="flex items-center justify-center min-h-[100dvh] flex-col">
                        <img src={CheckIcon} className="mb-16 ml-4" />

                        <div className="text-center">
                            <div className="text-[#1D2939] font-black text-[1.25rem] mb-2">
                                {t("yourAccountCreated", {
                                    defaultValue: "Your account was created",
                                })}
                            </div>
                            <div className="text-[0.875rem] text-[#1D2939]">
                                <Trans i18nKey={"yourAccountHaveBeenCreated"}>
                                    Your account have been created using <br />
                                    <span className="font-bold">{form.phone}</span>
                                </Trans>
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-5">
                            <ButtonPrimary onClick={() => setStep("businessType")} className="w-full" size="large">
                                {t("continue", { defaultValue: "Continue" })}
                            </ButtonPrimary>
                        </div>
                    </div>
                )}

                {step == "emailCreated" && (
                    <div className="flex items-center justify-center min-h-[100dvh] flex-col">
                        <img src={CheckIcon} className="mb-16" />

                        <div className="text-center">
                            <div className="text-[#1D2939] font-black text-[1.25rem] mb-2">
                                {t("yourAccountCreated", {
                                    defaultValue: "Your account was created",
                                })}
                            </div>
                            <div className="text-[0.875rem] text-[#1D2939]">
                                <Trans i18nKey={"yourAccountHaveBeenCreated"}>
                                    Your account have been created using <br />
                                    <span className="font-bold">{form.email}</span>
                                </Trans>
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-5">
                            <ButtonPrimary onClick={() => setStep("businessType")} className="w-full" size="large">
                                {t("continue", { defaultValue: "Continue" })}
                            </ButtonPrimary>
                        </div>
                    </div>
                )}
            </SlideUpModal>
        </div>
    );
};
