
import { useEffect } from "react";
import { IoMdCheckmark } from "react-icons/io"
import { useLocationUpdateStore } from "../../../store/kyc/kyc-info-store";

const StatesList = ({data, isSelected, selectCountry}:{data: any, isSelected: boolean, selectCountry:(data: string)=> void}) => {
  const {updatedProvince } = useLocationUpdateStore();
  
  //for getting the provinces
  useEffect(() => {
    const edit = localStorage.getItem("isEdit");
    if(edit === "true"){
      if(updatedProvince && !data){
        selectCountry(updatedProvince);
      }
    }
  }, [updatedProvince]);

  return (
    <button className="flex justify-between items-center gap-1 pr-2 w-full  rounded-3xl font-poppins" onClick={()=>selectCountry(data)}>
      <p className="p-2 text-base font-light text-[#1D2939]" >{data}</p>
      {isSelected && (
        <IoMdCheckmark
          size={20}
          className="bg-[#EA4335] text-[#fff] rounded-full p-[2px] flex"
        />
      )}
    </button>
  )
}

export default StatesList;