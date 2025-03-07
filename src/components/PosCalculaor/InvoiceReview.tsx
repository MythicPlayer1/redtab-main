import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonPrimary } from "../../components/Button/ButtonPrimary";
import LeftArrowButton from "../Button/LeftArrowButton";
import { useGetOultetDetails, usePosCalculator } from "../../store/pos-calculator/pos-calculator";
import { UseDataForPayload, useSubmitBillingStore } from "../../store/pos-calculator/billing";
import { usePosCalculateAmount } from "../../store/pos-calculator/pos-cal-store";
import AddCustomer from "./AddCustomer";
import InvoiceReviewTopProfile from "./Invoice-review-top-profile";
import { useCalculationStore } from "../../store/pos-calculator/pos-calculation-store";
import { useSelectedOutletUuidStore } from "../../store/merchant-profile/use-merchant-profile-outlet-store";
import { PaymentMethod } from "./payment-method";
import { convertDate, convertDateToNepaliFormat } from "../../utils/useful-func";
import { useGoodReceiveCreateStore } from "../../store/pos-calculator/use-goodreceive-create";
import PosCartInvoice from "./PosCartInvoice";

interface Staff {
  id: number;
  name: string;
}

const initialStaffData: Staff[] = [{ id: 1, name: "Farum Azula" }];

