import { useControllableValue } from "ahooks";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { ErrorToast } from "../ErrorToast";
import { InputBase, InputBaseProps } from "./InputBase";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import usePlacesAutocomplete from "use-places-autocomplete";

export interface InputAddressProps extends Omit<InputBaseProps<any>, "Input"> {
  textValue?: string;
  onTextChange?: (newValue: string) => void;
}

interface InputProps {
  placeholder?: string;
  autoFocus?: boolean;
  onChange?: (newValue: any) => void;
  value?: any;
}

const Input: FC<InputProps> = (props) => {
  return (
    <input
      readOnly
      placeholder={props.placeholder}
      autoFocus={props.autoFocus}
      className="w-full bg-[transparent] focus-visible:outline-none text-[#667085] text-base font-normal"
      onChange={(e) => props.onChange?.(e.target.value)}
      value={props.value}
    />
  );
};

interface MapSelectionProps {
  textValue?: string;
  onClose?: () => void;
  onChange?: (newValue: any, textValue: string) => void;
  isModalVisible?: boolean;
}

interface MapOptionProps {
  id?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  onClick?: () => void;
  data?: any;
  takePlaceData?: (data: GoogleMap) => void;
}

const MapOption: FC<MapOptionProps> = (props) => {
  return (
    <div className="flex p-2 items-center hover:bg-secondaryColor" onClick={() => props.onClick?.()}>
      <div className="w-12 pl-2 pr-5">{props.icon}</div>

      <div>
        <div>{props.title}</div>
        <div className="text-[#475467] text-xs">{props.description}</div>
      </div>
    </div>
  );
};
const MapListOption: FC<MapOptionProps> = (props) => {
  const handleClick = () => {
    if (props?.takePlaceData) {
      props?.takePlaceData(props?.data);
    }
  };

  return (
    <div className="flex p-2 items-center hover:bg-secondaryColor" onClick={handleClick}>
      <div className="w-12 pl-2 pr-5">{props.icon}</div>

      <div>
        <div>{props.description}</div>
        {/* <div className='text-[#475467] text-xs'>{props.description}</div> */}
      </div>
    </div>
  );
};
const MapSelection: FC<MapSelectionProps> = (props) => {
  const { t } = useTranslation("MapSelection");
  // const [value, setValue] = useState('');

  const {} = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBrpSMe1EEtLnlghhhfZzsMhIevCc3OnEU",
    libraries: ["places"],
  });

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const [errorMessage, setErrorMessage] = useState("");

  const [openMapModal, setOpenMapModal] = useState(false);

  //   const handleMapModalConfirm = () => {
  //     //
  //     setOpenMapModal(false);
  //   };

  const handleGetCurrentLocation = () => {
    // console.log("get current location");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setValue(`${position.coords.latitude},${position.coords.longitude}`);

        // TODO: get geo to address
        props.onChange?.(
          `${position.coords.latitude},${position.coords.longitude}`,
          `${position.coords.latitude},${position.coords.longitude}`
        );
      },
      (err) => {
        setErrorMessage(err.message);
        setTimeout(() => setErrorMessage(err.message), 3000);
      }
    );
  };

  const handleClickOption = (data: any) => {
    setValue(data?.description);
    clearSuggestions();
  };

  return (
    <>
      {errorMessage && <ErrorToast message={errorMessage} />}
      <div className="fixed top-0 left-0 bottom-0 right-0">
        <div
          onClick={() => props.onClose?.()}
          className="bg-[#000] bg-opacity-60 absolute top-0 bottom-0 left-0 right-0 z-0"
        ></div>

        <div className="relative flex px-5 py-8 flex-col z-10">
          <div className="bg-[#fff] rounded-full flex items-center justify-between w-full">
            <svg
              className="ml-3"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.29289 14.7071L12.2929 21.7071C12.6834 22.0976 13.3166 22.0976 13.7071 21.7071C14.0676 21.3466 14.0953 20.7794 13.7903 20.3871L13.7071 20.2929L8.414 15L22 15C22.5128 15 22.9355 14.614 22.9933 14.1166L23 14C23 13.4872 22.614 13.0645 22.1166 13.0067L22 13L8.414 13L13.7071 7.70711C14.0676 7.34662 14.0953 6.77939 13.7903 6.3871L13.7071 6.29289C13.3466 5.93241 12.7794 5.90468 12.3871 6.2097L12.2929 6.29289L5.29289 13.2929L5.19634 13.4047L5.12467 13.5159L5.07123 13.6287L5.03585 13.734L5.01102 13.8515L5.00397 13.9107L5.00018 14.0192L5.00397 14.0892L5.02024 14.2007L5.04974 14.3121L5.09367 14.4232L5.146 14.5207L5.21279 14.6167C5.23767 14.6485 5.26443 14.6786 5.29289 14.7071L12.2929 21.7071L5.29289 14.7071Z"
                fill="#344054"
              />
            </svg>
            <input
              value={value}
              disabled={!ready}
              onChange={(e) => setValue(e.target.value)}
              className="px-2 py-3 grow outline-none"
              placeholder={t("placeholder", { defaultValue: "Search your address" })}
            />

            <svg
              onClick={() => setValue("")}
              className={clsx("mr-3", value ? "cursor-pointer" : "invisible")}
              width="16"
              height="16"
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
          </div>

          <div className="mt-3 rounded-3xl bg-[#fff] overflow-hidden">
            {status === "OK" &&
              data?.map((data) => (
                <MapListOption
                  id={data?.place_id}
                  icon={
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="16" cy="16" r="16" fill="#F5F6F7" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.9998 17C17.9328 17 19.4998 15.433 19.4998 13.5C19.4998 11.567 17.9328 10 15.9998 10C14.0668 10 12.4998 11.567 12.4998 13.5C12.4998 15.433 14.0668 17 15.9998 17ZM15.9998 15.2C16.9387 15.2 17.6998 14.4389 17.6998 13.5C17.6998 12.5611 16.9387 11.8 15.9998 11.8C15.0609 11.8 14.2998 12.5611 14.2998 13.5C14.2998 14.4389 15.0609 15.2 15.9998 15.2Z"
                        fill="#98A2B3"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.24268 13.7699C8.24268 9.48026 11.7141 6 15.9998 6C20.2855 6 23.757 9.48026 23.757 13.7699C23.757 16.903 21.7829 20.6225 18.1922 24.8679C18.0891 24.9898 17.976 25.1029 17.8541 25.206C16.6433 26.2301 14.8315 26.0787 13.8074 24.8679L13.2403 24.1974L13.2461 24.1923C10.0115 20.2269 8.24268 16.7357 8.24268 13.7699ZM15.1848 23.7091C15.5675 24.1576 16.2411 24.2128 16.6917 23.8317C16.7372 23.7932 16.7794 23.751 16.8179 23.7055C20.3631 19.5139 21.957 16.2221 21.957 13.7699C21.957 10.4712 19.2883 7.8 15.9998 7.8C12.7114 7.8 10.0427 10.4712 10.0427 13.7699C10.0427 16.2221 11.6365 19.5139 15.1817 23.7055L15.1848 23.7091Z"
                        fill="#98A2B3"
                      />
                    </svg>
                  }
                  description={data?.description}
                  data={data}
                  takePlaceData={handleClickOption}
                />
              ))}
            <MapOption
              icon={
                <svg
                  className="mr-3"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="16" cy="16" r="16" fill="#F5F6F7" />
                  <path
                    d="M14.75 7.5C18.7541 7.5 22 10.7459 22 14.75C22 16.3912 21.4547 17.9051 20.5353 19.1202L24.7071 23.2929C25.0976 23.6834 25.0976 24.3166 24.7071 24.7071C24.3166 25.0976 23.6834 25.0976 23.2929 24.7071L19.1202 20.5353C17.9051 21.4547 16.3912 22 14.75 22C10.7459 22 7.5 18.7541 7.5 14.75C7.5 10.7459 10.7459 7.5 14.75 7.5ZM14.75 9.5C11.8505 9.5 9.5 11.8505 9.5 14.75C9.5 17.6495 11.8505 20 14.75 20C17.6495 20 20 17.6495 20 14.75C20 11.8505 17.6495 9.5 14.75 9.5Z"
                    fill="#98A2B3"
                  />
                </svg>
              }
              title="Search “Farum Azula”"
              description="It’s your location"
            />

            <MapOption
              icon={
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="#F5F6F7" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.9 8.8C9.7402 8.8 8.8 9.7402 8.8 10.9V11.9C8.8 12.3971 8.39706 12.8 7.9 12.8C7.40294 12.8 7 12.3971 7 11.9V10.9C7 8.74609 8.74609 7 10.9 7H11.9C12.3971 7 12.8 7.40294 12.8 7.9C12.8 8.39706 12.3971 8.8 11.9 8.8H10.9Z"
                    fill="#2688EB"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.8 21.1C8.8 22.2598 9.7402 23.2 10.9 23.2H11.9C12.3971 23.2 12.8 23.6029 12.8 24.1C12.8 24.5971 12.3971 25 11.9 25H10.9C8.74609 25 7 23.2539 7 21.1L7 20.1C7 19.6029 7.40294 19.2 7.9 19.2C8.39706 19.2 8.8 19.6029 8.8 20.1V21.1Z"
                    fill="#2688EB"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.1992 7.9C19.1992 7.40294 19.6022 7 20.0992 7H21.0992C23.2531 7 24.9992 8.74609 24.9992 10.9V11.9C24.9992 12.3971 24.5963 12.8 24.0992 12.8C23.6022 12.8 23.1992 12.3971 23.1992 11.9V10.9C23.1992 9.7402 22.259 8.8 21.0992 8.8H20.0992C19.6022 8.8 19.1992 8.39706 19.1992 7.9Z"
                    fill="#2688EB"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24.1 19.2C24.5971 19.2 25 19.603 25 20.1V21.1C25 23.2539 23.2539 25 21.1 25H20.1C19.6029 25 19.2 24.5971 19.2 24.1C19.2 23.603 19.6029 23.2 20.1 23.2H21.1C22.2598 23.2 23.2 22.2598 23.2 21.1V20.1C23.2 19.603 23.6029 19.2 24.1 19.2Z"
                    fill="#2688EB"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 11.1C14.067 11.1 12.5 12.667 12.5 14.6C12.5 16.2217 13.6029 17.5858 15.0996 17.9831V21.1C15.0996 21.5971 15.5026 22 15.9996 22C16.4967 22 16.8996 21.5971 16.8996 21.1V17.9833C18.3967 17.5863 19.5 16.222 19.5 14.6C19.5 12.667 17.933 11.1 16 11.1ZM14.3 14.6C14.3 13.6611 15.0611 12.9 16 12.9C16.9389 12.9 17.7 13.6611 17.7 14.6C17.7 15.5389 16.9389 16.3 16 16.3C15.0611 16.3 14.3 15.5389 14.3 14.6Z"
                    fill="#667085"
                  />
                </svg>
              }
              onClick={handleGetCurrentLocation}
              title={t("currentLocation", { defaultValue: "Use current location" })}
              description={t("permission", { defaultValue: "We need you permission" })}
            />

            <MapOption
              onClick={() => setOpenMapModal(true)}
              icon={
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="#F5F6F7" />
                  <path
                    d="M7 9.45472L13.5455 7.81836L18.4545 9.45472L25 7.81836V22.5456L18.4545 24.182L13.5455 22.5456L7 24.182V9.45472Z"
                    stroke="#98A2B3"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="square"
                  />
                  <path
                    d="M18.4546 14.3638L21.7273 17.6365"
                    stroke="#98A2B3"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="square"
                  />
                  <path
                    d="M21.7273 14.3638L18.4546 17.6365"
                    stroke="#98A2B3"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="square"
                  />
                  <path
                    d="M10.2729 16H11.0911"
                    stroke="#98A2B3"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="square"
                  />
                  <path
                    d="M14.3638 16H15.182"
                    stroke="#98A2B3"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="square"
                  />
                </svg>
              }
              title={t("useMap", { defaultValue: "Use map" })}
              description={t("useMapDescription", { defaultValue: "Choose location with map pin" })}
            />
          </div>
        </div>

        {openMapModal && (
          <div className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-[#fff]">
            {/* <MapPin onClose={() => setOpenMapModal(false)} onConfirm={handleMapModalConfirm} /> */}
          </div>
        )}
      </div>
    </>
  );
};

