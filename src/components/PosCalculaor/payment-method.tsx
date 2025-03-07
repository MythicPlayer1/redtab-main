import { Radio, RadioGroup } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { ImQrcode } from "react-icons/im";
import { IoReceiptSharp } from "react-icons/io5";
import { UseDataForPayload } from '../../store/pos-calculator/billing';
import NepaliRupeeIcon from './nepali-rupees-icon';
import { usePosCalculateAmount } from '../../store/pos-calculator/pos-cal-store';


type PaymentMethodType ={
    setSelectedPayment: (value: string) => void
}
export const PaymentMethod: React.FC<PaymentMethodType> = ({ setSelectedPayment }) => {
    const {dataForPayload}= UseDataForPayload()
    const { transactionType } = usePosCalculateAmount.getState();
    const plans = [
        // { name: 'Cash', icon: <TbBrandCashapp className="size-5 transition group-data-[checked]:stroke-secondaryColor2" />, value:'cash'  },
        { name: 'Cash', icon: <NepaliRupeeIcon className="size-5 transition cursor-pointer  group-data-[checked]:fill-secondaryColor2" />, value:'cash'  },
        { name: 'QR code', icon: <ImQrcode className="size-5 cursor-pointer transition group-data-[checked]:fill-secondaryColor2" values='qr' />,  value:'qr'},
        ...(dataForPayload?.merchant_or_customer && transactionType !== "purchase" ? [{ name: 'Send Receipt', icon: <IoReceiptSharp className="size-5 cursor-pointer transition group-data-[checked]:fill-secondaryColor2" />, value: 'receipt' }] : [])
    ]
    const [selected, setSelected] = useState(plans[0]);
    useEffect(()=>{
        const {selectedPaymentMethod, setSelectedPaymentMethod}= UseDataForPayload.getState();
        const selectedPlan = plans.find((plan) => plan.value === selectedPaymentMethod)
        if(selectedPlan){
            setSelected(selectedPlan)
        }else{
            setSelected(plans[1])
            setSelectedPaymentMethod(plans[1].value)
        }
    },[])
   
   
    const handleSelected = (selectedPlan:any) => {
        setSelected(selectedPlan)
        setSelectedPayment(selectedPlan?.value)
    }

    
    return (
        <div className="w-full px-4">
            <div className="mx-auto w-full ">
                <RadioGroup by={(a, z) => a.name === z.name} value={selected} onChange={handleSelected} aria-label="Server size" className=" flex items-center justify-around ">
                    {plans.map((plan) => (
                        <Radio
                            key={plan.name}
                            value={plan}
                            className="group transition data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
                        >
                            <div className="flex w-full flex-col gap-2 items-center ">
                                <div className='flex items-center justify-center rounded-full overflow-hidden transition bg-[#F5F6F7] p-4 group-data-[checked]:bg-primaryColor '>
                                    {plan?.icon}
                                </div>
                                <div className="text-sm/6">
                                    <p className="font-semibold text-white cursor-pointer">{plan.name}</p>
                                </div>

                            </div>
                        </Radio>
                    ))}
                </RadioGroup>
            </div>
        </div>
    )
}