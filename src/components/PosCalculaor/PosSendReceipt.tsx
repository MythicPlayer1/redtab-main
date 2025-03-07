import { FC, useState } from "react";
// import { useTranslation } from 'react-i18next'
import { ButtonPrimary } from "../../components/Button/ButtonPrimary";
import { TabLayout } from "../TabLayout";
import { Numpad } from "./PosHome";
import { useCalculator } from "./PosMain";
import { UseDataForPayload } from "../../store/pos-calculator/billing";
// import { SwitchActions } from '../../components/SwitchActions';

const PosSendReceipt: FC = () => {
  const { expression, handleNumberChange } = useCalculator();

  const Toggle: React.FC = () => {
    const [selected, setSelected] = useState<"income" | "expense">("income");
    const {clearPayload, clearPayload1}= UseDataForPayload();
    const incomeHandler = ()=>{
      setSelected("income")
      clearPayload();
      clearPayload1();
      console.log("income")
    };


    const expenseHandler = ()=>{
      setSelected("expense")
      clearPayload();
      clearPayload1();
      console.log("expense")
    }

    return (
      <div className="w-[172px] h-[36px] mx-auto flex items-center justify-center bg-[#EAECF0] p-[6px] rounded-full">
        <button
          className={`py-[6px] px-4 rounded-full  ${
            selected === "income"
              ? "bg-[#FFFFFF] text-[#1D2939] text-xs font-medium"
              : "text-[#667085] text-xs font-medium"
          }`}
          onClick={incomeHandler}
        >
          Income
        </button>
        <button
          className={`py-[6px] px-4 rounded-full ${
            selected === "expense"
              ? "bg-[#FFFFFF] text-[#1D2939] text-xs font-medium"
              : "text-[#667085] text-xs font-medium"
          }`}
        onClick={expenseHandler}
        >
          Expense
        </button>
      </div>
    );
  };

  return (
    <TabLayout>
      <div className="h-[100vh] w-full">
        {/* <div className="w-full flex items-center justify-center  font-medium"> */}
        <Toggle />
        {/* </div> */}
        <div className="flex flex-col justify-between w-full h-screen">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center grow my-0 mt-[100px]">
              <div className="text-[#98A2B3] text-[24px] font-medium font-inter">{expression}</div>
            </div>
            <div className="text-[#1D2939] text-[48px] flex items-center font-medium font-inter ml-4">
              {/* {calculateResult} */}
              <span className="text-[24px] font-medium font-poppins">रु</span>
            </div>
            <div className="w-full mt-[50px] px-4">
              <ButtonPrimary
                className="text-[14px] w-full min-h-11 font-semibold font-poppins  flex items-center justify-center mt-[50px] mb-[20px]"
                size="large"
              >
                {/* Charge {calculateResult} */}
                <span className="text-[14px] font-normal">रु॰</span>
              </ButtonPrimary>
            </div>
          </div>
          <Numpad onClick={handleNumberChange} />
          {/* <div>
          <div className="px-4">
            <div className="bg-[#F5F6F7] rounded-[24px] shadow-lg flex items-center justify-between px-2 py-4 w-full h-[44px]">
              <svg
                className="ml-1"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.77994 3.35467L8.48023 4.18708C9.8524 5.81455 9.7086 8.24058 8.18089 9.7685L7.88387 10.0652C8.10949 10.4442 8.51718 10.9431 9.1142 11.5402C9.64418 12.0702 10.0974 12.4515 10.458 12.6886L10.5888 12.7708L10.8859 12.4737C12.4124 10.947 14.8366 10.8017 16.4666 12.1722L17.2993 12.8737C18.7591 14.1024 18.9009 16.2929 17.6448 17.7679C17.0435 18.4635 16.2143 18.9209 15.3546 19.0565L14.8485 19.1173C11.8438 19.4089 8.81156 17.9572 5.75453 14.8998C2.6991 11.8439 1.24518 8.81078 1.52898 5.87449L1.58949 5.35957C1.62349 5.1311 1.67676 4.90992 1.75068 4.69143C1.9732 4.03845 2.3664 3.4563 2.88925 3.00567L3.05668 2.87087C4.51861 1.76398 6.59655 1.94703 7.77994 3.35467ZM3.86853 4.1419C3.54788 4.41826 3.30683 4.77524 3.1705 5.17528C3.11165 5.34921 3.07365 5.52951 3.05568 5.72674C2.71243 8.27484 3.95398 10.9775 6.81527 13.8392C9.67643 16.7008 12.3779 17.9418 14.939 17.5971C15.5481 17.5389 16.1114 17.2481 16.51 16.787C17.2285 15.9432 17.146 14.7052 16.3334 14.0213L15.5002 13.3194L15.3575 13.2079C14.3374 12.4689 12.8866 12.5941 11.9466 13.5343L11.3494 14.1315L11.2623 14.2083C11.0191 14.396 10.6938 14.4487 10.4 14.3411C9.75204 14.1028 8.9752 13.5226 8.05347 12.6008C7.13083 11.678 6.55108 10.9015 6.31419 10.2539C6.19292 9.92395 6.27424 9.55358 6.52293 9.30441L7.12087 8.7072L7.2496 8.56952C8.11183 7.58282 8.15614 6.12974 7.33344 5.15397L6.63211 4.32032L6.51974 4.19805C5.81959 3.50095 4.66738 3.46263 3.86853 4.1419Z"
                  fill="#1D2939"
                />
              </svg>
              <input
                type="tel"
                placeholder=""
                className="bg-[#F5F6F7] w-[190px] outline-none text-sm px-2 text-[#1D2939] font-normal"
              />
              <div className="text-[#EA4335] text-sm text-[14px] font-semibold pr-1 ">Send Receipt</div>
            </div>
          </div>
        </div> */}
        </div>
      </div>
    </TabLayout>
  );
};

export default PosSendReceipt;
