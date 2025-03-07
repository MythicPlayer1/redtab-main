import React from "react";
import LeftArrowButton from "../Button/LeftArrowButton";
import { BsCart3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/product-cart-store/use-product-cart";
import { toast } from "react-toastify";
import { useSupplierProductListStore } from "../../store/business-type-store/use-supplier-product-list";

interface ProductCartLayoutProps {
  title: string;
  children: React.ReactNode;
  total?: number;
}
const ProductListLayout: React.FC<ProductCartLayoutProps> = ({ title, children, total }) => {
  const accessToken = localStorage?.getItem("token-storage");
  const accessTokenExist = JSON?.parse(accessToken as string)?.state?.accessToken;
  const { cart } = useCartStore();
  const { selectedSupplierUUID } = useSupplierProductListStore();
  const navigate = useNavigate();

  // handle cart click
  const handleCartClick = () => {
    if (!accessTokenExist) {
      toast.error("You must logged in to use this feature");
    } else if (cart?.length === 0) {
      toast.error("Products are not added to cart");
    } else {
      navigate("/order-place");
    }
  };
  
  // check if selected supplier is in cart
  const isSelectedSupplierInCart = cart?.some((item) => item.product.fk_outlet_uuid === selectedSupplierUUID);

  return (
    <div className="w-full min-h-screen flex flex-col justify-between  overflow-hidden px-4 pb-4">
      <div className="flex  justify-between items-center mb-3 mt-[25px] text-[16px] font-poppins font-semibold leading-6 text-[#1D2939]">
        <LeftArrowButton to="/home" />
        <div className="flex-1 text-center">{title}</div>
        <div className="w-[28px]"></div>
      </div>
      {children}
      <div className="flex space-x-1 justify-end items-center">
        {cart?.length !== 0 && isSelectedSupplierInCart ? (
          <h2 className="flex items-center space-x-[2px] pt-1 text-md font-poppins font-semibold text-[#1D2939]">
            <p>{total}</p>
            <span className="text-secondaryColorTextBtn text-sm font-poppins font-semibold">रु</span>
          </h2>
        ) : cart?.length === 0 && accessTokenExist ? (
          <h2 className="flex items-center space-x-[2px] pt-1 text-md font-poppins font-semibold text-[#1D2939]">
            <p>0</p>
            <span className="text-secondaryColorTextBtn text-sm font-poppins font-semibold">रु</span>
          </h2>
        ) : null}
        <BsCart3 className="cursor-pointer" size={26} color="#EA4335" onClick={handleCartClick} />
      </div>
    </div>
  );
};

export default ProductListLayout;
