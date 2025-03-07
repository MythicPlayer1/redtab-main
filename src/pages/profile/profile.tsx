import { IconBack } from "../../components/IconBack"
import StatusMeter from "../../components/profile/status-meter"
import TransactionSection from "../../components/profile/transaction-section"


const Profile = () => {
    return (
        <div className="flex h-screen flex-col bg-[#F5F6F7] relative overflow-scroll">
            <div className="flex flex-col pl-3 py-4 pr-8  w-full bg-[#F5F6F7]">
                <div className="flex items-center ">
                    <IconBack />
                    <div className="w-full flex justify-center">
                        <p className="self-center text-sm font-semibold ">Lending Status</p>
                    </div>
                </div>
                <StatusMeter />
                <div className="flex flex-col items-center w-full justify-center text-sm ">
                    <p>Credit Limit: <span className="font-bold">2000.000 </span></p>
                    <p>Remaining Limit:<span className="font-extrabold">80.000</span> </p>
                </div>
            </div>
            <div className="sticky top-0">
                <TransactionSection />

            </div>

        </div>
    )
}

export default Profile