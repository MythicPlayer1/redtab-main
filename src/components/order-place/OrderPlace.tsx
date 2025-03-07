import React, { useEffect, useState } from "react";
import SupplierCartInvoice from "./SupplierCartInvoice";
import { ButtonPrimary } from "../Button/ButtonPrimary";
import { useCartStore } from "../../store/product-cart-store/use-product-cart";
import { usePosCalculateAmount } from "../../store/pos-calculator/pos-cal-store";
import { useOrderCreate } from "../../store/order-place-store/use-order-create";
import { useSelectedOutletUuidStore } from "../../store/merchant-profile/use-merchant-profile-outlet-store";
import { useSupplierProductListStore } from "../../store/business-type-store/use-supplier-product-list";
import { useNavigate } from "react-router-dom";

const OrderPlace = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { total, orderDetails, clearCart } = useCartStore();
  const { totalDiscountAmount } = usePosCalculateAmount();
  const { orderCreate } = useOrderCreate();
  const { selectedOutletId } = useSelectedOutletUuidStore.getState();
  const { selectedSupplierUUID } = useSupplierProductListStore();

  // handle order create
  const handleOrderPlace = async () => {
    setIsDisabled(true);
    await orderCreate({
      buyer_outlet: selectedOutletId,
      total_amount: total,
      seller_outlet: selectedSupplierUUID,
      order_details: orderDetails && orderDetails,
    });

    // check if order create is loading then disable the button else enable
    if (useOrderCreate?.getState()?.isLoading === true) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }

    // if order create success then clear cart and navigate to home page
    if (useOrderCreate?.getState()?.verifySuccess) {
      clearCart();
      navigate("/home");
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

  return (
    <div className="h-[calc(100dvh-173px)] mt-6 flex flex-col justify-between">
      <div className="w-full px-4">
        <div className="w-full relative flex flex-col rounded-t-[12px] bg-[#F5F6F7]">
          <span className="flex justify-between items-center py-4 mx-5 border-b-[0.5px] border-dashed border-[#D0D5DD]">
            <h6 className="font-normal text-sm font-poppins">Total</h6>
            <h2 className="text-primaryColor text-2xl font-poppins font-semibold flex items-center">
              <p>{total}</p>
              <span className="text-secondaryColorTextBtn text-2xl font-poppins font-semibold">रु</span>
            </h2>
          </span>
          <div className="w-full flex flex-col">
            <SupplierCartInvoice />
            <div className="w-full px-4 py-4 flex flex-col items-end">
              <p className="text-primaryColor text-xs font-medium">Total Discount : {totalDiscountAmount}</p>
            </div>
          </div>
          <HalfCircleLine />
        </div>
      </div>
      <div className="sticky border-none bottom-0 outline-none flex flex-col bg-primaryColorText">
        <div className="w-full p-4 border-none">
          <ButtonPrimary
            className="w-full font-semibold bg-[#EA4335]"
            size="large"
            disabled={isDisabled}
            onClick={handleOrderPlace}
          >
            Order Place
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default OrderPlace;
