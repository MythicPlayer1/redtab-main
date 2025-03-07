import Information from '../../kyc/pan/upload-id/images/information-review.svg'

export interface OwnerInfoReviewProps { }
const OwnerInfoReview = () => {
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
                <div className='min-w-[262px] min-h-[60px]'>
                    <p className="text-center font-poppins text-xl font-bold leading-[30px] mt-[14px]">
                        Thanks,we are reviewing your information
                    </p>
                    <p className='min-w-[262px] min-h-[40px] text-sm font-poppins mt-[18px] font-normal text-[#1D2939] text-center'>
                        We will send you notice when everythings done.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default OwnerInfoReview
