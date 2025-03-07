
import { IoMdCheckmark } from "react-icons/io"

const LocationList = ({data, isSelected, selectCountry}:{data: any, isSelected: boolean, selectCountry:(data: any)=> void}) => {
  return (
    <button className="flex justify-between items-center gap-1 pr-2 w-full  rounded-3xl font-poppins" onClick={()=>selectCountry(data.name)}>
      <p className="p-2 text-base font-light text-[#25282B]" >{data?.name}</p>
      {isSelected && (
        <IoMdCheckmark
          size={20}
          className="bg-[#EA4335] text-[#fff] rounded-full p-[2px] flex"
        />
      )}
    </button>
  )
}

export default LocationList