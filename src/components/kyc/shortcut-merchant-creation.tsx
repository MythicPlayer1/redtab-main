import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ErrorToast } from "../ErrorToast";
import { InputBaseProps } from "../Input";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import usePlacesAutocomplete from "use-places-autocomplete";
import { KYCFormStore, NepalStatesStore, useKYCStore } from "../../store/kyc/kyc-info-store";
import { getAllDistricts, getAllProvinces, addressObject } from "../../pages/kyc/merchant/nepal-data";
import { useMerchantContactStore } from "../../store/merchant-profile/use-merchant-contact-store";
import { MdOutlineBusiness } from "react-icons/md";
//import { useSelectedOutletUuidStore } from "../../store/merchant-profile/use-merchant-profile-outlet-store";

export interface InputAddressProps extends Omit<InputBaseProps<any>, "Input"> {
  textValue?: string;
  onTextChange?: (newValue: string) => void;
  onClose?: () => void;
}
interface MapSelectionProps {
  textValue?: string;
  onClose?: () => void;
  onChange?: (newValue: any) => void;
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
  onClose?: () => void;
  onChange?: (newValue: any) => void;
}

const MapListOption: FC<MapOptionProps> = (props) => {
  const { setPlaceData } = useKYCStore();
  const { setProvinces, setDistricts, setPostalCode } = NepalStatesStore();
  const { setIsClickedFromSearchList } = KYCFormStore();
  const handleClick = () => {
    if (props?.takePlaceData) {
      props?.takePlaceData(props?.data);
      geocodeByPlaceId(props?.data?.place_id); //call the Geocoding API using place Id once the place is selected;
      setIsClickedFromSearchList(true);
    }
  };

  const geocodeByPlaceId = (placeId: string) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ placeId: placeId }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        getPlaceDetails(placeId);
        let administrativeAreaLeve1Name = "";
        results[0]?.address_components?.forEach((component) => {
          if (component.types.includes("administrative_area_level_1")) {
            administrativeAreaLeve1Name = component.long_name;
            const allProvinces = getAllProvinces(addressObject);
            if (allProvinces.includes(component.long_name)) {
              setProvinces(component.long_name);
            } else {
              setProvinces("");
            }
          }
        });

        results[0]?.address_components?.forEach((component) => {
          if (component.types.includes("administrative_area_level_2")) {
            const districts = getAllDistricts(addressObject, administrativeAreaLeve1Name);
            if (districts.includes(component.long_name.toLowerCase())) {
              setDistricts(component.long_name);
            } else {
              setDistricts("");
            }
          }
          if (component.types.includes("postal_code")) {
            setPostalCode(component.long_name);
          }
        });
      } else {
        console.error("Geocode by Place ID was not successful for the following reason: " + status);
      }
    });
  };
  const getPlaceDetails = (placeId: string) => {
    const map = new google.maps.Map(document.createElement("div"));
    const service = new google.maps.places.PlacesService(map as google.maps.Map);
    const { setMerchantPhoneNumber, setTypes } = useMerchantContactStore.getState();
    service.getDetails({ placeId }, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place) {
        setPlaceData(place);
        if (place?.name) {
          props?.onChange?.(place?.name);
        } else {
          props?.onChange?.(props?.description);
        }
        props?.onClose?.();
        if (place?.formatted_phone_number) {
          setMerchantPhoneNumber(place?.formatted_phone_number);
        }
        if (place?.types) {
          setTypes(place?.types);
        }
      } else {
        console.error("Place details request was not successful for the following reason: " + status);
      }
    });
  };

  return (
    <div className="flex p-2 items-center hover:bg-secondaryColor" onClick={handleClick}>
      <div className="pl-2 pr-4">{props.icon}</div>
      <div>
        <div className="text-[#475467] text-sm cursor-pointer">{props.description}</div>
      </div>
    </div>
  );
};
const MapSelection1: FC<MapSelectionProps> = (props) => {
  //const { selectedOutletName, setSelectedOutletName } = useSelectedOutletUuidStore();
  const {
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ["establishment"],
      componentRestrictions: { country: "np" },
      region: "np",
      language: "en",
    },
    debounce: 300,
  });

  const { setIsClickedFromSearchList } = KYCFormStore();
  const [errorMessage] = useState("");
  const { setStreetLocation } = useKYCStore();
  const handleClickOption = (data: any) => {
    setStreetLocation(data?.description);
    clearSuggestions();
    setIsClickedFromSearchList(false);
  };
  const { t } = useTranslation("MapSelection");
  const handleNameClick = () => {
    props.onClose?.();
    props.onChange?.(value);
    setIsClickedFromSearchList(false);


    // set user input name or selected outlet name from list to the store
    // console.log("values.........", value);
    // setSelectedOutletName(value);
  };

  // set the selected outlet name to the input field
  useEffect(() => {
      setValue(props?.textValue || "");
  }, []);

  return (
    <>
      {errorMessage && <ErrorToast message={errorMessage} />}
      <div className="font-poppins">
        <div className="relative flex px-1 py-4 flex-col">
          <div className="bg-[#fff] rounded-full flex items-center justify-between w-full overflow-hidden px-4">
            <input
              value={value}
              autoFocus
              onChange={(e) => {
                setValue(e.target.value);
              }}
              className="px-2 py-3 grow outline-none text-sm placeholder:text-[#667085] placeholder:font-normal"
              placeholder={t("placeholder", { defaultValue: "Enter the name" })}
            />
           <MdOutlineBusiness color="#98A2B3" size={20}/>
          </div>
          <div className="mt-3 rounded-3xl bg-[#fff] overflow-hidden">
            {value && (
              <div className="flex gap-2 px-4 py-3 w-full items-center cursor-pointer" onClick={handleNameClick}>
                   <MdOutlineBusiness color="#98A2B3" size={20}/>
                <p>{value}</p>
              </div>
            )}
            {status === "OK" &&
              data?.map((data) => (
                <MapListOption
                  id={data?.place_id}
                  onClose={() => {
                    props.onClose?.();
                  }}
                  onChange={props.onChange}
                  icon={
                    <MdOutlineBusiness color="#98A2B3" size={20}/>
                  }
                  description={data?.description}
                  data={data}
                  takePlaceData={handleClickOption}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export const InputMerchantName: FC<InputAddressProps> = (props) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBrpSMe1EEtLnlghhhfZzsMhIevCc3OnEU",
    libraries: ["places"],
  });
  return (
    <>{isLoaded && <MapSelection1 textValue={props.textValue} onClose={props?.onClose} onChange={props?.onChange} />}</>
  );
};
