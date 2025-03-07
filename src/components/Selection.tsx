import { FC, useEffect, useState } from "react";
import clsx from "clsx";
import { Loading } from "./Loading";
import {
  handleSubBusinessTypeList,
  SubBusinessDataType,
  useSubBusinessTypeStore,
} from "../store/business-type-store/use-sub-business-type-store";
import { useNavigate } from "react-router-dom";
import { useMerchantProfile } from "../store/merchant-profile/use-create-merchant-profile";
import { KYCFormStore } from "../store/kyc/kyc-info-store";
import { useMerchantContactStore } from "../store/merchant-profile/use-merchant-contact-store";
import { useCreateOutletProfile, useOulteUUID } from "../store/kyc/use-create-outlet-profile";
import { useOutletProfileUpdate } from "../store/merchant-profile/use-outlet-update";
import { usePhoneNumberStore } from "../store/phone-store/use-phone-store";

export interface SelectionProps {
  onChange?: (value: string) => void;
  value?: string;
  loading?: boolean;
  items?: SubBusinessDataType[];
}

export const Selection: FC<SelectionProps> = (props) => {
  const [conditionStatus, setConditionStatus] = useState<string>("");
  const { setSubBusinessData, setBusinessResponse } = useSubBusinessTypeStore();
  const { getSubBusinessTypeList } = handleSubBusinessTypeList();
  const navigate = useNavigate();
  const { merchantProfileUUID } = useMerchantProfile();
  const { outletUUID } = useOulteUUID();
  const { isClickedFromSearchList } = KYCFormStore();
  const { setBizTypeValue, name } = useMerchantContactStore();
  const { createOutletProfile } = useCreateOutletProfile();
  const { bizTypeValue } = useMerchantContactStore();
  const { updateOutletProfile } = useOutletProfileUpdate();
  const { merchantOrStaff } = usePhoneNumberStore();

  useEffect(() => {
    const status = localStorage.getItem("outlethandle");
    if (status) {
      setConditionStatus(status as string);
    }
  }, []);

  const handleClickedSubitem = async (value: string, item: SubBusinessDataType) => {
    const edit = localStorage.getItem("isEdit");
    props.onChange?.(value);
    setSubBusinessData(item);
    setBizTypeValue(value);
    if (item.is_leaf === false) {
      getSubBusinessTypeList(value);
    } else {
      setBusinessResponse(item);

      if (conditionStatus === "true" || edit === "true" || merchantOrStaff === "staff") {
          if (isClickedFromSearchList === true) {
            await updateOutletProfile({ business_type: value, outlet_name: name }, outletUUID);
            if (useOutletProfileUpdate.getState().verifySuccess === true) {
              localStorage.removeItem("outlethandle");
              navigate("/kyc/merchant/confirm-location");
            }
          } else {
            await updateOutletProfile({ business_type: value, outlet_name: name }, outletUUID);
            if (useOutletProfileUpdate.getState().verifySuccess === true) {
              localStorage.removeItem("outlethandle");
              navigate("/kyc/merchant/location");
            }
          }
      } else {
          if (isClickedFromSearchList === true) {
            await createOutletProfile({
              business_type: bizTypeValue,
              outlet_name: name,
              merchant_profile: merchantProfileUUID,
            });
            const { verifySuccess } = useCreateOutletProfile.getState();
            if (verifySuccess === true) {
              //localStorage.removeItem("outlethandle");
              navigate("/kyc/merchant/confirm-location");
            }
          } else {
            await createOutletProfile({
              business_type: bizTypeValue,
              outlet_name: name,
              merchant_profile: merchantProfileUUID,
            });
            const { verifySuccess } = useCreateOutletProfile.getState();
            if (verifySuccess === true) {
              // localStorage.removeItem("outlethandle");
              navigate("/kyc/merchant/location");
            }
          }
      }
    }
  };
  return (
    <>
      {props.loading ? (
        <>
          <Loading inline />
        </>
      ) : (
        <div className="columns-2 gap-4">
          {props?.items?.map(({ label, value, is_leaf }) => (
            <div
              onClick={() => handleClickedSubitem(value, { label, value, is_leaf })}
              key={value}
              className={clsx(
                "mb-4 h-[7rem] bg-[#F8F8F8] active:ring-1 overflow-hidden pb-16 relative cursor-pointer rounded-lg flex flex-col p-4",
                {
                  "ring-1 ring-primaryColor": props.value === value || props.value === label,
                }
              )}
            >
              <div className="text-[0.75rem] w-1/2">{label}</div>

              <div className="rounded-full bg-[#D9D9D9] absolute top-1/3 -right-4 w-[100px] h-[100px]"></div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
