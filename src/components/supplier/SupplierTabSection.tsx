import React, { useEffect, useRef, useState, useCallback } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import {
  businessTypeSupplier,
  OutletData,
  SupplierProductData,
  useBusinessSupplierStore,
} from "../../store/business-type-store/use-business-type-supplier";
import { useParams } from "react-router-dom";
import HomeCards from "../home/HomeCards";

interface SupplierTabSectionProps {}

const SupplierTabSection: React.FC<SupplierTabSectionProps> = () => {
  const [outlets, setOutlets] = useState<OutletData[]>([]);
  const [products, setProducts] = useState<SupplierProductData[]>([]);
  const { uuid } = useParams<{ uuid: string }>();
  const [selectedTabUUID, setSelectedTabUUID] = useState<string | undefined>(uuid);
  const { subType } = useBusinessSupplierStore();
  const selectedIndex = subType?.findIndex((business) => business.uuid === uuid);
  const selectedTabRef = useRef<HTMLButtonElement | null>(null);
  const { getSubTypeSupplier } = businessTypeSupplier();

  // scroll to selected tab
  useEffect(() => {
    if (selectedTabRef.current) {
      selectedTabRef.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [selectedIndex]);

  // fetch business type supplier and supplier products
  const fetchBusinessType = useCallback(async () => {
    if (selectedTabUUID) {
      const { outlets, products } = await getSubTypeSupplier(selectedTabUUID);
      setOutlets(outlets);
      setProducts(products);
    }
  }, [selectedTabUUID, getSubTypeSupplier]);
  
  useEffect(() => {
    fetchBusinessType();
  }, [fetchBusinessType]);

  // filter outlets with products
  const filteredOutlet = outlets?.filter((outlet) => products?.some((product) => product.fk_outlet_uuid === outlet.uuid))
 
  return (
    <div className="w-full">
      <TabGroup defaultIndex={selectedIndex !== -1 ? selectedIndex : 0}>
        <TabList className="w-[auto] px-4 overflow-scroll py-1 flex gap-4 font-medium text-normal text-[#667085]">
          {subType?.map((business, key) => (
            <Tab
              key={key}
              onClick={() => setSelectedTabUUID(business.uuid)}
              ref={selectedIndex === key ? selectedTabRef : null}
              className={({ selected }) =>
                selected
                  ? "relative after:content-[''] after:absolute after:bottom-[-1.8px] after:left-1/2 after:w-[22px] after:h-[3px] after:rounded-lg after:bg-secondaryColorText after:transform after:-translate-x-1/2 text-secondaryColorText focus:outline-none text-nowrap"
                  : "focus:outline-none text-nowrap"
              }
            >
              {business.business_type_name}
            </Tab>
          ))}
        </TabList>
        <div className="h-[1px] w-full mt-1 bg-[#e0e0e1]"></div>
        <TabPanels>
          {subType?.map((_, index) => (
            <TabPanel key={index} className="flex flex-col gap-2">
              <div className="pt-4 flex w-full flex-col">
                {filteredOutlet
                ?.map((outlet) => (
                  <HomeCards key={outlet.uuid} uuid={outlet.uuid} name={outlet.outlet_name} productList={products} />
                ))}
              </div>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default SupplierTabSection;
