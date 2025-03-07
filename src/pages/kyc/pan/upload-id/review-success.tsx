import { FC, useEffect } from "react";
import { t } from "i18next";
import Tick from "../upload-id/images/tick.svg";
import { useNavigate } from "react-router-dom";

export interface ReviewSuccessMessageProps { }
const ReviewSuccessMessage: FC<ReviewSuccessMessageProps> = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/kyc/profile/interface");
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);
    return (
        <div className="flex items-center justify-center min-h-[100dvh] flex-col">
            <div className="w-[136px] h-[136px] relative ">
                <img src={Tick} className="ms-5 absolute z-50" />
                <div className="absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[99px] h-[99px] rounded-full bg-[#F1F1F1]"></div>
            </div>
            <div className="text-center pt-[8px]">
                <div className="font-poppins text-xl font-bold leading-[30px] text-center">
                    {t("All good", {
                        defaultValue: "All good!",
                    })}
                </div>
                <div className="w-[262px] h-[30px] pt-[8px]">
                    <p className="text-sm font-normal font-poppins text-[#1D2939] text-center">
                        You will be auto redirected to take selfie in a few seconds
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ReviewSuccessMessage;
