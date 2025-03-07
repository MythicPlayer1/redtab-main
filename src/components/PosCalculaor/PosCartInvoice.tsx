import React from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { useCalculationStore } from "../../store/pos-calculator/pos-calculation-store";
import { usePosCalculateAmount } from "../../store/pos-calculator/pos-cal-store";

const PosCartInvoice = () => {
  const { inputValueArray } = useCalculationStore();
  const { itemCounts, itemPrice, itemTotal } = usePosCalculateAmount();

  // increase and decrease the item count
  const increaseItemCount = usePosCalculateAmount((state) => state.increaseItemCount);
  const decreaseItemCount = usePosCalculateAmount((state) => state.decreaseItemCount);
  
  return (
    <>
      {inputValueArray
        ?.filter((item: number) => item > 0) // Filter only positive values
        .map((_, index: number) => (
          <div
            key={index}
            className={`flex justify-between items-center flex-wrap py-4 mx-5 ${
              index < inputValueArray.length - 1 ? "border-b-[0.5px] border-dashed border-[#D0D5DD]" : ""
            }`}
          >
            <h6 className="item-name min-w-[90px] font-medium text-sm text-wrap font-poppins text-[#EA4335]">Item{index + 1}</h6>
            <div className="item-count flex justify-between items-center min-w-[90px]">
              <FaMinus size={16} color="#EA4335" onClick={() => decreaseItemCount(index, itemPrice[index])} />
              <p className="text-sm font-poppins font-semibold text-[#1D2939]">{itemCounts[index]}</p>
              <FaPlus size={16} color="#EA4335" onClick={() => increaseItemCount(index, itemPrice[index])} />
            </div>
            <h2 className="item-price min-w-[90px] text-sm text-end font-poppins font-semibold text-[#1D2939]">
              {itemTotal[index]}
              <span className="text-secondaryColorTextBtn text-sm font-poppins font-semibold">रु</span>
            </h2>
          </div>
        ))}
    </>
  );
};

export default PosCartInvoice;
