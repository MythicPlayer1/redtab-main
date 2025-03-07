
import React, { useEffect } from 'react'
import { InputText } from '../Input'
import { ButtonPrimary } from '../Button/ButtonPrimary'
import { ButtonSecondary } from '../Button/ButtonSecondary'

import { t } from 'i18next'

type AddNewContactType = {
    setName: (name: string) => void
    name: string
    handleCreateNewContact: () => void
    phone: string
    onClose?: () => void
}

const AddNewContact =React.forwardRef<HTMLDivElement, AddNewContactType>(
     ({ setName, name, handleCreateNewContact, phone, onClose}, ref ) => {

    const [isDisabled, setIsDisabled] = React.useState<boolean>(true)

    useEffect(() => {
        if (name) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [name]);

    return (
        <div ref={ref} className='p-4 flex bg-primaryColorText flex-col w-full rounded-2xl'>
            <div className='flex justify-center w-full pb-4'>
                <p className='font-semibold text-sm'>Add a name for "{phone}"</p>
            </div>
            <InputText
                label={t("Customer Name", { defaultValue: "Customer Name" })}
                placeholder={t("Customernameplaceholder", { defaultValue: "Customer name" })}
                value={name}
                onChange={setName}
                autoFocus
            ></InputText>
            <div className='flex justify-between w-full gap-2'>
                <ButtonSecondary className="text-[14px] w-full p-3 font-semibold font-poppins bg-secondaryColor flex items-center justify-center active:bg-secondaryColor active:text-primaryColorText"
                    size="small"
                    onClick={onClose}
                >
                    <span className="text-xs font-semibold font-poppins h-[16px] w-[104px] text-[#EA4335]">
                        Cancel
                    </span>
                </ButtonSecondary>
                <ButtonPrimary
                    className="text-xs w-full p-3 font-semibold font-poppins flex items-center justify-center"
                    size="small"
                    onClick={handleCreateNewContact}
                    disabled={isDisabled}
                >
                    <span className="text-[14px] font-normal">Add New Contact</span>
                </ButtonPrimary>
            </div>
        </div>
    )
})

export default AddNewContact;