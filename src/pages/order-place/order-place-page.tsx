import React from "react";
import LeftArrowButton from "../../components/Button/LeftArrowButton";
import OrderPlace from "../../components/order-place/OrderPlace";
import CartInvoiceTopProfile from "../../components/order-place/cart-invoice-top-profile";

const OrderPlacePage = () => {
  return (
    <div className="w-auto h-screen overflow-y-hidden">
      <div className="flex flex-col">
        <div className="flex items-center mb-2 h-[44px] mt-[25px] text-[16px] font-poppins font-semibold leading-6 text-[#1D2939] ml-[23px] text-center">
          <LeftArrowButton to={"/product-list"} />
          <div className="w-full pr-[64px] justify-center">Invoice Review</div>
        </div>
        <CartInvoiceTopProfile />
      </div>
      <OrderPlace />
    </div>
  );
};

export default OrderPlacePage;