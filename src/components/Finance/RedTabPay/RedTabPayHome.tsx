import { useLocation, useNavigate } from "react-router-dom";
import { ButtonPrimary } from "../../Button/ButtonPrimary";
import RedTabCredit from "./RedTabCreditList";
import HalfPieChart from "./HalfPieChart";
import { useEffect, useState } from "react";
import { useSelectedOutletUuidStore } from "../../../store/merchant-profile/use-merchant-profile-outlet-store";
import { useRedTabCreditListStore } from "../../../store/redtab-pay-store/use-redTab-credit-store";
import { useRecipientBillingCredit, RecipientBillingData } from "../../../store/redtab-pay-store/use-recipient-billing-credit";
import BackButton from "../../BackButtom/BackButton";

const RedTabPayHome = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [recipientBillingList, setRecipientBillingList] = useState<RecipientBillingData[]>([])
    const { selectedOutletId } = useSelectedOutletUuidStore();
    const { getRecipientBillingCredit } = useRecipientBillingCredit();
    const { redTabCreditList } = useRedTabCreditListStore();

    useEffect(() => {
        const fetchRecipientBillingCredit = async () => {
            if (location.pathname === "/tab-pay" && selectedOutletId) {
                const recipient = await getRecipientBillingCredit(selectedOutletId);
                if (recipient) {
                    setRecipientBillingList(recipient);
                }
            }
        };
    
        fetchRecipientBillingCredit();
    }, [location.pathname, selectedOutletId]);

    const handleCreditLimit = () => {
        navigate("/tab-pay-credit");
    };

    return (
        <>
            <div className="w-full h-screen">
                {/* first section start */}
                <div className="h-auto w-full bg-primaryColor flex flex-col justify-between items-center ">
                    <BackButton buttonType="back" title="RedTab Pay" link="/finance" />
                    {/* chart section */}
                    <div className="bg-[#ffffff] relative  shadow-2xl max-h-40  w-[90%] rounded-t-2xl flex flex-col justify-center items-center ">
                        <HalfPieChart />
                        <div className="absolute top-0 left-0 bg-[#807f7f] opacity-75 h-full w-full">
                            <p className="text-[24px] pt-1 text-center text-[#fff] opacity-100">Coming soon!</p>
                        </div>
                    </div>
                </div>
                {/* second section */}
                <div className="h-auto w-full  flex flex-col justify-between items-center">
                    <div className="w-[90%]  bg-[#ffffff] shadow rounded-b-2xl ">
                        {/* list section */}
                        <div className="grid grid-cols-1 w-full  gap-4 items-center mt-6">
                            <div className="h-[117px] w-full flex  flex-col justify-center items-center  rounded-lg space-y-1">
                                <span className="w-[90%] h-[39px]  flex  items-center justify-between border-b-2 border-dashed border-[#D0D5DD] pb-1">
                                    <h1 className="font-normal text-[#667085] text-xs font-poppins">Credit used</h1>
                                    <h1 className="text-sm font-poppins font-semibold">{redTabCreditList?.credit_used ? redTabCreditList?.credit_used : "0.00"}रु</h1>
                                </span>
                                <span className="w-[90%] h-[39px]  flex  items-center justify-between border-b-2 border-dashed border-[#D0D5DD] pb-1">
                                    <h1 className="font-normal text-[#667085] text-xs font-poppins">Credit limit</h1>
                                    <h1 className="text-sm font-poppins font-semibold">{redTabCreditList?.credit_limit ? redTabCreditList?.credit_limit : '0.00'}रु</h1>
                                </span>
                                <span className="w-[90%] h-[39px] flex  items-center justify-between  pb-1 ">
                                    <h1 className="font-normal text-[#667085] text-xs font-poppins">Remaining balance</h1>
                                    <h1 className="text-sm font-poppins font-semibold">{redTabCreditList?.credit_remaining ? redTabCreditList.credit_remaining : "0.00"}</h1>
                                </span>
                            </div>
                        </div>
                        {/* button section */}
                        <div className="mt-8 pl-4 pr-4">
                            <ButtonPrimary
                                className="w-full"
                                size="small"
                                disabled={false}
                                onClick={() => {
                                    // handle the continue action here
                                }}
                            >
                                {"Repay"}
                            </ButtonPrimary>
                            <h1
                                onClick={handleCreditLimit}
                                className="text-center cursor-pointer mt-2 mb-6 text-primaryColor font-poppins text-sm font-semibold"
                            >
                                Request Limit Increase
                            </h1>
                        </div>
                    </div>
                </div>
                {/* credit list */}
                <div className="mt-12 ">
                    <RedTabCredit recipientBillingList={recipientBillingList}/>
                </div>
            </div>
        </>
    );
};

export default RedTabPayHome;
