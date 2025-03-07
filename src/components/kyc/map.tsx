import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
import React, { useState } from "react";
import { CiLocationArrow1 } from "react-icons/ci";
import { NepalStatesStore, useKYCStore } from "../../store/kyc/kyc-info-store";
import { MdLocationPin } from "react-icons/md";

const Map = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState({ lat: 27.700769, lng: 85.300140 });
  const [userLocation, setUserLocation] = useState({ lat: 27.700769, lng: 85.300140 });
  const [, setLocationInfo] = useState<any>(null);
  const { setStreetLocation, setPlaceData } = useKYCStore();
  const {setProvinces, setDistricts, setPostalCode}= NepalStatesStore();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBrpSMe1EEtLnlghhhfZzsMhIevCc3OnEU",
    libraries: ['places']
  });

  var options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,

  };

  const centerMarker = ()=>{
    setTop(window?.innerHeight/2 - 42);
    setLeft(window?.innerWidth/2 - 21);
  
  }

  function success(pos: any) {
    var crd = pos.coords;
    setCenter({ lat: crd.latitude, lng: crd.longitude });
    setUserLocation({ lat: crd.latitude, lng: crd.longitude });
    reverseGeocode(crd.latitude, crd.longitude);
  }

  function errors(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    if (err.code === err.TIMEOUT) {
      console.log("Retrying to get the position due to timeout...");
      navigator.geolocation.getCurrentPosition(success, errors, options);
    }
  }

  React.useEffect(() => {
    centerMarker();
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted" || result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            console.log("Geolocation permission denied.");
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);  
  const reverseGeocode = (lat: number, lng: number) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        setLocationInfo(results[0]);
        const placeId = results[0]?.place_id;
        getPlaceDetails(placeId);
        setStreetLocation(results[0]?.formatted_address);
        results[0]?.address_components?.forEach(component =>{
          if(component.types.includes("administrative_area_level_1")){
            setProvinces(component.long_name);
          }
          if(component.types.includes("administrative_area_level_2")){
            setDistricts(component.long_name);
          }
          if(component.types.includes("postal_code")){
            setPostalCode(component.long_name);
          }
        })
      } else {
        console.error("Geocode was not successful for the following reason: " + status);
      }
    });
  };

  const getPlaceDetails = (placeId: string) => {
    if (!map) return;
    const service = new google.maps.places.PlacesService(map);
    service.getDetails({ placeId }, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place) {
        setPlaceData(place);
        // console.log("Place details:", place);
        // Use the place details as needed
      } else {
        console.error("Place details request was not successful for the following reason: " + status);
      }
    });
  };


  if (!isLoaded) {
    return <p>Loading....</p>;
  }


  return (
    <div className='h-screen w-full relative'>
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{
          zoomControl: false,
          fullscreenControl: false,
          rotateControl:true,
          scaleControl:true,
          streetViewControl:true,
          scrollwheel:true,
        }}
        onLoad={(map: any) => setMap(map as google.maps.Map)}
        onDragEnd={() => {
          if (map) {
            const center = map.getCenter();
            const centerLat= map?.getCenter()?.lat();
            const centerLng= map?.getCenter()?.lng();
            if (center) {
              const lat = center.lat();
              const lng = center.lng();
              setCenter({ lat, lng });
              if(centerLat && centerLng){
              reverseGeocode(centerLat, centerLng);}
              // reverseGeocode(lat, lng);
              // console.log(`Dragged position: Latitude: ${lat}, Longitude: ${lng}`);
            }
          }
        }}
      
      >
        <MarkerF position={userLocation} />
        <div className="fixed  translate-x-0 translate-y-0" style={{top: top, left: left}}>
          <MdLocationPin size={42} color="#EA4335" />
        </div>
      </GoogleMap>
      <button
        onClick={() => map?.panTo(userLocation)}
        className="absolute bottom-20 right-3 z-30 bg-[#fff] rounded-full p-2"
      >
        <CiLocationArrow1 size={24}  />
      </button>

    </div>
  );
};

export default Map;