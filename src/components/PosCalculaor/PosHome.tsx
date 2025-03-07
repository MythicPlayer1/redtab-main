import { FC, PropsWithChildren, useEffect, useState } from "react";
import { ButtonPrimary } from "../../components/Button/ButtonPrimary";
import { TabLayout } from "../TabLayout";
import { useCalculator } from "./PosMain";
import { Link } from "react-router-dom";
import { useCalculationStore } from "../../store/pos-calculator/pos-calculation-store";
import { usePosCalculateAmount } from "../../store/pos-calculator/pos-cal-store";
import { useDimensionsStore } from "../../store/dimensions";
import { UseDataForPayload } from "../../store/pos-calculator/billing";


interface ButtonProps {
  value?: any;
  onClick?: (value: any) => void;
  tabIndex?: number;
}
const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  return (
    <div
      className="hover:bg-secondaryColor h-full justify-center items-center flex border-[#EAECF0] border-t-[1px] border-l-[1px] cursor-pointer px-4 py-4"
      onClick={() => props.onClick?.(props.value)}
      tabIndex={props.tabIndex}
    >
      {props.children}
    </div>
  );
};

interface NumPadProps {
  onClick?: (value: number | string) => void;
}

export const Numpad: FC<NumPadProps> = ({ onClick }) => {
  return (
    <div className=" flex flex-col text-center grow border-[#EAECF0] border-b-[1px] border-r-[1px] border-l-[1px]  w-full f-full ">
      <div className="flex w-full ">
        <div className=" w-full text-[24px] font-medium text-[#1D2939] font-inter">
          <Button tabIndex={6} value={1} onClick={onClick}>
            1
          </Button>
        </div>
        <div className="w-full text-[24px] font-medium text-[#1D2939] font-inter">
          <Button tabIndex={7} value={2} onClick={onClick}>
            2
          </Button>
        </div>
        <div className="w-full text-[24px] font-medium text-[#1D2939] font-inter">
          <Button tabIndex={8} value={3} onClick={onClick}>
            3
          </Button>
        </div>
        <div className="w-full  ">
          <Button tabIndex={1} value={"/"} onClick={onClick}>
            <svg
              className="mx-auto"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.1802 7.46594V10.3296H0.816584V7.46594H17.1802ZM8.9984 17.7955C8.3592 17.7955 7.81374 17.5739 7.36204 17.1307C6.91886 16.679 6.69727 16.1336 6.69727 15.4943C6.69727 14.8807 6.91886 14.3523 7.36204 13.9091C7.81374 13.4659 8.3592 13.2443 8.9984 13.2443C9.61204 13.2443 10.1404 13.4659 10.5836 13.9091C11.0268 14.3523 11.2484 14.8807 11.2484 15.4943C11.2484 16.1336 11.0268 16.679 10.5836 17.1307C10.1404 17.5739 9.61204 17.7955 8.9984 17.7955ZM8.9984 4.55117C8.57227 4.55117 8.18448 4.44889 7.83505 4.24435C7.48562 4.0398 7.20863 3.76281 7.00408 3.41338C6.79954 3.06395 6.69727 2.67617 6.69727 2.25003C6.69727 1.63639 6.91886 1.10798 7.36204 0.664802C7.81374 0.221621 8.3592 3.05176e-05 8.9984 3.05176e-05C9.61204 3.05176e-05 10.1404 0.221621 10.5836 0.664802C11.0268 1.10798 11.2484 1.63639 11.2484 2.25003C11.2484 2.88923 11.0268 3.43469 10.5836 3.88639C10.1404 4.32958 9.61204 4.55117 8.9984 4.55117Z"
                fill="#475467"
              />
            </svg>
          </Button>
        </div>
      </div>
      <div className="flex w-full grow">
        <div className="w-full  text-[24px] font-medium text-[#1D2939] font-inter">
          <Button tabIndex={9} value={4} onClick={onClick}>
            4
          </Button>
        </div>
        <div className="w-full  text-[24px] font-medium text-[#1D2939] font-inter">
          <Button tabIndex={10} value={5} onClick={onClick}>
            5
          </Button>
        </div>
        <div className="w-full text-[24px] font-medium text-[#1D2939] font-inter">
          <Button tabIndex={11} value={6} onClick={onClick}>
            6
          </Button>
        </div>
        <div className="w-full font-medium text-[#1D2939] font-inter ">
          <Button tabIndex={2} value="*" onClick={onClick}>
            <svg
              className="mx-auto"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.237 17.3296L0.816584 2.90913L2.75977 0.965948L17.1802 15.3864L15.237 17.3296ZM2.75977 17.3296L0.816584 15.3864L15.237 0.965948L17.1802 2.90913L2.75977 17.3296Z"
                fill="#475467"
              />
            </svg>
          </Button>
        </div>
      </div>
      <div className="flex w-full grow">
        <div className="w-full  text-[24px] font-medium text-[#1D2939] font-inter">
          <Button tabIndex={12} value={7} onClick={onClick}>
            7
          </Button>
        </div>
        <div className="w-full  text-[24px] font-medium text-[#1D2939] font-inter">
          <Button tabIndex={13} value={8} onClick={onClick}>
            8
          </Button>
        </div>
        <div className="w-full text-[24px] font-medium text-[#1D2939] font-inter">
          <Button tabIndex={14} value={9} onClick={onClick}>
            9
          </Button>
        </div>
        <div className="w-full font-medium text-[#1D2939] font-inter ">
          <Button tabIndex={3} value={"-"} onClick={onClick}>
            <svg
              className="mx-auto"
              width="12"
              height="3"
              viewBox="0 0 12 3"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11.7321 -0.00562108V2.80688H0.277521V-0.00562108H11.7321Z" fill="#475467" />
            </svg>
          </Button>
        </div>
      </div>
      <div className="flex w-full grow">
        <div className="w-full  text-[24px] font-medium text-[#1D2939] font-inter">
          <Button tabIndex={15} value={"."} onClick={onClick}>
            .
          </Button>
        </div>
        <div className="w-full  text-[24px] font-medium text-[#1D2939] font-inter">
          <Button tabIndex={5} value={0} onClick={onClick}>
            0
          </Button>
        </div>
        <div className="w-full font-medium text-[#1D2939] font-inter ">
          <Button tabIndex={16} value={"DEL"} onClick={onClick}>
            <svg
              className="mx-auto"
              width="21"
              height="17"
              viewBox="0 0 21 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.375 2.87506H17.0137C17.566 2.87506 18.0137 3.32278 18.0137 3.87506V13.8751C18.0137 14.4273 17.566 14.8751 17.0137 14.8751H7.375C7.08664 14.8751 6.81231 14.7506 6.62242 14.5336L2.24742 9.53356C1.91753 9.15654 1.91752 8.59358 2.24742 8.21656L6.62243 3.21655C6.81231 2.99954 7.08664 2.87506 7.375 2.87506ZM5.11727 1.89955C5.68694 1.2485 6.50991 0.875061 7.375 0.875061H17.0137C18.6706 0.875061 20.0137 2.21821 20.0137 3.87506V13.8751C20.0137 15.5319 18.6706 16.8751 17.0137 16.8751H7.375C6.50991 16.8751 5.68693 16.5016 5.11727 15.8506L0.742269 10.8506C-0.247424 9.71949 -0.247422 8.03062 0.742271 6.89955L5.11727 1.89955ZM13.6802 5.95807C14.0254 5.61289 14.585 5.61289 14.9302 5.95807C15.2754 6.30324 15.2754 6.86289 14.9302 7.20807L13.0552 9.08307L14.9302 10.9581C15.2754 11.3032 15.2754 11.8629 14.9302 12.2081C14.585 12.5532 14.0254 12.5532 13.6802 12.2081L11.8052 10.3331L9.9302 12.2081C9.58502 12.5532 9.02538 12.5532 8.6802 12.2081C8.33502 11.8629 8.33502 11.3032 8.6802 10.9581L10.5552 9.08307L8.6802 7.20807C8.33502 6.86289 8.33502 6.30325 8.6802 5.95807C9.02538 5.61289 9.58502 5.61289 9.9302 5.95807L11.8052 7.83307L13.6802 5.95807Z"
                fill="#475467"
              />
            </svg>
          </Button>
        </div>
        <div className="w-full font-medium text-[#1D2939] font-inter ">
          <Button tabIndex={4} value={"+"} onClick={onClick}>
            <svg
              className="mx-auto"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.56658 17.0853V0.210287H10.4302V17.0853H7.56658ZM0.560902 10.0796V7.21597H17.4359V10.0796H0.560902Z"
                fill="#EA4335"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

const Calculator: FC = () => {
  const { handleNumberChange, clearStore } = useCalculator();
  const [isDisabled, setIsDisabled] = useState(true);
  const { } = useCalculationStore();
  const { clearPayload, clearPayload1 } = UseDataForPayload();
  const { } = useCalculationStore();
  const { expressions, calculatedAmount } = usePosCalculateAmount();
  const { height } = useDimensionsStore();

  useEffect(() => {
    if (calculatedAmount === 0 || calculatedAmount < 0) {
      if(expressions === "0" || calculatedAmount < 0){
        setIsDisabled(true);
      }else{
        setIsDisabled(false);
      }
    } else {
      setIsDisabled(false);
    }
  }, [calculatedAmount]);

  useEffect(() => {
    window.onbeforeunload = () => {
      clearStore();
    };
    clearStore();
  }, []);

  const Toggle: React.FC = () => {
    const { setTransactionType, transactionType } = usePosCalculateAmount.getState();

    const handleIncomeClick = () => {

      clearPayload();
      clearPayload1();
      setTransactionType("sales");
    }
    const handleExpenseClick = () => {
      clearPayload();
      clearPayload1();
      setTransactionType("purchase");
    }
    return (
      <div className="absolute top-[28px] cursor-pointer left-1/2 transform -translate-x-1/2 w-[172px] h-[36px] mx-auto flex items-center justify-center bg-[#EAECF0] p-[6px] rounded-full">
        <button
          className={`py-[6px] px-4 rounded-full  ${transactionType === "sales"
              ? "bg-[#FFFFFF] text-[#1D2939] text-xs font-medium "
              : "text-[#667085] text-xs font-medium"
            }`}
          onClick={handleIncomeClick}
        >
          Income
        </button>
        <button
          className={`py-[6px] px-4 rounded-full ${transactionType === "purchase"
              ? "bg-[#FFFFFF] text-[#1D2939] text-xs font-medium outline outline-2 outline-[#eb4536]"
              : "text-[#667085] text-xs font-medium "
            }`}
          onClick={handleExpenseClick}
        >
          Expense
        </button>
      </div>
    );
  };
  const containerHeight = window.innerHeight - height-20;

  return (
    <TabLayout>
      <Toggle />
      <div className="flex w-full h-auto overflow-scroll" style={{ minHeight: containerHeight }} >
        <div className="flex w-full  flex-col justify-end gap-4 h-auto ">
          <div className="flex flex-col w-full justify-center h-auto text-wrap items-center text-center gap-2 px-4 ">
            <div className="flex items-center justify-center text-[#98A2B3] text-[24px] h-atuo text-wrap font-medium font-inter w-full overflow-x-scroll">
              <p className=" ">{expressions}</p>
            </div>
            
            <p className="text-[#1D2939] h-auto w-full text-[48px] flex items-center justify-center  font-medium font-inter overflow-x-scroll ">
              {calculatedAmount}
              <span className="text-[24px] font-medium font-poppins">रु</span>
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <Link to={"/pos-invoice-review"} className="flex items-center justify-center flex-col w-full p-4 ">
              <ButtonPrimary
                className="text-[14px] w-full text-wrap font-semibold font-poppins  flex items-center justify-center  "
                size="large"
                disabled={isDisabled}
              >
                Charge {calculatedAmount}
                <span className="text-[14px] font-normal ml-1">रु</span>
              </ButtonPrimary>
            </Link>
            <Numpad onClick={handleNumberChange} />
          </div>
        </div>
      </div>
    </TabLayout>
  );
};

export default Calculator;

