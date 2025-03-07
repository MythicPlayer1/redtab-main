import React from "react";

import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import {
  SupplierProductData,
  useSupplierProductListStore,
} from "../../store/business-type-store/use-supplier-product-list";
import { useCartStore } from "../../store/product-cart-store/use-product-cart";
import ProductListLayout from "../../components/product-cart/ProductCartLayout";

const SupplierProductCart = () => {
  const accessToken = localStorage?.getItem("token-storage");
  const accessTokenExist = JSON?.parse(accessToken as string)?.state?.accessToken;
  const { products, selectedSupplierName, selectedSupplierUUID } = useSupplierProductListStore();
  const { cart, total, addToCart, increaseItemCount, decreaseItemCount } = useCartStore();

  const isSelectedSupplierInCart = cart?.some((item) => item.product.fk_outlet_uuid === selectedSupplierUUID);

  // suggest message if user is not logged in
  const handleMessage = () => {
    toast.error("You must logged in to use this feature");
  };

  const handleAddProduct = (product: SupplierProductData) => {
    if (accessTokenExist && selectedSupplierUUID && !isSelectedSupplierInCart  && cart.length > 0) {
      toast.error("You can't add products from multiple suppliers");
    } else {
      addToCart(product);
    }
  };

  return (
    <ProductListLayout title={selectedSupplierName} total={total}>
      <div className="h-[calc(100dvh-138px)] overflow-y-scroll flex flex-col gap-y-5">
        {products
          ?.filter((product) => product.fk_outlet_uuid === selectedSupplierUUID)
          ?.map((product, index) => {
            const cartItem = cart?.find((item) => item.product.uuid === product.uuid);
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="w-[174px] flex items-center space-x-2">
                  {product.product_image ? (
                    <img
                      src={product.product_image}
                      alt="product_image"
                      className="w-[25px] h-[25px] object-cover rounded-full"
                    />
                  ) : (
                    <img
                      src="/app.jpeg"
                      alt="product_image"
                      className="w-[25px] h-[25px] object-cover border border-black rounded-full"
                    />
                  )}
                  <h2
                    className="text-[15px] font-medium font-poppins text-[#EA4335] overflow-wrap break-word pe-1"
                    style={{ flexGrow: 1, minWidth: "90px", maxWidth: "200px" }}
                  >
                    {product.name}
                  </h2>
                </div>
                <div className="w-[174px] flex justify-between items-center">
                  <h2 className="w-[100px] text-start text-sm font-poppins font-semibold text-[#1D2939]">
                    {cartItem?.itemTotal || product.base_price}
                    <span className="text-secondaryColorTextBtn text-sm font-poppins font-semibold">रु</span>
                  </h2>
                  {!accessTokenExist ? (
                    <button className="bg-[#EA4335] rounded-[5px] py-[4px] min-w-[65px]" onClick={handleMessage}>
                      <p className="text-[#ffffff] text-sm font-poppins ">Add</p>
                    </button>
                  ) : cartItem ? (
                    <div className="flex justify-between items-center min-w-[65px]">
                      <FaMinus size={16} color="#EA4335" onClick={() => decreaseItemCount(product.uuid)} />
                      <p className="text-sm font-poppins font-semibold text-[#1D2939]">{cartItem.count}</p>
                      <FaPlus size={16} color={"#EA4335"} onClick={() => increaseItemCount(product.uuid)} />
                    </div>
                  ) : (
                    <button
                      className="bg-[#EA4335] rounded-[5px] py-[4px] min-w-[65px]"
                      onClick={() => handleAddProduct(product)}
                    >
                      <p className="text-[#ffffff] text-sm font-poppins ">Add</p>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </ProductListLayout>
  );
};

export default SupplierProductCart;
