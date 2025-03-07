import { BusinessTypeSupplierData } from "../../store/business-type-store/use-business-type-supplier";
import { OutletData, SupplierProductData } from "../../store/business-type-store/use-supplier-product-list";
import Feature from "./Feature";
import HomeCards from "./HomeCards";
import Stories from "./Stories";

interface WhiteSectionProps {
  businessType?: BusinessTypeSupplierData[];
  outlets?: OutletData[];
  products?: SupplierProductData[];
}

const WhiteSection: React.FC<WhiteSectionProps> = (props) => {
  
  return (
    <div className="rounded-t-[20px] bg-primaryColorText flex flex-col py-4">
      <div className="flex justify-between px-4 items-center">
        <p className="text-secondaryTextColor text-xs">Explore supplier in your city</p>
         <select
          className="text-sm font-semibold outline-0"
          value="All"
        >
          <option value="All">All Over Nepal</option>
        </select>
      </div>
      <Stories businessType={props?.businessType} />
      <Feature />

      {props?.outlets?.map((outlet, index) => (
        <HomeCards key={index} uuid={outlet.uuid} name={outlet.outlet_name} productList={props?.products} />
      ))}
    </div>
  );
};

export default WhiteSection;
