import { useEffect, useState } from 'react'
import { takeFirstLetterOfFullName } from '../utils/useful-func'

const ShortName = ({name, textSize}:{name:string, textSize?:string}) => {
    const [initialsName, setInitialsName] = useState<string>("");
    useEffect(()=>{
       const SN = takeFirstLetterOfFullName(name)
       setInitialsName(SN)
    })
    
  return (
    <p style={{fontSize:`${textSize}`}} className=' text-primaryColorText capitalize font-medium flex items-center justify-center'>{initialsName}</p>
  )
}



export default ShortName