const PosInvoiceReview: React.FC = () => {
  const { selectedPaymentMethod, setSelectedPaymentMethod } = UseDataForPayload.getState();
  console.log(selectedPaymentMethod);
  const [, setStaffData] = useState<Staff[]>([]);
  const navigate = useNavigate();
  const { getOutletDetails, outletDetails } = useGetOultetDetails();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { dataForPayload, dataForPayLoad1, clearPayload, clearPayload1, setDataForPayload, isFromSelectFeild } =
    UseDataForPayload();
  const { postForBilling } = usePosCalculator();
  const { postForReceipt, postBillingForQr } = useSubmitBillingStore();
  const {
    calculatedAmount,
    showAddCustomer,
    setShowAddCustomer,
    totalDiscountAmount,
    setTotalDiscountAmount,
    setQrAmount,
  } = usePosCalculateAmount();
  const { inputValueArray } = useCalculationStore();
  const { postForGoodReceipt } = useGoodReceiveCreateStore();
  const payMethodDiv = useRef<HTMLDivElement>(null);
  const topDivRef = useRef<HTMLDivElement>(null);
  const [divHeight, setDivHeight] = useState<number>(0);
  const { selectedOutletId } = useSelectedOutletUuidStore.getState();
 // const counter = Number(localStorage.getItem("counter"));


  
  //fetching the outlet details if the merchant is selected
  useEffect(() => {
    if (dataForPayload?.merchant_or_customer === "merchant") {
      getOutletDetails(dataForPayload?.buyer_uuid as string);
    }
    setStaffData(initialStaffData);
  }, [dataForPayload]);

  // for enable or disable the pay button
  useEffect(() => {
    if (selectedPaymentMethod && dataForPayload?.merchant_or_customer) {
      setIsDisabled(false);
    }
  }, [selectedPaymentMethod, dataForPayload?.merchant_or_customer]);

  //for handling the pay button click base on the selected payment method
  const handlePayClick = async () => {
    const { setCalculatedAmount, setExpressions } = usePosCalculateAmount.getState();
    const { transactionType, setTransactionType } = usePosCalculateAmount.getState();
    //const { setSelectedPaymentMethod } = UseDataForPayload.getState();

    if (selectedPaymentMethod === "receipt") {
      const payLoadDataForReceipt = {
        ...dataForPayLoad1,
        payment_method: selectedPaymentMethod,
        payment_type: selectedPaymentMethod,
        fk_outlet_uuid: selectedOutletId,
        transaction_type: transactionType,
        total_sales: calculatedAmount,
      };
      setIsDisabled(true);
      await postForReceipt(payLoadDataForReceipt);
      if (useSubmitBillingStore?.getState().isLoading === true) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
      if (useSubmitBillingStore.getState().verifySuccess === true) {
        setCalculatedAmount(0);
        setExpressions("0");
        navigate("/pos-invoice");
        clearPayload1();
        setTransactionType("sales");
       // setSelectedPaymentMethod("cash");
        clearPayload();
        useSubmitBillingStore.getState().setVerifySuccess(false);
      }
    } else if (selectedPaymentMethod === "qr") {
      const date = convertDate();
      const nepaliDate = convertDateToNepaliFormat();
      if (transactionType === "sales") {
        setQrAmount(calculatedAmount);
        if (isFromSelectFeild === true) {
          setDataForPayload({
            ...dataForPayload,
            payment_method: selectedPaymentMethod,
            payment_type: "sct",
            fk_outlet_uuid: selectedOutletId,
            transaction_type: transactionType,
          });
        } else {
          setDataForPayload({
            total_sales: calculatedAmount,
            invoice_english_date: date,
            invoice_nepali_date: nepaliDate,
            payment_method: selectedPaymentMethod,
            payment_type: "sct",
            buyer_name: "Counter Bill",
            fk_outlet_uuid: selectedOutletId,
            transaction_type: transactionType,
            merchant_or_customer: "customer",
          });
        }
        const payLoadDataForQr = {
          outlet_uuid: selectedOutletId,
          amount: calculatedAmount,
        };
        setIsDisabled(true);
        await postBillingForQr(payLoadDataForQr);
        if (useSubmitBillingStore.getState().isLoading === true) {
          setIsDisabled(true);
        } else {
          setIsDisabled(false);
        }
        if (useSubmitBillingStore.getState().verifySuccess === true) {
          navigate("/pos-charge-action");
          useSubmitBillingStore.getState().setVerifySuccess(false);
        }
      } else {
        setIsDisabled(true);
        await postForGoodReceipt({
          nepali_date: date,
          english_date: nepaliDate,
          total_product_amount: calculatedAmount,
          fk_outlet_uuid: selectedOutletId,
          payment_method: selectedPaymentMethod,
          transaction_type: transactionType,
        });
        if (useGoodReceiveCreateStore.getState().isLoading === true) {
          setIsDisabled(true);
        } else {
          setIsDisabled(false);
        }
        if (useGoodReceiveCreateStore.getState().verifySuccess === true) {
          clearPayload1();
          clearPayload();
          setTransactionType("sales");
         // setSelectedPaymentMethod("cash");
          setExpressions("0");
          navigate("/home");
        }
      }
    } else if (selectedPaymentMethod === "cash") {
      const date = convertDate();
      const nepaliDate = convertDateToNepaliFormat();
      const payLoadForCashPayment = {
        ...dataForPayload,
        fk_outlet_uuid: selectedOutletId,
        transaction_type: transactionType,
        payment_method: selectedPaymentMethod,
        payment_type: selectedPaymentMethod,
        total_sales: calculatedAmount,
        invoice_english_date: date,
        invoice_nepali_date: nepaliDate,
      };
      const payLoadForCashWithoutUser = {
        fk_outlet_uuid: selectedOutletId,
        transaction_type: transactionType,
        payment_method: selectedPaymentMethod,
        payment_type: selectedPaymentMethod,
        total_sales: calculatedAmount,
        invoice_english_date: date,
        invoice_nepali_date: nepaliDate,
        merchant_or_customer: "customer",
        buyer_name: "Counter Bill",
      };
      setIsDisabled(true);
      {
        !dataForPayload?.merchant_or_customer
          ? await postForBilling(payLoadForCashWithoutUser)
          : await postForBilling(payLoadForCashPayment);
      }
      if (usePosCalculator.getState().isLoading === true) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
      if (usePosCalculator.getState().verifySuccess === true) {
        clearPayload1();
        clearPayload();
        setCalculatedAmount(0);
        setExpressions("0");
        setTransactionType("sales");
       // setSelectedPaymentMethod("cash");
        navigate("/pos-invoice");
        usePosCalculator.getState().setVerifySuccess(false);
      }
    }
  };
  const HalfCircleLine: React.FC = () => {
    const [circleCount, setCircleCount] = useState<number>(14);

    const updateCircleCount = () => {
      const circleWidth = 22;
      const screenWidth = window.innerWidth;
      const newCircleCount = Math.floor(screenWidth / circleWidth);
      setCircleCount(newCircleCount);
    };
    useEffect(() => {
      updateCircleCount();
      window.addEventListener("resize", updateCircleCount);
      return () => {
        window.removeEventListener("resize", updateCircleCount);
      };
    }, []);
    return (
      <div className="w-full flex space-x-2 absolute bottom-[-30px]">
        {new Array(circleCount).fill(0).map((_, index) => (
          <div
            key={index}
            className="border-t-2 h-[34px] w-6 rounded-lg relative bg-primaryColorText border-[#F5F6F7]"
            style={{ bottom: "6px", left: "12px" }}
          />
        ))}
      </div>
    );
  };

  // filter the negative values and calculate the total discount amount. Seperate the negative values and calculate the total discount amount
  useEffect(() => {
    const totalNegativeSum = inputValueArray
      ?.filter((item: number) => item < 0)
      .reduce((acc: number, curr: number) => acc + curr, 0);

    setTotalDiscountAmount(-totalNegativeSum);
  }, [inputValueArray]);

  // set the height of the list according to the screen height
  useEffect(() => {
    if (payMethodDiv.current && topDivRef.current) {
      const listHeight =
        ((((window.innerHeight - payMethodDiv?.current?.offsetHeight) as number) -
          topDivRef?.current?.offsetHeight) as number) - 26;
      setDivHeight(listHeight);
    }
  }, []);

  return (
    <>
      <div className="w-auto relative h-screen">
        <div className="flex flex-col" ref={topDivRef}>
          <div className="flex items-center mb-2  h-[44px] mt-[25px] text-[16px] font-poppins font-semibold leading-6 text-[#1D2939] ml-[23px] text-center">
            <LeftArrowButton to={"/pos-calculator"} />
            <div className="w-full pr-[64px] justify-center">Invoice Review</div>
          </div>
          <div>
            {dataForPayload?.merchant_or_customer === "merchant" && (
              <div>
                {!showAddCustomer ? (
                  <InvoiceReviewTopProfile
                    onClick={() => setShowAddCustomer(true)}
                    name={outletDetails?.outlet_name}
                    location={outletDetails?.location}
                    pan={outletDetails?.pan}
                  />
                ) : (
                  <AddCustomer showAddCustomer={showAddCustomer} />
                )}
              </div>
            )}
            {dataForPayload?.merchant_or_customer === "customer" && (
              <div>
                {!showAddCustomer ? (
                  <InvoiceReviewTopProfile
                    onClick={() => setShowAddCustomer(true)}
                    name={dataForPayload?.customer_name || dataForPayload?.buyer_name}
                    pan={dataForPayload?.buyer_pan}
                  />
                ) : (
                  <AddCustomer showAddCustomer={showAddCustomer} />
                )}
              </div>
            )}
            {!dataForPayload.merchant_or_customer && <AddCustomer showAddCustomer={showAddCustomer} />}
          </div>
        </div>

        <div className="mt-6 flex flex-col  justify-between  bg-primaryColorText">
          <div className="w-full px-4 " style={{ minHeight: divHeight }}>
            <div className="w-full relative flex flex-col   rounded-t-[12px] bg-[#F5F6F7]">
              <span className="flex justify-between items-center py-4 mx-5  border-b-[0.5px] border-dashed border-[#D0D5DD]">
                <h6 className="font-normal text-sm font-poppins">Total</h6>
                <h2 className=" text-primaryColor text-2xl font-poppins font-semibold flex items-center">
                  <p>{calculatedAmount}</p>
                  <span className="text-secondaryColorTextBtn text-2xl font-poppins font-semibold">रु</span>
                </h2>
              </span>
              <div className="w-full flex flex-col">
                <PosCartInvoice />
                <div className="w-full px-4 py-4 flex flex-col items-end">
                  <p className="text-primaryColor text-xs font-medium">Total Discount : {totalDiscountAmount}</p>
                </div>
              </div>
              <HalfCircleLine />
            </div>
          </div>
          <div className={`sticky bottom-0 min-h-full flex flex-col bg-primaryColorText `} ref={payMethodDiv}>
            <div className="p-4 grid grid-cols-1 w-full ">
              <h4 className="font-poppins font-medium text-xs text-[#667085]  mb-3">How would you like to be paid?</h4>
              <div className="shadow-lg  rounded-[12px] py-4 ">
                <PaymentMethod setSelectedPayment={setSelectedPaymentMethod} />
              </div>
            </div>
            <div className="w-full p-4">
              <ButtonPrimary
                className="w-full font-semibold bg-[#EA4335] "
                size="large"
                disabled={isDisabled}
                onClick={handlePayClick}
              >
                {selectedPaymentMethod === "cash"
                  ? "Pay with Cash"
                  : selectedPaymentMethod === "qr"
                  ? "Pay with QR"
                  : selectedPaymentMethod === "receipt"
                  ? "Send Receipt"
                  : "Pay"}
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PosInvoiceReview;
