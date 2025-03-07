import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ModalLayout } from "../../components/ModalLayout";
import { Selection } from "../../components/Selection";
import { handleBusinessTypeList, useBusinessTypeStore } from "../../store/business-type-store/use-business-type-store";
import {
  SubBusinessDataType,
  useSubBusinessTypeStore,
} from "../../store/business-type-store/use-sub-business-type-store";
import { useLoginStatusStore } from "../../store/login-status-store/use-login-status-store";
import { useMerchantContactStore } from "../../store/merchant-profile/use-merchant-contact-store";

export interface InputBizTypeStepProps {
  onAction?: (action: string) => void;
  onSubmit?: (newState: any) => void;
}
export interface BizTypeSelectionProps {
  onChange?: (value: string) => void;
  value?: string;
  loading?: boolean;

}
const BizTypeSelection: FC<BizTypeSelectionProps> = ({ value, onChange }: BizTypeSelectionProps) => {
  const { businessTypeList } = useBusinessTypeStore();
  return (
    <Selection
      value={value}
      onChange={onChange}
      items={businessTypeList?.map((x: { business_type_name: string; uuid: string, is_leaf: boolean }) => ({
        label: x.business_type_name,
        value: `${x.uuid}`,
        is_leaf: x.is_leaf,
      })) as SubBusinessDataType[]}
    />
  );
};

interface BizCategoryProps {
  value?: string;
  onChange?: (newValue: string) => void;
  parentId?: string;
}

const BizCategory: FC<BizCategoryProps> = ({ value, onChange }) => {
  const { subBusinessTypeList } = useSubBusinessTypeStore();


  return (

    <Selection
      loading={handleBusinessTypeList.getState().isLoading}
      value={value}
      onChange={onChange}
      items={subBusinessTypeList?.map((x: { business_type_name: string; uuid: string, is_leaf: boolean }) => ({
        label: x.business_type_name,
        value: `${x.uuid}`,
        is_leaf: x.is_leaf,
      })) as SubBusinessDataType[]}
    ></Selection>
  );
};


export const InputBizTypeStep: FC<PropsWithChildren<InputBizTypeStepProps>> = () => {
  const { t } = useTranslation("InputOTPStep");

  const [biz, setBiz] = useState<string>();
  const [category] = useState<string>();
  const [selectDetail, setSelectDetail] = useState(false);
  const { accessToken } = useLoginStatusStore();
  const { getBusinessTypeList } = handleBusinessTypeList();
  const { setSubBusinessType, subBusinessData } = useSubBusinessTypeStore();
  const { types } = useMerchantContactStore();


  useEffect(() => {

    const fetchBussinessType = async () => {
      if (accessToken) {
        await getBusinessTypeList();
        const { businessTypeList } = useBusinessTypeStore.getState();
        const matchedType = businessTypeList?.find((x: { business_type_name: string; uuid: string }) =>
          x.business_type_name.split('/').map(part => part.trim().toLowerCase()).some(part =>
            types?.includes(part)
          )
        );
        setBiz(matchedType?.business_type_name);
      }

      
    }
    fetchBussinessType();

  }, [accessToken]);
  const handleOnSubcategorySelect = (subBusiness: string) => {
    setSubBusinessType(subBusiness);
    // navigate("/kyc/merchant/name");
  };

  if (selectDetail) {
    return (
      <ModalLayout
        arrowBack={
          selectDetail && (
            <div className="min-h-20 py-4">
              <svg
                onClick={() => {
                  setSelectDetail(false);
                }}
                className="cursor-pointer"
                width="29"
                height="28"
                viewBox="0 0 29 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.79289 14.7071L12.7929 21.7071C13.1834 22.0976 13.8166 22.0976 14.2071 21.7071C14.5676 21.3466 14.5953 20.7794 14.2903 20.3871L14.2071 20.2929L8.914 15L22.5 15C23.0128 15 23.4355 14.614 23.4933 14.1166L23.5 14C23.5 13.4872 23.114 13.0645 22.6166 13.0067L22.5 13L8.914 13L14.2071 7.70711C14.5676 7.34662 14.5953 6.77939 14.2903 6.3871L14.2071 6.29289C13.8466 5.93241 13.2794 5.90468 12.8871 6.2097L12.7929 6.29289L5.79289 13.2929L5.69634 13.4047L5.62467 13.5159L5.57123 13.6287L5.53585 13.734L5.51102 13.8515L5.50397 13.9107L5.50018 14.0192L5.50397 14.0892L5.52024 14.2007L5.54974 14.3121L5.59367 14.4232L5.646 14.5207L5.71279 14.6167C5.73767 14.6485 5.76443 14.6786 5.79289 14.7071L12.7929 21.7071L5.79289 14.7071Z"
                  fill="#344054"
                />
              </svg>
            </div>
          )
        }
        title={t("letGetStarted", { defaultValue: "Select Your Business Type" })}
        subTitle={`${t("moreInfo", {
          defaultValue: `Choose sub category for ${subBusinessData?.label}`,
        })}`}
      >
        <BizCategory parentId={biz} value={category} onChange={handleOnSubcategorySelect} />
      </ModalLayout>
    );
  }

  return (

    <ModalLayout
      title={"Select Your Business Type"}
      subTitle={"We need to know this to customize your exprience, also we curious too."}
    >
      <BizTypeSelection
        loading={handleBusinessTypeList.getState().isLoading}
        value={biz}
        onChange={(value: string) => {
          setBiz(value);
          setSelectDetail(true);
        }}
      />
    </ModalLayout>
  );
};

export default InputBizTypeStep;
