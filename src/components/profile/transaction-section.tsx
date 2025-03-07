import { Link } from "react-router-dom"
import { GoChevronRight } from "react-icons/go";
import TransactionRecords from "./transaction-records";

const TransactionSection = () => {
  return (
    <div className="w-full h-screen flex flex-col rounded-3xl bg-primaryColorText p-4 text-sm gap-4">
        <div className="flex flex-col gap-4">
            <div className="flex justify-between">
                <p className="font-bold"> Recent Transaction</p>
                <Link to="/profile" className=" flex gap-1 items-center underline">
                    <p>View Full </p>
                    <GoChevronRight size={16} />
                </Link>
            </div>
            <p className="text-secondaryTextColor font-normal text-xs">
                Friday, 12th March, 2021
            </p>
        </div>
        <TransactionRecords />

    </div>
  )
}

export default TransactionSection