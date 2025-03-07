import { useEffect, useState } from "react";
import TopProfile from "../../components/home/TopProfile";
import WhiteSection from "../../components/home/WhiteSection";
import { TabLayout } from "../../components/TabLayout";
import { getAllProvinces } from "../kyc/merchant/nepal-latest-data";
import { addressObject } from "../kyc/merchant/nepal-latest-data";
import {
  businessTypeSupplier,
  BusinessTypeSupplierData,
} from "../../store/business-type-store/use-business-type-supplier";
import { businessTypeSupplierProduct, OutletData, SupplierProductData } from "../../store/business-type-store/use-supplier-product-list";
import { useGetOutletBusinessType } from "../../store/business-type-store/use-outlet-business-type-store";
import { useSelectedOutletUuidStore } from "../../store/merchant-profile/use-merchant-profile-outlet-store";
import { useLoggedInStaff } from "../../store/team-member-login/use-team-member-login";
import { useStaffOutlet } from "../../store/team-member-login/use-team-member-outlet";

const Home = () => {
  const [businessType, setBusinessType] = useState<BusinessTypeSupplierData[]>([]);
  const [outlets, setOutlets] = useState<OutletData[]>([]);
  const [products, setProducts] = useState<SupplierProductData[]>([]);
  const { getOutletBusinessType  } = useGetOutletBusinessType();
  const {selectedOutletId} = useSelectedOutletUuidStore();
  const { getBusinessTypeSupplier } = businessTypeSupplier();
  const { getAllSupplierProducts } = businessTypeSupplierProduct();
  const { staffOutletUUID } = useLoggedInStaff();
  const { staffOutlet } = useStaffOutlet();

  // fetch business type supplier and supplier products
  useEffect(() => {

    const fetchStaffOutlet = async () => {
    if (staffOutletUUID) {
      await staffOutlet(staffOutletUUID);
    }
  }
    const fetchBusinessType = async () => {
      if (selectedOutletId) {
        await getOutletBusinessType(selectedOutletId);
      }
    };
    
    const fetchBusinessTypeSupplier = async () => {
      const business = await getBusinessTypeSupplier();
      setBusinessType(business);
    };
    const fetchSupplierProducts = async () => {
      const { outlets, products } = await getAllSupplierProducts();
      setOutlets(outlets);
      setProducts(products);
    };
    fetchStaffOutlet();
    fetchBusinessType();
    fetchSupplierProducts();
    fetchBusinessTypeSupplier();
  }, []);

  getAllProvinces(addressObject);
  return (
    <TabLayout noMy={true} >
      <div className="flex flex-col bg-primaryColor w-full h-auto">
        <TopProfile />
        <WhiteSection businessType={businessType} outlets={outlets} products={products}/>
      </div>
    </TabLayout>
  );
};

export default Home;
