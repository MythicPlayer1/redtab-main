import { FC, PropsWithChildren, useState } from "react";
import { useTranslation } from "react-i18next";
import { TabLayout } from "../../components/TabLayout";
import { ButtonPrimary } from "../../components/Button/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import { SwitchActions } from "../../components/SwitchActions";

interface ButtonProps {
  value?: any;
  onClick?: (value: any) => void;
}
const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  return (
    <div
      className="hover:bg-secondaryColor h-full justify-center items-center flex border-[#EAECF0] border-t-[1px] border-l-[1px] cursor-pointer px-4 py-4"
      onClick={() => props.onClick?.(props.value)}
    >
      {props.children}
    </div>
  );
};

interface NumPadProps {
  onClick?: (value: number | string) => void;
}

const Numpad: FC<NumPadProps> = ({ onClick }) => {
  return (
    <div className="mb-4 flex flex-col text-center grow border-[#EAECF0] border-b-[1px] border-r-[1px]">
      <div className="flex w-full grow">
        <div className="w-1/4">
          <Button value={1} onClick={onClick}>
            1
          </Button>
        </div>
        <div className="w-1/4">
          <Button value={2} onClick={onClick}>
            2
          </Button>
        </div>
        <div className="w-1/4">
          <Button value={3} onClick={onClick}>
            3
          </Button>
        </div>
        <div className="w-1/4">
          <Button value={":"} onClick={onClick}>
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
        <div className="w-1/4">
          <Button value={4} onClick={onClick}>
            4
          </Button>
        </div>
        <div className="w-1/4">
          <Button value={5} onClick={onClick}>
            5
          </Button>
        </div>
        <div className="w-1/4">
          <Button value={6} onClick={onClick}>
            6
          </Button>
        </div>
        <div className="w-1/4">
          <Button value="*" onClick={onClick}>
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
        <div className="w-1/4">
          <Button value={7} onClick={onClick}>
            7
          </Button>
        </div>
        <div className="w-1/4">
          <Button value={8} onClick={onClick}>
            8
          </Button>
        </div>
        <div className="w-1/4">
          <Button value={9} onClick={onClick}>
            9
          </Button>
        </div>
        <div className="w-1/4">
          <Button value={"-"} onClick={onClick}>
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
        <div className="w-1/4">
          <Button value={"."} onClick={onClick}>
            .
          </Button>
        </div>
        <div className="w-1/4">
          <Button value={0} onClick={onClick}>
            0
          </Button>
        </div>
        <div className="w-1/4">
          <Button value={"DEL"} onClick={onClick}>
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
        <div className="w-1/4">
          <Button value={"+"} onClick={onClick}>
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

const AddCustomer = () => {
  const [showAddCustomer, setShowAddCustomer] = useState(false);

  const { t } = useTranslation("QR");

  const [phone, setPhone] = useState("");

  return (
    <>
      {!showAddCustomer && (
        <div
          onClick={() => setShowAddCustomer(true)}
          className="bg-[#F5F6F7] group gap-2 rounded-[2.5rem] flex items-center justify-center px-3 py-5 cursor-pointer hover:bg-primaryColor text-primaryColor hover:text-[#fff]"
        >
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.7084 4.625C15.7084 3.31265 14.6458 2.25 13.3334 2.25C12.0211 2.25 10.9584 3.31265 10.9584 4.625C10.9584 5.93735 12.0211 7 13.3334 7C14.6458 7 15.7084 5.93735 15.7084 4.625ZM17.2084 4.625C17.2084 6.76578 15.4742 8.5 13.3334 8.5C11.1926 8.5 9.45842 6.76578 9.45842 4.625C9.45842 2.48422 11.1926 0.75 13.3334 0.75C15.4742 0.75 17.2084 2.48422 17.2084 4.625ZM8.25008 13.3571C8.25008 13.9978 8.17444 13.9167 8.52949 13.9167H18.1373C18.4924 13.9167 18.4167 13.9978 18.4167 13.3571C18.4167 11.78 16.1016 10.8333 13.3334 10.8333C10.5652 10.8333 8.25008 11.78 8.25008 13.3571ZM13.3334 9.33333C16.8561 9.33333 19.9167 10.5848 19.9167 13.3571C19.9167 14.8035 19.3455 15.4167 18.1373 15.4167H8.52949C7.32136 15.4167 6.75008 14.8035 6.75008 13.3571C6.75008 10.5848 9.81074 9.33333 13.3334 9.33333ZM4.16675 3.41667C4.58096 3.41667 4.91675 3.75245 4.91675 4.16667L4.91592 6.41667L7.16675 6.41667C7.58096 6.41667 7.91675 6.75245 7.91675 7.16667C7.91675 7.58088 7.58096 7.91667 7.16675 7.91667H4.91592L4.91675 10.1667C4.91675 10.5809 4.58096 10.9167 4.16675 10.9167C3.75253 10.9167 3.41675 10.5809 3.41675 10.1667L3.41591 7.91667H1.16675C0.752534 7.91667 0.416748 7.58088 0.416748 7.16667C0.416748 6.75245 0.752534 6.41667 1.16675 6.41667L3.41591 6.41667L3.41675 4.16667C3.41675 3.75245 3.75253 3.41667 4.16675 3.41667Z"
              fill="currentColor"
            />
          </svg>

          <div className="text-[inherit] font-bold group-hover:text-[inherit]">
            {t("addCustomer", { defaultValue: "Add customer" })}
          </div>
        </div>
      )}

      {showAddCustomer && (
        <div
          onClick={() => setShowAddCustomer(true)}
          className="bg-[#F5F6F7] rounded-[2.5rem] flex items-center justify-between px-3 py-5"
        >
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.7084 4.625C15.7084 3.31265 14.6458 2.25 13.3334 2.25C12.0211 2.25 10.9584 3.31265 10.9584 4.625C10.9584 5.93735 12.0211 7 13.3334 7C14.6458 7 15.7084 5.93735 15.7084 4.625ZM17.2084 4.625C17.2084 6.76578 15.4742 8.5 13.3334 8.5C11.1926 8.5 9.45842 6.76578 9.45842 4.625C9.45842 2.48422 11.1926 0.75 13.3334 0.75C15.4742 0.75 17.2084 2.48422 17.2084 4.625ZM8.25008 13.3571C8.25008 13.9978 8.17444 13.9167 8.52949 13.9167H18.1373C18.4924 13.9167 18.4167 13.9978 18.4167 13.3571C18.4167 11.78 16.1016 10.8333 13.3334 10.8333C10.5652 10.8333 8.25008 11.78 8.25008 13.3571ZM13.3334 9.33333C16.8561 9.33333 19.9167 10.5848 19.9167 13.3571C19.9167 14.8035 19.3455 15.4167 18.1373 15.4167H8.52949C7.32136 15.4167 6.75008 14.8035 6.75008 13.3571C6.75008 10.5848 9.81074 9.33333 13.3334 9.33333ZM4.16675 3.41667C4.58096 3.41667 4.91675 3.75245 4.91675 4.16667L4.91592 6.41667L7.16675 6.41667C7.58096 6.41667 7.91675 6.75245 7.91675 7.16667C7.91675 7.58088 7.58096 7.91667 7.16675 7.91667H4.91592L4.91675 10.1667C4.91675 10.5809 4.58096 10.9167 4.16675 10.9167C3.75253 10.9167 3.41675 10.5809 3.41675 10.1667L3.41591 7.91667H1.16675C0.752534 7.91667 0.416748 7.58088 0.416748 7.16667C0.416748 6.75245 0.752534 6.41667 1.16675 6.41667L3.41591 6.41667L3.41675 4.16667C3.41675 3.75245 3.75253 3.41667 4.16675 3.41667Z"
              fill="currentColor"
            />
          </svg>

          <div className="text-[#1D2939] group-hover:text-[inherit] flex items-center grow">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              className="outline-none w-full grow px-5 bg-[transparent]"
              placeholder={t("customerPlaceholder", { defaultValue: "Enter customer phone number" })}
            />
          </div>

          {!phone && (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.6983 12L9.2318 17.3599C8.87824 17.7841 8.93556 18.4147 9.35984 18.7683C9.78412 19.1218 10.4147 19.0645 10.7682 18.6402L15.7682 12.6402C16.0773 12.2694 16.0773 11.7307 15.7682 11.3599L10.7682 5.35985C10.4147 4.93557 9.78412 4.87825 9.35984 5.23182C8.93556 5.58538 8.87824 6.21594 9.2318 6.64022L13.6983 12Z"
                fill="currentColor"
              />
            </svg>
          )}
          {phone && (
            <div className="text-primaryColor text-[0.75rem] cursor-pointer whitespace-nowrap">
              {t("sendReceipt", { defaultValue: "Send receipt" })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

const QR: FC = () => {
  const { t } = useTranslation("QR");

  const [number, setNumber] = useState("0");
  const chargeNumber = number;

  const handleNumberChange = (action: string | number) => {
    if (action == "+") {
    }
    if (action == "-") {
    }
    if (action == "*") {
    }
    if (action == ":") {
    }
    if (action == "DEL") {
      const newNumber = number.substring(0, number.length - 1);

      if (newNumber.length) {
        setNumber(number.substring(0, number.length - 1));
      } else {
        setNumber("0");
      }
    }
    if (action == ".") {
      if (number.includes(".")) {
        return;
      }

      setNumber(`${number}.`);
    }

    if ("0123456789".includes(`${action}`)) {
      if (number == "0") {
        setNumber(`${action}`);
      } else {
        setNumber(`${number}${action}`);
      }
    }
  };

  return (
    <TabLayout
      title={
        <SwitchActions
          value={0}
          items={[
            {
              title: t("income", { defaultValue: "Income" }),
            },
            {
              title: t("expense", { defaultValue: "Expense" }),
            },
          ]}
        />
      }
    >
      <div className="flex flex-col h-full">
        <div className="h-2/5 flex items-center justify-center flex-col">
          <div className="flex items-center grow">
            <div className="text-[3.75rem] text-[#98A2B3] mr-2">रु</div>
            <div className="text-[#1D2939] text-[3.75rem]">{number}</div>
          </div>

          <div className="w-full px-5">
            <ChargeAction value={chargeNumber}></ChargeAction>
          </div>
        </div>
        <div className="h-3/5 px-5 py-5 flex flex-col">
          <Numpad onClick={handleNumberChange} />

          <AddCustomer />
        </div>
      </div>
    </TabLayout>
  );
};

interface ChargeActionProps {
  value?: string;
}

const ChargeAction: FC<PropsWithChildren<ChargeActionProps>> = (props) => {
  const { t } = useTranslation("ChargeAction");

  const [success, setSuccess] = useState(false);
  const [close, setClose] = useState(true);

  const [showReceive, setShowReceive] = useState(false);

  const navigate = useNavigate();

  const handleSuccess = () => {
    setSuccess(true);

    setTimeout(() => {
      setShowReceive(true);
    }, 2000);
  };

  return (
    <>
      {!close && (
        <div className="fixed top-0 left-0 bg-[#fff] right-0 bottom-0">
          <div>
            <div className="px-5 py-5">
              <svg
                className="cursor-pointer"
                onClick={() => setClose(true)}
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.2075 20.6925C19.6176 21.1025 20.2824 21.1025 20.6925 20.6925C21.1025 20.2824 21.1025 19.6176 20.6925 19.2075L15.4849 14L20.6925 8.79246C21.1025 8.38241 21.1025 7.71759 20.6925 7.30754C20.2824 6.89749 19.6176 6.89749 19.2075 7.30754L14 12.5151L8.79246 7.30754C8.38241 6.89749 7.71759 6.89749 7.30754 7.30754C6.89749 7.71759 6.89749 8.38241 7.30754 8.79246L12.5151 14L7.30754 19.2075C6.89749 19.6176 6.89749 20.2824 7.30754 20.6925C7.71759 21.1025 8.38241 21.1025 8.79246 20.6925L14 15.4849L19.2075 20.6925Z"
                  fill="#344054"
                />
              </svg>
            </div>

            <div className="text-[#1D2939] text-center text-[1.25rem]">
              <p>Show your customer</p>
              <p>this QR to scan & pay</p>
            </div>

            <div
              onClick={() => handleSuccess()}
              style={{
                background: "linear-gradient(164.46deg, #EC2897 -21.23%, #EA4335 89.12%)",
              }}
              className="relative rounded-[1.5rem] aspect-square max-w-[20rem] mx-auto mt-6 flex flex-col items-center justify-center mb-8"
            >
              <div className="text-primaryColorText text-[0.8125rem]">#REDTAB</div>
              <div className="aspect-square rounded-lg bg-[#fff] w-3/5 mt-2 flex items-center justify-center">
                QR Code
              </div>
              <div className="mt-4 text-primaryColorText text-[0.75rem]">
                {t("paymentAmount", { defaultValue: "Payment amount" })}
              </div>
              <div className="text-primaryColorText mt-1 text-[1.75rem] mb-3">
                <span>रु</span>
                <span>{props.value}</span>
              </div>

              {success && (
                <div className="bg-[#039855] absolute w-full transform top-1/2 -translate-y-1/2 left-0 px-4 py-8 text-center text-primaryColorText text-[0.6875rem]">
                  {t("paymentSuccess", { defaultValue: "Payment success" })}
                </div>
              )}
            </div>

            <div className="px-5">
              <div className="flex items-center bg-[#F5F6F7] px-4 py-5 mb-2 rounded-lg gap-2">
                <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20.5" cy="20.5" r="20.5" fill="#D9D9D9" />
                </svg>
                <span className="text-black text-[0.75rem]">{t("cash", { defaultValue: "Cash" })}</span>
              </div>

              <div className="flex items-center bg-[#F5F6F7] px-4 py-5 rounded-lg gap-2">
                <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20.5" cy="20.5" r="20.5" fill="#D9D9D9" />
                </svg>
                <span className="text-black text-[0.75rem]">
                  {t("credit", { defaultValue: "Card (credit/debit)" })}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <ButtonPrimary onClick={() => setClose(false)} className="w-full" size="large">
        {t("charge", { defaultValue: "Charge " })} {props.value}
      </ButtonPrimary>

      {showReceive && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-20">
          <div className="flex flex-col bg-secondaryColor2 h-full">
            <div className="flex items-center w-full justify-between px-5 py-3">
              <svg
                className="cursor-pointer"
                onClick={() => setShowReceive(false)}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.22552 12.5431C6.92483 12.2429 6.92483 11.7579 7.22552 11.4569L14.362 4.32572C14.7961 3.89143 15.5023 3.89143 15.9372 4.32572C16.3713 4.76002 16.3713 5.46488 15.9372 5.89917L9.83231 12.0004L15.9372 18.1C16.3713 18.5351 16.3713 19.24 15.9372 19.6743C15.5023 20.1086 14.7961 20.1086 14.362 19.6743L7.22552 12.5431Z"
                  fill="#25282B"
                />
              </svg>
              <div>
                <svg
                  width="24"
                  onClick={() => navigate("/")}
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.1856 4.85067C12.0651 4.81151 11.9353 4.81151 11.8148 4.85067C11.8015 4.85497 11.7454 4.87468 11.5967 5.00095C11.4399 5.13405 11.247 5.32592 10.9395 5.63344L5.57383 10.9991C5.19764 11.3753 5.11735 11.4638 5.06227 11.5537C5.00196 11.6521 4.95752 11.7594 4.93057 11.8716C4.90596 11.9741 4.90018 12.0935 4.90018 12.6255V17.6C4.90018 18.0349 4.90088 18.3069 4.91763 18.5119C4.93352 18.7064 4.95925 18.76 4.96558 18.7724C5.0231 18.8853 5.11489 18.9771 5.22779 19.0346C5.2402 19.0409 5.2938 19.0666 5.48827 19.0825C5.69325 19.0993 5.96529 19.1 6.40018 19.1H9.10018V15.9C9.10018 14.2984 10.3986 13 12.0002 13C13.6018 13 14.9002 14.2984 14.9002 15.9V19.1H17.6002C18.0351 19.1 18.3071 19.0993 18.5121 19.0825C18.7066 19.0666 18.7602 19.0409 18.7726 19.0346C18.8855 18.9771 18.9773 18.8853 19.0348 18.7724C19.0411 18.76 19.0668 18.7064 19.0827 18.5119C19.0995 18.3069 19.1002 18.0349 19.1002 17.6V12.6255C19.1002 12.0935 19.0944 11.9741 19.0698 11.8716C19.0428 11.7594 18.9984 11.6521 18.9381 11.5537C18.883 11.4638 18.8027 11.3753 18.4265 10.9991L13.0608 5.63344C12.7533 5.32592 12.5605 5.13405 12.4037 5.00095C12.2549 4.87468 12.1988 4.85497 12.1856 4.85067ZM11.2585 3.13877C11.7406 2.98215 12.2598 2.98215 12.7418 3.13877C13.0711 3.24574 13.3347 3.43019 13.5686 3.62874C13.7882 3.81521 14.0332 4.06023 14.3101 4.33708L19.6993 9.72634C19.7182 9.74525 19.737 9.76395 19.7555 9.78246C20.0465 10.073 20.2921 10.3182 20.4728 10.6132C20.6318 10.8726 20.749 11.1555 20.8201 11.4514C20.9008 11.7878 20.9005 12.1348 20.9002 12.546C20.9002 12.5723 20.9002 12.5987 20.9002 12.6255V17.6333C20.9002 18.0248 20.9002 18.3713 20.8768 18.6585C20.8518 18.9643 20.7958 19.2811 20.6386 19.5896C20.4085 20.0411 20.0413 20.4083 19.5898 20.6384C19.2813 20.7956 18.9644 20.8516 18.6587 20.8766C18.3715 20.9 18.025 20.9 17.6335 20.9H14.1888C13.5876 20.9 13.1002 20.4126 13.1002 19.8113V15.9C13.1002 15.2925 12.6077 14.8 12.0002 14.8C11.3927 14.8 10.9002 15.2925 10.9002 15.9V19.8113C10.9002 20.4126 10.4128 20.9 9.81152 20.9H6.36684C5.97534 20.9 5.62885 20.9 5.34169 20.8766C5.03591 20.8516 4.71906 20.7956 4.4106 20.6384C3.95901 20.4083 3.59186 20.0411 3.36176 19.5896C3.2046 19.2811 3.14859 18.9642 3.1236 18.6585C3.10014 18.3713 3.10016 18.0248 3.10018 17.6333L3.10018 12.6255C3.10018 12.5987 3.10016 12.5723 3.10014 12.546C3.09982 12.1348 3.09954 11.7878 3.18031 11.4514C3.25135 11.1555 3.36852 10.8726 3.52752 10.6132C3.70829 10.3182 3.95386 10.073 4.24485 9.78247C4.2634 9.76395 4.28213 9.74525 4.30104 9.72634L9.6903 4.33707C9.96712 4.06022 10.2121 3.8152 10.4318 3.62874C10.6656 3.43019 10.9293 3.24574 11.2585 3.13877Z"
                    fill="#EA4335"
                  />
                </svg>
              </div>
            </div>
            <div className="grow bg-[#fff] mt-8 rounded-t-3xl px-5">
              <div className="-mt-6">
                <svg
                  className="mx-auto"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.14669 5.19484L5.14671 5.19483C9.59791 0.746995 16.0221 0.228571 24 0.228571C31.9677 0.228571 38.3826 0.740999 42.8355 5.17704C47.2971 9.62348 47.7714 16.0428 47.7714 24.0231C47.7714 31.995 47.3023 38.4084 42.8507 42.8566L43.0123 43.0183L42.8507 42.8566C38.4 47.3048 31.9789 47.7714 24 47.7714C16.0211 47.7714 9.59914 47.3048 5.14844 42.8566L5.1484 42.8566C0.696905 38.4093 0.228571 31.995 0.228571 24.0231C0.228571 16.053 0.696906 9.64042 5.14669 5.19484Z"
                    fill="#EA4335"
                    stroke="#E47E76"
                    stroke-width="0.457143"
                  />
                  <path
                    d="M18.375 28.5L18.375 21.75C18.375 21.4516 18.4935 21.1655 18.7045 20.9545C18.9155 20.7435 19.2016 20.625 19.5 20.625C19.7984 20.625 20.0845 20.7435 20.2955 20.9545C20.5065 21.1655 20.625 21.4516 20.625 21.75L20.625 25.7845L27.7041 18.7041C27.8086 18.5995 27.9327 18.5166 28.0692 18.4601C28.2058 18.4035 28.3522 18.3744 28.5 18.3744C28.6478 18.3744 28.7942 18.4035 28.9308 18.4601C29.0673 18.5166 29.1914 18.5995 29.2959 18.7041C29.4005 18.8086 29.4834 18.9327 29.5399 19.0692C29.5965 19.2058 29.6256 19.3522 29.6256 19.5C29.6256 19.6478 29.5965 19.7942 29.5399 19.9308C29.4834 20.0673 29.4005 20.1914 29.2959 20.2959L22.2155 27.375L26.25 27.375C26.5484 27.375 26.8345 27.4935 27.0455 27.7045C27.2565 27.9155 27.375 28.2016 27.375 28.5C27.375 28.7984 27.2565 29.0845 27.0455 29.2955C26.8345 29.5065 26.5484 29.625 26.25 29.625L19.5 29.625C19.2016 29.625 18.9155 29.5065 18.7045 29.2955C18.4935 29.0845 18.375 28.7984 18.375 28.5ZM9.37499 24C9.37499 21.1074 10.2327 18.2799 11.8398 15.8748C13.4468 13.4697 15.7309 11.5952 18.4033 10.4883C21.0756 9.38133 24.0162 9.0917 26.8532 9.65601C29.6902 10.2203 32.2961 11.6132 34.3414 13.6586C36.3868 15.7039 37.7797 18.3098 38.344 21.1468C38.9083 23.9838 38.6187 26.9244 37.5117 29.5967C36.4048 32.2691 34.5303 34.5532 32.1252 36.1602C29.7201 37.7673 26.8925 38.625 24 38.625C20.1225 38.6209 16.4049 37.0787 13.6631 34.3369C10.9212 31.5951 9.37909 27.8775 9.37499 24ZM11.625 24C11.625 26.4475 12.3508 28.8401 13.7106 30.8752C15.0703 32.9102 17.003 34.4964 19.2643 35.433C21.5255 36.3696 24.0137 36.6147 26.4142 36.1372C28.8147 35.6597 31.0198 34.4811 32.7504 32.7504C34.4811 31.0198 35.6597 28.8148 36.1372 26.4142C36.6147 24.0137 36.3696 21.5255 35.433 19.2643C34.4964 17.0031 32.9102 15.0703 30.8752 13.7106C28.8401 12.3508 26.4475 11.625 24 11.625C20.7191 11.6287 17.5736 12.9337 15.2537 15.2537C12.9337 17.5736 11.6287 20.7191 11.625 24Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="text-center text-xs mt-4">
                {t("paymentReceived", { defaultValue: "Payment received" })}
              </div>
              <div className="text-center text-3xl mt-2 mb-8">+15.000.000रु॰</div>

              <div className="bg-[#F8F8F8] flex mb-4">
                <div className="grow flex flex-col items-center p-4">
                  <div className="text-xs text-[#7A7E83] mb-2">IMEPAY transaction ID</div>
                  <div className="text-xs text-[#25282B]">9P2114333</div>
                </div>
                <div className="grow flex flex-col items-center p-4">
                  <div className="text-xs text-[#7A7E83] mb-2">Transaction time</div>
                  <div className="text-xs text-[#25282B]">19/03/2020 - 14:00</div>
                </div>
              </div>

              <div className="bg-[#F8F8F8] flex mb-4">
                <div className="grow flex flex-col items-center p-4">
                  <div className="text-xs text-[#7A7E83] mb-2">Transaction ID</div>
                  <div className="text-xs text-[#25282B]">9P2114333</div>
                </div>
                <div className="grow flex flex-col items-center p-4">
                  <div className="text-xs text-[#7A7E83] mb-2">Transaction time</div>
                  <div className="text-xs text-[#25282B]">19/03/2020 - 14:00</div>
                </div>
              </div>

              <div className="mt-8">
                <div className="text-xs text-[#7A7E83] mb-2">Transaction ID</div>
                <div className="text-base text-[#25282B]">9P2114333</div>
              </div>

              <div className="mt-8">
                <div className="text-xs text-[#7A7E83] mb-2">Wallet name</div>
                <div className="text-base text-[#25282B]">IMEPAY wallet</div>
              </div>

              <div className="mt-8">
                <div className="text-xs text-[#7A7E83] mb-2">Account number</div>
                <div className="text-base text-[#25282B]">1235346363773378</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QR;