export const InputDropDown: FC<InputAddressProps> = (props) => {
  const [newValue, setValue] = useControllableValue(props, {
    valuePropName: "textValue",
    defaultValue: "",
  });

  const {} = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBrpSMe1EEtLnlghhhfZzsMhIevCc3OnEU",
    libraries: ["places"],
  });

  const {} = usePlacesAutocomplete();

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <InputBase
        {...props}
        inputProps={{
          ...props.inputProps,
        }}
        Input={Input}
        value={newValue}
        onChange={setValue}
        appendOn={
          <>
            <svg
              onClick={() => setIsModalVisible(true)}
              className="cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.75 3.5C14.7541 3.5 18 6.74594 18 10.75C18 12.3912 17.4547 13.9051 16.5353 15.1202L20.7071 19.2929C21.0976 19.6834 21.0976 20.3166 20.7071 20.7071C20.3166 21.0976 19.6834 21.0976 19.2929 20.7071L15.1202 16.5353C13.9051 17.4547 12.3912 18 10.75 18C6.74594 18 3.5 14.7541 3.5 10.75C3.5 6.74594 6.74594 3.5 10.75 3.5ZM10.75 5.5C7.8505 5.5 5.5 7.8505 5.5 10.75C5.5 13.6495 7.8505 16 10.75 16C13.6495 16 16 13.6495 16 10.75C16 7.8505 13.6495 5.5 10.75 5.5Z"
                fill="#C7322D"
              />
            </svg>
          </>
        }
      />

      {isModalVisible && (
        <MapSelection
          textValue={props.textValue}
          onChange={(value, textValue) => {
            setIsModalVisible(false);
            props.onChange?.(value);
            props.onTextChange?.(textValue);
          }}
          onClose={() => setIsModalVisible(false)}
          isModalVisible={isModalVisible}
        />
      )}
    </>
  );
};
