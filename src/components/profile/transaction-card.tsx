import ChoseIcon from "./choose-icon"

const TransactionCard = () => {
    return (
        <div className="flex justify-between gap-1 text-sm">
            <div className="flex gap-4">
                <ChoseIcon />
                <div className="flex flex-col font-normal text-[#1D2939]">
                    <p>Pay With Cash</p>
                    <p className="text-secondaryTextColor">Product 1 and Product 2</p>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <p className="text-[#039855] font-bold"> +2000.00रु</p>
                <p className="text-secondaryTextColor text-xs">12:00</p>
            </div>
        </div>
    )
}

export default TransactionCard