import React from "react";
import { useCartStore } from "../../store/product-cart-store/use-product-cart";

const SupplierCartInvoice = () => {
  const { cart } = useCartStore();
  
  return (
    <>
      {cart?.map((item, index: number) => (
        <div
          key={index}
          className={`flex justify-between items-center py-4 mx-5 ${
            index < cart.length - 1 ? "border-b-[0.5px] border-dashed border-[#D0D5DD]" : ""
          }`}
        >
          <h6
            style={{ width: "120px" }}
            className="min-w-[90px] font-medium text-sm text-wrap font-poppins text-[#EA4335]"
          >
            {item.product.name}
          </h6>
          <p className="text-sm text-end font-poppins font-semibold text-[#1D2939]">{item.count}</p>
          <h2
            style={{ width: "120px" }}
            className="min-w-[90px] text-sm text-end font-poppins font-semibold text-[#1D2939]"
          >
            {item.itemTotal}
            <span className="text-secondaryColorTextBtn text-sm font-poppins font-semibold">रु</span>
          </h2>
        </div>
      ))}
    </>
  );
};

export default SupplierCartInvoice;
