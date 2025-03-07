import { FiArrowLeft } from "react-icons/fi"
import { Link } from "react-router-dom"
import React from "react"
import { RxCross2 } from "react-icons/rx"

type BackButtonType = {
    link?: string,
    buttonType?: string,
    title?: string
}

const BackButton: React.FC<BackButtonType> = ({ link = "/", buttonType, title }) => {
    return (
        <div className="p-4 w-full relative">
            <Link to={link} className="absolute top-4 left-4">
                {buttonType === "back" ? <FiArrowLeft className="text-2xl mr-4 text-primaryColorText" />
                    : <RxCross2 className="text-2xl" color="white" />
                }
            </Link>
            <div className="w-full flex items-center justify-center">
                <h2 className="text-base font-semibold font-poppins  text-primaryColorText">{title}</h2>
            </div>
        </div>
    )
}
export default BackButton