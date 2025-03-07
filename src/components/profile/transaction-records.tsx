import TransactionCard from "./transaction-card"

const TransactionRecords = () => {
  return (
    <div className="border-t border-[#EAECF0] py-4 flex flex-col gap-5 overflow-scroll  ">
        {Array.from({length: 20}).map((_, index) => (
            <TransactionCard key={index} />
        ))}
    </div>
  )
}

export default TransactionRecords