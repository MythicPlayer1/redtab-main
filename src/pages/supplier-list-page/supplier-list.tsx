import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import SupplierTabSection from "../../components/supplier/SupplierTabSection";

const SupplierList = () => {

  return (
    <div className="w-full h-screen  pb-4 overflow-hidden ">
      <div className="flex  items-center mb-2  h-[44px] mt-[25px] text-[16px] font-poppins font-semibold leading-6 text-[#1D2939] px-4 text-center">
        <Link to="/home">
          <FaArrowLeftLong color="#344054" size={18} />
        </Link>
        <div className="w-full pr-[64px] justify-center">Suppliers</div>
      </div>
      <SupplierTabSection />
    </div>
  );
};

export default SupplierList;
