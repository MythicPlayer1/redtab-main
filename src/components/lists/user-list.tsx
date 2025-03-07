import { Radio, RadioGroup } from "@headlessui/react";
import { useState } from "react";
import { PiCheckCircleFill } from "react-icons/pi";
import {
  MerchantProfileOutletData,
  useSelectedOutletUuidStore,
} from "../../store/merchant-profile/use-merchant-profile-outlet-store";
import ShortName from "../short-name";
import { useOulteUUID } from "../../store/kyc/use-create-outlet-profile";
import { useMerchantContactStore } from "../../store/merchant-profile/use-merchant-contact-store";
import { usePhoneNumberStore } from "../../store/phone-store/use-phone-store";

type ProfileSingleListType = {
  children?: React.ReactNode;
  merchantOutletList?: MerchantProfileOutletData[];
  handleClose: () => void;
};

const UserList: React.FC<ProfileSingleListType> = ({
  children,
  merchantOutletList,
  handleClose,
}: ProfileSingleListType) => {
  const outletListsFromSession = localStorage.getItem("selected-outlet-uuid-storage");
  const outletLists = outletListsFromSession ? JSON.parse(outletListsFromSession) : [];
  const selectedOutletUUID = outletLists?.state?.selectedOutletId;
  const { setSelectedOutletId, setSelectedOutletName, selectedOutletName } = useSelectedOutletUuidStore();
  const { setOutletUUID } = useOulteUUID();
  const [selected, setSelected] = useState(selectedOutletUUID);
  const { setMerchantName } = useMerchantContactStore();
  const { merchantOrStaff } = usePhoneNumberStore();

  const handleSelected = (selectedUUID: string, selectedOutletName: string) => {
    setSelectedOutletId(selectedUUID);
    setOutletUUID(selectedUUID);
    setSelectedOutletName(selectedOutletName);
    setMerchantName(selectedOutletName);
    handleClose();
  };


  console.log("selected value", selected);

  return (
    <div className="w-full p-3 max-h-[calc(100dvh-230px)] overflow-y-scroll overflow-hidden">
      <div className="mx-auto w-full max-w-md">
        {merchantOrStaff === "staff" ? (
          <RadioGroup
            name="name"
            value={selected}
            onChange={setSelected}
            aria-label="Server size"
          >
            <Radio
            value={selected}
              className="group relative flex cursor-pointer rounded-2xl bg-[#F5F6F7] py-3 px-3 text-white transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
            >
              <div className="flex w-full items-center justify-between ">
                <div className="flex gap-3 text-sm font-normal font-poppins items-center">
                  <div className="h-8 w-8 text-center rounded-full bg-[#F96A65] capitalize flex justify-center items-center text-primaryColorText">
                    <ShortName name={selectedOutletName} />
                  </div>
                  <p>{selectedOutletName}</p>
                </div>
                <PiCheckCircleFill
                  size={24}
                  className=" fill-textGreen  opacity-0 transition group-data-[checked]:opacity-100"
                />
              </div>
            </Radio>
          </RadioGroup>
        ) : (
          <RadioGroup
            name="name"
            value={selected}
            onChange={setSelected}
            aria-label="Server size"
            className="space-y-2"
          >
            {merchantOutletList &&
              merchantOutletList?.map((list) => (
                <Radio
                  key={list?.uuid}
                  value={list?.uuid}
                  onClick={() => handleSelected(list?.uuid, list?.outlet_name)}
                  className="group relative flex cursor-pointer rounded-2xl bg-[#F5F6F7] py-3 px-3 text-white transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
                >
                  <div className="flex w-full items-center justify-between ">
                    <div className="flex gap-3 text-sm font-normal font-poppins items-center">
                      <div className="h-8 w-8 text-center rounded-full bg-[#F96A65] capitalize flex justify-center items-center text-primaryColorText">
                        <ShortName name={list?.outlet_name} />
                      </div>
                      <p className="">{list?.outlet_name}</p>
                    </div>
                    <PiCheckCircleFill
                      size={24}
                      className=" fill-textGreen  opacity-0 transition group-data-[checked]:opacity-100"
                    />
                  </div>
                </Radio>
              ))}
            {children}
          </RadioGroup>
        )}
      </div>
    </div>
  );
};

export default UserList;
