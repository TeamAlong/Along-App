// LocationAutocomplete.js
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useFrom } from "@/context/LocationContext/FromContext";
import { useDestination } from "@/context/LocationContext/DestinationContext";

const LocationInput = ({ label, value, onChange, placeholder, type }) => {
  //   const [value, setValue] = useState(null);
  const { source, setSource } = useFrom();
  const { destination, setDestination } = useDestination();

  const getLatAndLng = (place, type) => {
    console.log("result", place, type);

    const placeId = place.value.place_id;
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.getDetails({ placeId }, (place, status) => {
      if (status === "OK" && place.geometry && place.geometry.location) {
        console.log(
          "from result:",
          place.geometry.location.lng(),
          place.geometry.location.lat()
        );
        const locationData = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          name: place.formatted_address,
          label: place.name,
        };

        // Update the respective context based on the type
        if (type === "source") {
          setSource(locationData);
        } else if (type === "destination") {
          setDestination(locationData);
        }
      }
    });
  };
  return (
    <div className="flex flex-col gap-2 items-start border-b border-[#7E7E7E] pb-3">
      <p className="text-xs text-[#7E7E7E]">{label}</p>
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        selectProps={{
          value,
          onChange: (place) => {
            getLatAndLng(place, type);
            onChange(place);
          },
          placeholder,
          isClearable: true,
          className: "w-full",
          components: {
            DropdownIndicator: false,
          },
          styles: {
            control: (provided) => ({
              ...provided,
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
            }),
          },
        }}
      />
    </div>
  );
};

export default LocationInput;
