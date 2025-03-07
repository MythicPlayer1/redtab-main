import React, { useState } from 'react';
import LeftArrowButton from "../Button/LeftArrowButton";
import { ButtonPrimary } from "../../components/Button/ButtonPrimary";
import { InputText } from '../Input';
import { useTranslation } from "react-i18next";
// import KYCName from '../../pages/kyc';

const PosProductDetail: React.FC = () => {
  const { t } = useTranslation("KYC");
  const [name, setName] = useState<string>();
  const [price, setPrice] = useState<string>();
  const [note, setNote] = useState<string>();
  return (
    <div>
      <div className='px-2'>
      <div className="flex justify-between w-full h-[44px] mt-[25px] text-[16px] font-poppins font-semibold leading-6 text-[#1D2939]  text-center">
        <LeftArrowButton to="/pos-calculator" />
        <span>Product Detail</span>
        <div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 6L17.8714 19.7052C17.7646 21.0019 16.681 22 15.3798 22H8.62016C7.319 22 6.23538 21.0019 6.12859 19.7052L5 6H19ZM12 8C11.7239 8 11.5 8.22386 11.5 8.5V19C11.5 19.2761 11.7239 19.5 12 19.5C12.2761 19.5 12.5 19.2761 12.5 19V8.5C12.5 8.22386 12.2761 8 12 8ZM15 8C14.7204 8 14.4904 8.2202 14.4783 8.49953L14.0217 19.0005L14.0213 19.0213C14.0213 19.2857 14.2356 19.5 14.5 19.5C14.7796 19.5 15.0096 19.2798 15.0217 19.0005L15.4783 8.49953L15.4787 8.47873C15.4787 8.21434 15.2644 8 15 8ZM9 8L8.97921 8.00045C8.71506 8.01194 8.51023 8.23538 8.52172 8.49953L8.97828 19.0005C8.99043 19.2798 9.22041 19.5 9.5 19.5C9.50693 19.5 9.51387 19.4998 9.52079 19.4995C9.78494 19.4881 9.98977 19.2646 9.97828 19.0005L9.52172 8.49953C9.50957 8.2202 9.27959 8 9 8ZM13 1.5C14.0252 1.5 14.9063 2.11713 15.2921 3.00017L19 3C19.5523 3 20 3.44772 20 4V4.75C20 4.88807 19.8881 5 19.75 5H4.25C4.11193 5 4 4.88807 4 4.75V4C4 3.44772 4.44772 3 5 3L8.70795 3.00017C9.09368 2.11713 9.97477 1.5 11 1.5H13Z"
              fill="#99A2AD"
            />
          </svg>
        </div>
      </div>
      </div>
      <div className="mx-auto mt-[26px] px-[18px]">
      <InputText
        label={t("productNameLabel", { defaultValue: "Name" })}
        placeholder={t("productNamePlaceholder", { defaultValue: "Change Product Name" })}
        value={name}
        onChange={setName}
      ></InputText>
      <InputText
        label={t("price", { defaultValue: "Price" })}
        placeholder={t("pricePlaceholder", { defaultValue: "245रु" })}
        value={price}
        onChange={setPrice}
      ></InputText>
      <InputText
        label={t("note", { defaultValue: "Note" })}
        placeholder={t("notePlaceholder", { defaultValue: "Add Note" })}
        value={note}
        onChange={setNote}
      ></InputText>
    </div>
    <div className="fixed bottom-0 left-0 right-0 p-5">
            <ButtonPrimary
              className="w-full h-[44px] flex justify-center items-center "
              size="large"
              disabled={false}
              onClick={() => {}}
            >
              {"Save"}
            </ButtonPrimary>
        </div>
    </div>
  );
}

export default PosProductDetail;
