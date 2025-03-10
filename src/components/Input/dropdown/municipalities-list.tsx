
import { IoMdCheckmark } from "react-icons/io"

const MunicipalitiesLists = ({data, isSelected, selectCountry}:{data: any, isSelected: boolean, selectCountry:(data: string)=> void}) => {
  return (
    <button className="flex justify-between items-center gap-1 pr-2 w-full  rounded-3xl font-poppins" onClick={()=>selectCountry(data)}>
      <p className="p-2 text-base text-start font-light text-[#1D2939]" >{data}</p>
      {isSelected && (
        <IoMdCheckmark
          size={20}
          className="bg-[#EA4335] text-[#fff] rounded-full p-[2px] flex"
        />
      )}
    </button>
  )
}

export default MunicipalitiesLists;