import { useEffect, useState } from "react";

interface InvoiceReviewTypeProfileType {
    name?: string;
    pan?: string;
    location?: string;
    onClick?: () => void;
}

const InvoiceReviewTopProfile = (data: InvoiceReviewTypeProfileType) => {
    const { name, pan, location, onClick } = data;
    const [initialsName, setInitialsName] = useState<string>("");

    const takeFirstLetterOfFullName = (name: string) => {
        const nameArray = name?.split(" ");
        const firstLetter = nameArray[0]?.charAt(0);
        const secondLetter = nameArray[1]?.charAt(0);
        if (firstLetter && secondLetter) {
            return firstLetter + secondLetter;
        } else {
            return "RT"
        }
    }
    useEffect(() => {
        const FN = takeFirstLetterOfFullName(name as string || "Red Tab")
        setInitialsName(FN)

    }, [name])
    return (
        <div onClick={onClick} className="grid grid-cols-1 p-2 px-2  ">
            <div className="h-30 rounded-lg">
                <div className="h-20 w-full rounded-lg p-2 flex flex-col justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-5 rounded-full flex items-center text-center text-clip uppercase justify-center text-[white] font-semibold text-sm bg-primaryColor">
                            {initialsName || "RT"}
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-sm font-semibold font-poppins">{name || ""}</h1>
                            <div className="flex flex-col justify-center space-y-1 mt-1">
                                <p className="text-xs font-poppins font-normal text-secondaryColorTextBtn">PAN no. {pan || "No PAN Number"}</p>
                                <p className="text-xs font-poppins font-normal text-secondaryColorTextBtn">
                                    {location || ""}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvoiceReviewTopProfile