import React from "react";
import {
  SupplierProductData,
  useSupplierProductListStore,
} from "../../store/business-type-store/use-supplier-product-list";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

interface HomeCardsProps {
  productList?: SupplierProductData[];
  name?: string;
  uuid?: string;
}

const HomeCards: React.FC<HomeCardsProps> = (props) => {
  const navigate = useNavigate();
  const { setSelectedSupplierName, setSelectedSupplierUUID } = useSupplierProductListStore();

  // filter the product list of particular supplier
  const filtered = props?.productList?.filter((product) => product.fk_outlet_uuid === props.uuid);

  const handleSupplier = (name: string) => {
      setSelectedSupplierName(name);
      setSelectedSupplierUUID(props?.uuid as string);
      navigate("/product-list");
  };

  return (
    <>
      {filtered?.length !== 0 && (
        <div className="py-4 flex w-full flex-col">
          <div className="w-full px-4 flex items-center justify-between">
            <p
              className="w-[250px] font-semibold text-sm pb-1 cursor-pointer"
              onClick={() => handleSupplier(props?.name as string)}
            >
              {props?.name}
            </p>
            <span
              className="h-[28px] w-[65px] ms-auto text-xs bg-[#EAECF0] font-semibold font-poppins flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => handleSupplier(props?.name as string)}
            >
              View all
            </span>
          </div>
          <div className="w-full overflow-scroll flex gap-3 p-4 no-scrollbar">
            {filtered?.map((product, index) => (
              <Card
                key={index}
                uuid={product.uuid}
                name={product.name}
                img={product.product_image}
                short_desc={product.short_description}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default HomeCards;
