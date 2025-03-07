import { FC, useEffect } from "react";
import Information from "../pan/upload-id/images/information-review.svg";
import { useNavigate } from "react-router-dom";

export interface ProfileReviewProps { }

const ProfileReview: FC<ProfileReviewProps> = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/kyc/profile/review-success');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);
    return (
        <div className="bg-[#FFFFFF] w-full min-h-[100dvh] flex justify-center items-center">
            <div className="w-[262px] h-[181px] flex flex-col items-center justify-center">
                <div className="relative w-[114px] h-[114px] mb-2">
                    <div className="bg-[#F1F1F1] w-[99px] h-[99px] rounded-full absolute inset-0 m-auto"></div>
                    <img
                        src={Information}
                        alt="information_review"
                        className="absolute inset-0 m-auto"
                    />
                </div>
                <p className="text-center font-poppins text-xl font-bold leading-[30px]">
                    Thanks,we are reviewing your selfie
                </p>
            </div>
        </div>
    );
};

export default ProfileReview;
