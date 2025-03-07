import { FC } from "react";
import Cross from "../pan/upload-id/images/Cross.svg";

export interface ProfileReviewErrorProps { }
const ProfileReviewError: FC<ProfileReviewErrorProps> = () => {
    return (
        <div className="min-h-[100dvh] w-full relative">
            <img src={Cross} alt="tick-image" className="absolute top-[249px] left-1/2 transform -translate-x-1/2 z-50" />
            <div className="absolute top-[272px] left-1/2 transform -translate-x-1/2">
                <div className="w-[99px] h-[99px] rounded-full bg-[#F1F1F1]"></div>
            </div>
            <div className="w-[262px] h-[30px] absolute left-1/2 top-[393px] transform -translate-x-1/2">
                <p className="font-poppins text-xl font-bold leading-[30px] text-center">Some thing went wrong</p>
            </div>
            <div className="w-[262px] h-[40px] absolute left-1/2 top-[431px] transform -translate-x-1/2">
                <p className="text-sm font-normal font-poppins text-[#1D2939] text-center">
                    We wil send you detailed result in a few minutes
                </p>
            </div>
        </div>
    );
};

export default ProfileReviewError;
