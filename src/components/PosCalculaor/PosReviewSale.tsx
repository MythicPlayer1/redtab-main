import React from "react";
import { useTranslation } from "react-i18next";
import LeftArrowButton from "../Button/LeftArrowButton";
import { useEffect, useState } from "react";
import { ButtonPrimary } from "../../components/Button/ButtonPrimary";

interface Product {
  name: string;
  price: number;
}

const PosReviewSale: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { t } = useTranslation("QR");

  useEffect(() => {
    // Simulate fetching data
    const fetchedProducts: Product[] = [
      { name: "Changed Product Name", price: 245 },
      { name: "Product name 2", price: 426 },
    ];
    setProducts(fetchedProducts);
  }, []);

  // Calculate the total price of all products
  const totalPrice = products.reduce((total, product) => total + product.price, 0);

  return (
    <div className="bg-secondaryColor2">
      {/* first part */}
      <div style={{ borderRadius: "0px 0px 24px 24px" }} className="bg-primaryColorText rounded-[24px] ">
        <div className="px-2">
        <div className="flex justify-center w-full h-[44px] text-[16px] font-poppins font-semibold leading-6 text-[#1D2939]  text-center">
          <div className="flex   mt-[24px]">
            <LeftArrowButton to="/pos-calculator" />
            <span>Review Sale</span>
          </div>
        </div>
        </div>
        <div className="px-4 py-4">
          <div className="bg-[#F5F6F7] group gap-2 rounded-[2.5rem] flex items-center justify-center  cursor-pointer hover:bg-primaryColor text-primaryColor hover:text-[#fff] w-full h-[44px] mt-[18px]">
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15.7084 4.625C15.7084 3.31265 14.6458 2.25 13.3334 2.25C12.0211 2.25 10.9584 3.31265 10.9584 4.625C10.9584 5.93735 12.0211 7 13.3334 7C14.6458 7 15.7084 5.93735 15.7084 4.625ZM17.2084 4.625C17.2084 6.76578 15.4742 8.5 13.3334 8.5C11.1926 8.5 9.45842 6.76578 9.45842 4.625C9.45842 2.48422 11.1926 0.75 13.3334 0.75C15.4742 0.75 17.2084 2.48422 17.2084 4.625ZM8.25008 13.3571C8.25008 13.9978 8.17444 13.9167 8.52949 13.9167H18.1373C18.4924 13.9167 18.4167 13.9978 18.4167 13.3571C18.4167 11.78 16.1016 10.8333 13.3334 10.8333C10.5652 10.8333 8.25008 11.78 8.25008 13.3571ZM13.3334 9.33333C16.8561 9.33333 19.9167 10.5848 19.9167 13.3571C19.9167 14.8035 19.3455 15.4167 18.1373 15.4167H8.52949C7.32136 15.4167 6.75008 14.8035 6.75008 13.3571C6.75008 10.5848 9.81074 9.33333 13.3334 9.33333ZM4.16675 3.41667C4.58096 3.41667 4.91675 3.75245 4.91675 4.16667L4.91592 6.41667L7.16675 6.41667C7.58096 6.41667 7.91675 6.75245 7.91675 7.16667C7.91675 7.58088 7.58096 7.91667 7.16675 7.91667H4.91592L4.91675 10.1667C4.91675 10.5809 4.58096 10.9167 4.16675 10.9167C3.75253 10.9167 3.41675 10.5809 3.41675 10.1667L3.41591 7.91667H1.16675C0.752534 7.91667 0.416748 7.58088 0.416748 7.16667C0.416748 6.75245 0.752534 6.41667 1.16675 6.41667L3.41591 6.41667L3.41675 4.16667C3.41675 3.75245 3.75253 3.41667 4.16675 3.41667Z"
                fill="currentColor"
              />
            </svg>

            <div className="text-[inherit] group-hover:text-[inherit] text-[14px] font-semibold  font-poppins text-[#EA4335]">
              {t("addCustomer", { defaultValue: "Add customer" })}
            </div>
          </div>
        </div>
      </div>
      {/* second part */}
      <div style={{ borderRadius: "20px 20px 0px 0px" }} className="bg-primaryColorText rounded-[24px] mt-[8px]">
        <div className="p-4">
          <h2 className=" font-poppins font-semibold text-[16px] leading-6 text-[#1D2939]">{products.length} items</h2>
          <div>
            <ul className="mt-3 ">
              {products.map((product, index) => (
                <li
                  key={index}
                  className="text-[#EA4335] text-sm font-poppins font-medium mb-[16px] flex justify-between"
                >
                  {product.name}
                  <div className="text-[#1D2939] font-medium">
                    {product.price}
                    <span className="text-secondaryColorTextBtn">रु</span>{" "}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-5">
        <ButtonPrimary className="w-full h-[44px] flex justify-center items-center font-semibold " size="large">
          {t("charge", { defaultValue: "Charge " })}{totalPrice}
          <span className="text-[14px] font-normal">रु॰</span>
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default PosReviewSale;
