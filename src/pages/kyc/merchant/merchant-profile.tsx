import { FC, useState } from "react";
import { TabLayout } from "../../../components/TabLayout";
import RightArrowLessButton from "../../../components/Button/RightArrowLessButton";
import { useMerchantProfileStore } from "../../../store/merchant-profile/use-merchant-profile-store";
import InputSearch from "../../../components/Input/InputSearch";
import { getInitials } from "../../../components/Utils/GetInitials";
import { useMerchantProfileOutletListStore } from "../../../store/merchant-profile/use-merchant-profile-outlet-store";

export interface MerchantProfileProps {}

const MerchantProfile: FC<MerchantProfileProps> = () => {
  const [searchValue, setSearchValue] = useState("");
  const { merchantProfile } = useMerchantProfileStore();
  const { merchantOutletList } = useMerchantProfileOutletListStore();

  //perform search staff's name based on staff's full_name and search query
  const filteredOutletData = merchantOutletList?.filter((outlet) =>
    outlet.outlet_name.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <TabLayout>
      <div className="w-full h-auto px-5 py-5">
        <div className="flex flex-col justify-between min-w-[223px] min-h-[148px] pt-8 mb-[52px]">
          <div className="min-w-[74px] min-h-[74px] bg-[#D9D9D9] rounded-full mx-auto"></div>
          <div className="w-full min-h-[58px]  flex flex-col justify-between">
            <div className="w-full min-h[32px] ">
              <p className="text-base font-semibold leading-[32px] text-center">{merchantProfile.merchant_name}</p>
            </div>
            <div className="w-full min-h[30px] rounded-[16px] flex justify-center">
              <button className="mx-auto min-w-[89px] min-h-[22px] bg-[#B54708] rounded-[16px]">
                <p className="text-center text-[12px] font-medium">Not verified</p>
              </button>
            </div>
          </div>
        </div>

        {/* second section Manage staff for search box */}
        <InputSearch value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />

        {/* Third section for staff list */}
        <div className="mt-3">
          <div className="py-4">
            <div className="flex space-x-1 mb-4">
              <h1 className="text-xs font-medium text-[#1D2939] font-poppins">Outlet List</h1>
              <div className="flex items-center justify-center">
                <div className="h-1 w-1 bg-[#667085] rounded-full flex items-center justify-center"></div>
              </div>
              <h1 className="text-xs font-medium font-poppins">{filteredOutletData.length} outlet</h1>
            </div>

            {filteredOutletData.length === 0 ? (
              <div className="text-center mt-12 text-[#667085] text-sm font-normal font-poppins">
                You don’t have any outlet yet
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {filteredOutletData.map((outlet) => (
                  <div className="bg-[#F5F6F7] h-14 rounded-xl p-2 flex justify-center flex-col">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-2 h-8 w-8 rounded-full mr-2 flex items-center justify-center text-[white] font-semibold text-sm bg-primaryColor">
                          {getInitials(outlet.outlet_name)}
                        </div>
                        <div className="ml-2 min-w-0">
                          <p className="text-sm font-medium font-poppins">{outlet.outlet_name}</p>
                        </div>
                      </div>
                      <RightArrowLessButton to="/manage-staffs" outletId={outlet.uuid} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </TabLayout>
  );
};
export default MerchantProfile;
