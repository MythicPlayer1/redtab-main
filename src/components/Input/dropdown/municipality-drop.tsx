import { IoMdArrowDropdown } from "react-icons/io";
import { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { RxCross2 } from "react-icons/rx";
import { NepalStatesStore, useLocationUpdateStore } from "../../../store/kyc/kyc-info-store";
import MunicipalitiesLists from "./municipalities-list";

const MunicipalityDropDown = ({ name, municipalityName }: { name?: string; municipalityName?: any[] }) => {
  const { updatedMunicipality } = useLocationUpdateStore();
  const { municipalities, setMunicipalities } = NepalStatesStore();
  let [isOpen, setIsOpen] = useState(false);

  //for getting the vdc_municipality if the user is editing the form
  useEffect(() => {
    const edit = localStorage.getItem("isEdit");
    if (edit === "true") {
      if (updatedMunicipality) {
        setMunicipalities(updatedMunicipality);
      }
    }
  }, [updatedMunicipality]);
  
  function closeModal() {
    setIsOpen(false);
  }
 
  const selectCountry = (data: string) => {
    setMunicipalities(data as string); //store the selected province name only
    setIsOpen(false);
  };
 
  return (
    <div className="">
      <button
        className="flex w-full justify-start font-poppins border-b-[1px] border-b-[#EAECF0] relative "
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <div className="flex flex-col w-full items-start ">
          {municipalities && Object.keys(municipalities).length > 0 ? (
            <div className="flex flex-col w-full items-start">
              <span className="text-[#98A2B3] text-xs font-normal ">{name}</span>
              <input
                className="flex py-1 w-full  text-base text-[#1D2939] focus-within:outline-none"
                value={municipalities}
              ></input>
            </div>
          ) : (
            <label className="font-poppins font-normal text-[#667085] py-2 text-base">{name}</label>
          )}
        </div>

        <div className="flex items-start justify-center">
          <IoMdArrowDropdown size={24} className="text-[#98A2B3] text-lg " />
        </div>
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 back-black1" />
          </Transition.Child>

          <div className="fixed top-[5%] inset-0">
            <div className="flex min-h-full items-center justify-center py-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full h-[97vh] bg-[#fff] max-w-md transform overflow-hidden rounded-2xl bg-white py-3 px-1 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className=" relative text-base font-semibold mb-6 text-center font-poppins text-[#25282B]">
                    Select VDC/Municipality
                    <button className="flex absolute top-[-2px] right-[5px] items-center justify-center bg-[#F0f1f3] rounded-full p-1">
                      <RxCross2 size={20} onClick={closeModal} className="text-[#818C99]" />
                    </button>
                  </Dialog.Title>
                  <div className="overflow-scroll h-[85vh]">
                    {municipalityName?.map((data) => (
                      // < data={data} isSelected={provinces === data} selectCountry={selectCountry}  />
                      <MunicipalitiesLists
                        data={data}
                        isSelected={municipalities === data}
                        selectCountry={selectCountry}
                      />
                    ))}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default MunicipalityDropDown;
