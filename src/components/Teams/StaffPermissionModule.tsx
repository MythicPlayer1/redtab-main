import ReactHtmlParser from 'react-html-parser';
import { useEffect, useState } from "react";
import LeftArrowButton from "../Button/LeftArrowButton";
import { ButtonPrimary } from "../Button/ButtonPrimary";
import { usePostStaffPermission } from "../../store/team-store/use-poststaff-permission";
import { useStaffUuidStore } from "../../store/team-store/use-staff-list-store";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetStaffPermission } from "../../store/team-store/use-getstaff-permission";
import { useStaffPermissionStore } from "../../store/team-store/use-staff-permission-store";
import { useVerifyPassword } from "../../store/team-store/use-verify-password";

const StaffPermissionModule = () => {
  const location = useLocation();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { postStaffPermission } = usePostStaffPermission();
  const { getStaffPermission, getUpdatedStaffPermission } = useGetStaffPermission();
  const { permissionList } = useStaffPermissionStore();
  const { selectedStaffId } = useStaffUuidStore();
  const { setVerifySuccess } = useVerifyPassword.getState();

  // Initialize selectedItems with default permissions
  useEffect(() => {
    if (permissionList && permissionList.length > 0) {
      const defaultPermissions = permissionList
        .filter((permission) => permission.is_default)
        .map((permission) => permission.uuid);
      setSelectedItems(defaultPermissions);
    }
  }, [permissionList]);

  // set verify success false
  useEffect(() => {
    setVerifySuccess(false);
  }, [setVerifySuccess]);

  //calling getStaffPermission on route /permission-access
  useEffect(() => {
    if (location.pathname === "/permission-access") {
      getStaffPermission();
      if (selectedStaffId) {
        const fetchPermissions = async () => {
          const uuids = await getUpdatedStaffPermission(selectedStaffId);
          setSelectedItems(uuids);
        };
        fetchPermissions();
      }
    }
  }, [location.pathname]);

  // function to handle selected items
  const handleItemClick = (uuid: string) => {
    const permission = permissionList.find((perm) => perm.uuid === uuid);

    // Do not allow deselection of default items
    if (permission?.is_default) {
      return;
    }

    if (selectedItems.includes(uuid)) {
      setSelectedItems(selectedItems.filter((item) => item !== uuid));
    } else {
      setSelectedItems([...selectedItems, uuid]);
    }
  };

  const navigate = useNavigate();

  //function to update the permissions
  const handleContinue = async () => {
    if (selectedStaffId) {
      await postStaffPermission(selectedStaffId, selectedItems);
      if (usePostStaffPermission?.getState().verifySuccess) {
        navigate("/manage-staffs");
      }
    }
  };

  // set color of the svg icon
  const modifySvgColor = (svg: string, color: string) => {
    return svg.replace(/fill="[^"]*"/g, `fill="${color}"`);
  };

  // render the permission icon
  const renderPermissionIcon = (permission: any) => {
    const isSelected = selectedItems.includes(permission.uuid);
    const color = isSelected ? "white" : "black";
    // Modify the svg color
    const modifiedSvg = modifySvgColor(permission.icon, color);
    // Render the svg
    return <div>{ ReactHtmlParser(modifiedSvg) }</div>
  };

  return (
    <>
      <div className="w-full p-5">
        <div className="flex items-center justify-between">
          <LeftArrowButton to="/manage-staffs" />
        </div>
        <div className="pt-5">
          <h1 className="text-[28px] font-semibold font-poppins w-[301px] md:w-auto">
            Select member module permission
          </h1>
          <p className="text-justify mt-1 font-normal text-sm font-poppins text-[#667085]">
            POS and Table are always selected
          </p>
        </div>
        <div className="py-8 h-[340px] w-auto">
          <div className="grid grid-cols-3 gap-[8px]" style={{ textAlign: "center", wordBreak: "break-all" }}>
            {permissionList.map((permission, index) => (
              <div
                key={index}
                onClick={() => handleItemClick(permission.uuid)}
                className={`flex flex-col justify-center items-center space-y-3 cursor-pointer h-[116px] w-[84px] ${
                  selectedItems.includes(permission.uuid) ? "bg-selectedColor" : "bg-defaultColor"
                }`}
              >
                <span
                  className={`text-xl px-6 py-6 h-[68px] w-[68px] break-words flex items-center justify-center rounded-full ${
                    permission.is_default
                      ? "bg-primaryIconsColor text-primaryColorText"
                      : selectedItems.includes(permission.uuid)
                      ? "bg-primaryColor text-primaryColorText"
                      : "bg-[#EAECF0] text-selectedIconTextColor"
                  }`}
                >
                  {renderPermissionIcon(permission)}
                </span>
                <h3 className="font-normal text-sm font-poppins">{permission.name}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 p-5">
          <ButtonPrimary
            className="w-full flex items-center justify-center"
            size="large"
            disabled={false}
            onClick={handleContinue}
          >
            {`Continue`}
            <div className="h-1 w-1 bg-[#ffffff] rounded-full mx-1 "></div>
            {`${selectedItems.length}`}
            <h1 className="ml-1 font-poppins font-semibold text-sm"> selected</h1>
          </ButtonPrimary>
        </div>
      </div>
    </>
  );
};

export default StaffPermissionModule;
