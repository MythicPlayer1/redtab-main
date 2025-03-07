import React from "react";
import { takeFirstLetterOfFullName } from "../../utils/useful-func";
import { useSupplierProductListStore } from "../../store/business-type-store/use-supplier-product-list";

const CartInvoiceTopProfile = () => {
  const { outletDetail, selectedSupplierUUID } = useSupplierProductListStore();
  const selectedSupplier = outletDetail?.find((outlet) => outlet?.uuid === selectedSupplierUUID);
 
  return (
    <div>
      <div className="grid grid-cols-1 p-2 px-2  ">
        <div className="h-30 rounded-lg">
          <div className="h-20 w-full rounded-lg p-2 flex flex-col justify-between">
            <div className="flex items-center gap-4">
              <div className="p-5 rounded-full flex items-center text-center text-clip uppercase justify-center text-[white] font-semibold text-sm bg-primaryColor">
                {takeFirstLetterOfFullName(selectedSupplier?.outlet_name || "")}
              </div>
              <div className="flex flex-col space-y-1">
                <h1 className="text-sm font-semibold font-poppins">{selectedSupplier?.outlet_name}</h1>
                {selectedSupplier?.store_location?.map((location, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    <p className="text-xs font-poppins font-normal text-secondaryColorTextBtn">{location?.district},</p>
                    <p className="text-xs font-poppins font-normal text-secondaryColorTextBtn">{location.country}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartInvoiceTopProfile;
