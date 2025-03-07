import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { ProfileList, ProfileListStaff } from "./dummy-list-of-profiles";
import ProfileSingleList from "../lists/profile-single-list";

const ProfileTabSection = () => {
  return (
    <div className="w-full py-4 ">
      <TabGroup>
        <TabList className="p-1 flex gap-4 font-medium text-normal text-[#667085] ">
          <Tab
            className={({ selected }) =>
              selected ? "border-b-[2px] border-b-secondaryColorText focus:outline-none" : "focus:outline-none"
            }
          >
            Profile
          </Tab>

          <Tab
            className={({ selected }) =>
              selected ? "border-b-[2px] border-b-secondaryColorText focus:outline-none" : "focus:outline-none"
            }
          >
            Team
          </Tab>
        </TabList>
        <TabPanels className="mt-4">
          <TabPanel className="flex flex-col gap-2">
            {ProfileList?.map((profile, index) => (
              <ProfileSingleList key={index} profile={profile} />
            ))}
          </TabPanel>
          <TabPanel>
            {/* show manage staff section */}
            {ProfileListStaff?.map((profile, index) => (
              <ProfileSingleList key={index} profile={profile} />
            ))}
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default ProfileTabSection;
