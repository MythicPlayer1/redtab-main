
const ChoseIcon = () => {
    const payWith = "cash"
    if (payWith === 'cash') {
        return (
            <div className="h-[44px] w-[44px]">
                <img src="/cardImg.png" className="h-full w-full object-cover rounded-full"></img>
            </div>
        )
    }
    if (payWith === 'QR') {
        return (
            <div className="h-[44px] w-[44px]">
                <img src="/cardImg.png" className="h-full w-full object-cover rounded-full"></img>
            </div>
        )
    }
    if (payWith === 'card') {
        return (
            <div className="h-[44px] w-[44px]">
                <img src="/cardImg.png" className="h-full w-full object-cover rounded-full"></img>
            </div>
        )
    }
    if (payWith === 'returned') {
        return (
            <div className="h-[44px] w-[44px]">
                <img src="/cardImg.png" className="h-full w-full object-cover rounded-full"></img>
            </div>
        )
    }


}

export default ChoseIcon