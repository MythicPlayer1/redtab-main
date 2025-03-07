import React, { useEffect, useRef, useState } from 'react'
import { ButtonPrimary } from "../../components/Button/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import { CustomerListType, MerchantProfileOutletType, useCreateNewCustomer, usePosCalculator, useUsersListStore } from "../../store/pos-calculator/pos-calculator";
import { convertDate, convertDateToNepaliFormat, numberConverter } from "../../utils/useful-func";
import { usePosCalculateAmount } from '../../store/pos-calculator/pos-cal-store';
import { UseDataForPayload } from '../../store/pos-calculator/billing';
import { FiArrowLeft } from 'react-icons/fi';
import { ButtonSecondary } from '../../components/Button/ButtonSecondary';
import OutletSelectModals from '../../components/main-profile/outlet-select-modals';
import AddNewContact from '../../components/PosCalculaor/add-new-contact';

interface ManageCustomerProps {
}
const ManageCustomer: React.FC<ManageCustomerProps> = () => {
  const [customerList, setCustomerList] = useState([] as CustomerListType[]);
  const [merchantOutletsLists, setMerchantLists] = useState([] as MerchantProfileOutletType[]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const addNewContactRef = useRef<HTMLDivElement>(null);
  const { getCustomerList, getMerchantProfileOuletList } = usePosCalculator();
  const { } = useUsersListStore();
  const { createNewCustomer } = useCreateNewCustomer()
  const [isDisabled, setIsDisabled] = useState(true);
  const naviate = useNavigate();
  const { calculatedAmount, setShowAddCustomer, showAddCustomer, dropdownVisible, setDropdownVisible } = usePosCalculateAmount.getState();
  const { setDataForPayload, setDataForPayload1, name, setName, phone, setPhone, setIsFromSelectFeild} = UseDataForPayload();
  const outletIdStorage = localStorage.getItem("selected-outlet-uuid-storage");
  const outletIdData = outletIdStorage ? JSON.parse(outletIdStorage) : "";
  const outletId = outletIdData?.state?.selectedOutletId;
  const [showAddCus, setShowAddCus] = useState(false);
  const [isNumber, setIsNumber] = useState(false);


  useEffect(() => {
    // Simulate fetching customer data, e.g., from an API or a databas  
    const fetchCustomerList = async () => {
        await getCustomerList(outletId);
        setCustomerList(useUsersListStore.getState().customerList);
        await getMerchantProfileOuletList();
        setMerchantLists(useUsersListStore.getState().merchantOutletList);
    };
    fetchCustomerList();
  }, [showAddCus, showAddCustomer]);


  const handleInputFocus = () => {
    setDropdownVisible(true);
  };

  //input handler for the phone number, check wethe the input is number or no, if it is number then enable the add new customer button
  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    setDropdownVisible(true);
    const isNum = numberConverter(e.target.value);
    setIsNumber(numberConverter(e.target.value));
    if (isNum) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  };


  //customer select handler for the billing
  const handleCustomerSelect = async (customer: CustomerListType) => {
    const date = convertDate();
    const nepaliDate = convertDateToNepaliFormat();
    const data = {
      invoice_english_date: date,
      invoice_nepali_date: nepaliDate,
      buyer_name: customer?.phone_number,
      buyer_uuid: customer.uuid,
      customer_name: customer?.customer_name,
      merchant_or_customer: "customer",
    }
    const dataForReceipt = {
      receipt_english_date: date,
      receipt_nepali_date: nepaliDate,
      buyer_name: customer?.phone_number,
      buyer_uuid: customer.uuid,
      customer_name: customer?.customer_name,
      merchant_or_customer: "customer",

    }
    setIsFromSelectFeild(true);
    setDataForPayload1(dataForReceipt);
    setDataForPayload(data);
    setPhone(customer.phone_number);
    setDropdownVisible(false);
    naviate('/pos-invoice-review')
    setShowAddCustomer(false);
  };


  // merchant select handler for the billing 
  const handleMerchantsSelect = async (merchant: MerchantProfileOutletType) => {
    const date = convertDate();
    const nepaliDate = convertDateToNepaliFormat();
    const data = {
      invoice_english_date: date,
      invoice_nepali_date: nepaliDate,
      buyer_name: merchant?.outlet_name,
      buyer_uuid: merchant?.uuid,
      merchant_or_customer: "merchant",

    }
    const dataForReceipt = {
      receipt_english_date: date,
      receipt_nepali_date: nepaliDate,
      buyer_name: merchant?.outlet_name,
      buyer_uuid: merchant.uuid,
      merchant_or_customer: "merchant",

    }
    setIsFromSelectFeild(true);
    setDataForPayload(data);
    setDataForPayload1(dataForReceipt);
    setPhone(merchant?.outlet_contact);
    setDropdownVisible(false);
    setShowAddCustomer(false);
    // naviate('/pos-invoice-review')
  };


  //flitering the customer and merchant list based on the phone number or name
  const filteredCustomers = customerList?.filter(
    (customer) => customer?.customer_name?.toLowerCase()?.includes(phone?.toLowerCase()) || customer?.phone_number?.includes(phone)
  );
  const filteredMerchants = merchantOutletsLists.filter(
    (merchant) => merchant?.outlet_name?.toLowerCase()?.includes(phone?.toLowerCase()) || merchant?.outlet_contact?.includes(phone)
  );



  //add more customer button handler

  const handleShowAddNewContact = () => {
    setShowAddCus(true);

  }
  const handleAddNewCustomer = async () => {
    const englishDate = convertDate();
    const nepaliDate = convertDateToNepaliFormat();
    await createNewCustomer({ phone_number: phone, customer_name: name, outlet: outletId }, outletId, englishDate, nepaliDate, calculatedAmount) //this api is requesting the customer_name and phone_number both at same time, but in real case we can give either phone number or cutomer name to create new customer
    setShowAddCus(false);
    if (useCreateNewCustomer.getState().verifySuccess === true) {
      // setDropdownVisible(false);
      // setName("");
      // setPhone("");
    }

  };

  //select the selected customer
  const handleSelect = async (phone: string) => {
    const englishDate = convertDate();
    const nepaliDate = convertDateToNepaliFormat();
    const data = {
      invoice_english_date: englishDate,
      invoice_nepali_date: nepaliDate,
      buyer_name: phone,
      merchant_or_customer: "customer",
    }
    const reciptData = {
      receipt_english_date: englishDate,
      receipt_nepali_date: nepaliDate,
      buyer_name: phone,
      merchant_or_customer: "customer",
    }
    setIsFromSelectFeild(true);
    setDataForPayload(data);
    setDataForPayload1(reciptData);

    setShowAddCustomer(false);
  }
  const windowHeight = window.innerHeight - 140;
  const style: React.CSSProperties = {
    bottom: '0',
  }

  const clearBtnHandler = () => {
    if (phone === "") {
      setDropdownVisible(false);
      setShowAddCustomer(false);
    } else {
      setPhone("");
    }
  }
  return (
    <div className="fixed flex flex-col h-full w-screen top-0 z-40 black-trans px-4" >
      <div className="relative  flex flex-col">
        <div className="bg-primaryColorText rounded-[24px] shadow-lg flex items-center justify-between px-2 py-4 w-full h-[44px] absolute top-5 right-0">
          <FiArrowLeft size={24} onClick={() => setShowAddCustomer(false)} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search name or enter number"
            value={phone}
            onChange={handleInputs}
            onFocus={handleInputFocus}
            autoFocus
            className="bg-primaryColorText w-full px-2 py-3 min-h-11 rounded-[24px] text-sm focus:outline-none"
          />
          <button
            ref={clearButtonRef}
            className="h-full w-7 flex items-center"
            onClick={clearBtnHandler}
          >
            <svg
              className="mr-2 cursor-pointer "
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8ZM4.56347 4.56354C4.212 4.91501 4.212 5.48486 4.56347 5.83633L6.72713 7.99995L4.56348 10.1636C4.212 10.515 4.212 11.0849 4.56347 11.4364C4.91494 11.7878 5.48479 11.7878 5.83626 11.4364L7.99993 9.27274L10.1636 11.4364C10.5151 11.7878 11.0849 11.7878 11.4364 11.4364C11.7879 11.0849 11.7879 10.515 11.4364 10.1636L9.27273 7.99995L11.4364 5.83633C11.7879 5.48486 11.7879 4.91501 11.4364 4.56354C11.0849 4.21206 10.5151 4.21206 10.1636 4.56353L7.99993 6.72717L5.83626 4.56353C5.48478 4.21206 4.91493 4.21206 4.56347 4.56354Z"
                fill="#98A2B3"
              />
            </svg>
          </button>
          <div ref={dropdownRef}>
            {dropdownVisible && (
              <div className="absolute left-0 z-50 top-8 w-[100%]">
                {phone !== "" && <div style={{ maxHeight: (filteredCustomers.length === 0 && filteredMerchants.length === 0) ? "auto" : windowHeight }} className="absolute mt-6 w-full bg-primaryColorText rounded-[16px] shadow-lg p-2 overflow-scroll ">
                  {filteredCustomers.length > 0 || filteredMerchants.length > 0 ? (
                    <>
                      {filteredMerchants?.map((contact, index) => (
                        <div
                          key={index}
                          className="flex items-center py-2 "
                          onClick={() => handleMerchantsSelect(contact)}
                        >
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="16" cy="16" r="16" fill="#EAECF0" />
                          </svg>
                          <div className="px-2 flex flex-col cursor-pointer justify-start text-start ">
                            <p className="font-semibold text-xs font-poppins text-[#1D2939] ">{contact?.outlet_name}</p>
                            <p className="text-xs font-poppins font-normal text-[#475467]">{contact?.outlet_contact}</p>
                          </div>
                          <svg
                            className="absolute left-[90%] cursor-pointer"
                            width="12"
                            height="16"
                            viewBox="0 0 12 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.22731 8.00001L3.8637 4.6364C3.51223 4.28493 3.51223 3.71508 3.8637 3.36361C4.21517 3.01214 4.78502 3.01214 5.13649 3.36361L9.13649 7.36361C9.48797 7.71508 9.48797 8.28493 9.13649 8.6364L5.13649 12.6364C4.78502 12.9879 4.21517 12.9879 3.8637 12.6364C3.51223 12.2849 3.51223 11.7151 3.8637 11.3636L7.22731 8.00001Z"
                              fill="#98A2B3"
                            />
                          </svg>
                        </div>
                      ))}

                      {filteredCustomers?.map((contact, index) => (
                        <div
                          key={index}
                          className="flex items-center py-2 hover:text-secondaryColorText "
                          onClick={() => handleCustomerSelect(contact)}
                        >
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="16" cy="16" r="16" fill="#EAECF0" />
                          </svg>
                          <div className="px-2 flex flex-col text-start cursor-pointer ">
                            <div className="font-semibold text-xs font-poppins text-[#1D2939] ">{contact?.customer_name}</div>
                            <div className="text-xs font-poppins font-normal text-[#475467]">{contact?.phone_number}</div>
                          </div>
                          <svg
                            className="absolute left-[90%] cursor-pointer"
                            width="12"
                            height="16"
                            viewBox="0 0 12 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.22731 8.00001L3.8637 4.6364C3.51223 4.28493 3.51223 3.71508 3.8637 3.36361C4.21517 3.01214 4.78502 3.01214 5.13649 3.36361L9.13649 7.36361C9.48797 7.71508 9.48797 8.28493 9.13649 8.6364L5.13649 12.6364C4.78502 12.9879 4.21517 12.9879 3.8637 12.6364C3.51223 12.2849 3.51223 11.7151 3.8637 11.3636L7.22731 8.00001Z"
                              fill="#98A2B3"
                            />
                          </svg>
                        </div>
                      ))}
                    </>

                  ) : (
                    <div className="w-full  rounded-[16px] px-3 py-3">
                      <div className="text-xs  font-semibold font-poppins  text-center w-full ">
                        "{phone}"
                        {isNumber ? <><span className="font-poppins font-normal text-[#1D2939]">
                          {" "}
                          is not on your contact yet, do
                        </span>
                          <p className="font-poppins font-normal text-[#1D2939]"> you want to use this number?</p></> : <span className="font-poppins font-normal text-[#1D2939]">
                          {" "}
                          is not valid phone number, number should start from 9 and must be 10 digit long.
                        </span>}
                      </div>
                      {isNumber === true && <div className="w-full   flex gap-2 mt-4 items-center">

                        <ButtonSecondary className="text-xs  w-full h-[28px] font-semibold font-poppins bg-secondaryColor flex items-center justify-center active:bg-secondaryColor active:text-primaryColorText"
                          size="small"
                          onClick={handleShowAddNewContact}
                          disabled={isDisabled}
                        >
                          <span className="text-xs font-semibold font-poppins h-[16px] w-[104px] text-[#EA4335]">
                            Add new contact
                          </span>
                        </ButtonSecondary>
                        <ButtonPrimary
                          className="text-xs w-full  h-[28px] font-semibold font-poppins flex items-center justify-center"
                          size="small"
                          onClick={() => handleSelect(phone)}
                          disabled={isDisabled}
                        >
                          <span className="text-[14px] font-normal">Select</span>
                        </ButtonPrimary>
                      </div>}
                    </div>
                  )}
                </div>}
              </div>
            )}

          </div>
          <div ref={modalRef}>
            <OutletSelectModals open={showAddCus} onClose={() => setShowAddCus(false)} name="Cutomer Name" dialogStyle={style} >
              <AddNewContact name={name} setName={setName} handleCreateNewContact={handleAddNewCustomer} phone={phone} onClose={() => setShowAddCus(false)} ref={addNewContactRef} />
            </OutletSelectModals>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ManageCustomer
