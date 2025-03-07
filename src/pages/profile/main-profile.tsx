import { useEffect } from "react";
import ProfileTabSection from "../../components/main-profile/profile-tab-section";
import TopSection from "../../components/main-profile/top-section";
import { TabLayout } from "../../components/TabLayout";
import { useGetMerchantProfile } from "../../store/merchant-profile/use-get-merchant-profile";
import { useGetMerchantProfileOutlet } from "../../store/merchant-profile/use-merchant-profile-outlet";
import KycVerifyCard from "../../components/outlet-info/kyc-verify-card";
import { useVerifyPanDetail } from "../../store/pan-verification-store/use-outlet-verification";
import { useOulteUUID } from "../../store/kyc/use-create-outlet-profile";
import { useVerifyOwnerDetail } from "../../store/owner-identity/use-owner-verification";
import { useVerifyBasicInfoDetail } from "../../store/merchant-profile/use-basic-information-verify";
import { useGetOutletBusinessType } from "../../store/business-type-store/use-outlet-business-type-store";
import { usePhoneNumberStore } from "../../store/phone-store/use-phone-store";
import { useEmailStore } from "../../store/email-store/use-email-store";
import { useMerchantContactStore } from "../../store/merchant-profile/use-merchant-contact-store";
import { useLoginStatusStore } from "../../store/login-status-store/use-login-status-store";

const MainProfile = () => {
  const { getMerchantProfile } = useGetMerchantProfile();
  const { getMerchantProfileOutlet } = useGetMerchantProfileOutlet();
  const merchantProfileList = localStorage?.getItem("token-storage");
  const merchantProfileUUID = JSON?.parse(merchantProfileList as string)?.state?.merchantProfileUUID[0]?.uuid;
  const merchantProfileData = localStorage?.getItem("merchant-profile-storage");
  const merchantProfileUUIDForDataUUID = JSON?.parse(merchantProfileData as string)?.state?.merchantProfileUUID;
  const { verifyPanDetail, verifyRegisterCompany } = useVerifyPanDetail();
  const { ownerVerify } = useVerifyOwnerDetail();
  const { verifyContactCompany, verifyLocationDetail } = useVerifyBasicInfoDetail();
  const { getOutletBusinessType } = useGetOutletBusinessType();
  const { outletUUID } = useOulteUUID();
  const { phoneNumber, staffOutletPhoneNumber } = usePhoneNumberStore();
  const { email } = useEmailStore();
  const { setMerchantUpdateStatus } = useMerchantContactStore();
  const { updateMerchantName } = useLoginStatusStore();

  // fetch the merchant profile and outlet data
  useEffect(() => {
    const fetchProfileData = async () => {
      if (merchantProfileUUIDForDataUUID) {
        await getMerchantProfile(merchantProfileUUIDForDataUUID);
        await getMerchantProfileOutlet(merchantProfileUUIDForDataUUID);
      }
    };
    const fetchProfileData1 = async () => {
      if (merchantProfileUUID) {
        await getMerchantProfile(merchantProfileUUID);
        await getMerchantProfileOutlet(merchantProfileUUID);
      }
    };
    const fetchVerifyPan = async () => {
      if (outletUUID) {
        await verifyPanDetail(outletUUID);
      }
    };
    const fetchVerifyCompany = async () => {
      if (outletUUID) {
        await verifyRegisterCompany(outletUUID);
      }
    };
    const fetchVerifyOwner = async () => {
      if (outletUUID) {
        await ownerVerify(outletUUID);
      }
    };
    const fetchVerifyLocationDetail = async () => {
      if (outletUUID) {
        await verifyLocationDetail(outletUUID);
      }
    };
    const fetchVerifyContactDetail = async () => {
      if (outletUUID) {
        await verifyContactCompany(outletUUID);
      }
    };
    const fetchBusinessType = async () => {
      if (outletUUID) {
        await getOutletBusinessType(outletUUID);
      }
    };

    fetchProfileData();
    fetchProfileData1();
    fetchVerifyPan();
    fetchVerifyCompany();
    fetchVerifyOwner();
    fetchVerifyLocationDetail();
    fetchVerifyContactDetail();
    fetchBusinessType();
  }, [outletUUID]);

  // check if the email or phone number is in the merchant name
  //it is used while user logged in and create the merchant profile and but logout without
  //update the merchant profile and login again to update the merchant profile)
  // if it is, set the merchant update status to true
  useEffect(() => {
    // check if the email or phone number is in the merchant name i.e. merchant basic info is updated or not
    const checkEmail = email && updateMerchantName && updateMerchantName.includes(email);
    const checkPhone = phoneNumber && updateMerchantName && updateMerchantName.includes(phoneNumber);
    // check if the staff outlet phone number is in the merchant name i.e. merchant basic info is updated or not
    const checkStaffOutletPhone = staffOutletPhoneNumber && updateMerchantName && updateMerchantName.includes(staffOutletPhoneNumber);
    if (checkEmail) {
      setMerchantUpdateStatus(true);
    } else if (checkPhone) {
      setMerchantUpdateStatus(true);
    } else if (checkStaffOutletPhone) {
      setMerchantUpdateStatus(true);
    } else {
      setMerchantUpdateStatus(false);
    }
  }, [email, phoneNumber, updateMerchantName]);

  return (
    <TabLayout>
      <div className="px-4">
        <TopSection />
        <div className="block">
          <KycVerifyCard />
        </div>
        <ProfileTabSection />
      </div>
    </TabLayout>
  );
};

export default MainProfile;
