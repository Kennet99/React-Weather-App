import { useState } from "react";
// import type { JSX } from "react/jsx-runtime";
// import { getWeather } from "./api";
import { useQuery } from "@tanstack/react-query";
// import { useSuspenseQuery } from "@tanstack/react-query";
import "./App.css";
// import Card from "./components/cards/Card";
import Map from "./components/Map";
import CurrentWeather from "./components/cards/CurrentWeather";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import LocationDropdown from "./components/dropdowns/LocationDropdown";
// import type { Geocode } from "./schemas/geocodeSchema";
import type { Coords } from "./types";
import { getGeocode } from "./api";
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown";
import MapLegend from "./components/MapLegend";

export const App = () => {
  // const { data } = useSuspenseQuery({
  //   queryKey: ["weather"],
  //   queryFn: () => getWeather({ lat: 50, lon: 50 }) as Promise<unknown>,
  // });

  const [coordinates, setCoords] = useState<Coords>({
    lat: 50,
    lon: 50,
  });

  const [location, setLocation] = useState<string>("New York");

  const [mapType, setMapType] = useState<string>("clouds_new");

  // Tanstack React Query for fetching geocode data based on the location
  const { data: geocodeData } = useQuery({
    queryKey: ["geocode", location],
    queryFn: () => getGeocode({ cityName: location }),
  });

  // console.log("Location data:", data);

  // Function to handle map click events and set the coordinates - passed down as props
  const onMapClick = (lat: number, lon: number) => {
    setCoords({ lat, lon });
    setLocation("custom");
  };

  const coords =
    location === "custom"
      ? coordinates
      : { lat: geocodeData?.[0].lat ?? 0, lon: geocodeData?.[0].lon ?? 0 };

  console.log(location);

  return (
    <>
      <div className="flex flex-col gap-4 p-8">
        {/* <Card title="Current weather">
          {JSON.stringify(data?.current, null, 2)}
        </Card> */}
        <div className="flex gap-4">
          <div className="flex gap-2 flex-col">
            <h1>Location</h1>
            <LocationDropdown location={location} setLocation={setLocation} />
          </div>
          <div className="flex gap-2 flex-col">
            <h1>Map type</h1>
            <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
          </div>
        </div>
        <div className="relative w-full">
          <Map coords={coords} onMapClick={onMapClick} mapType={mapType} />
          <MapLegend mapType={mapType} />
        </div>
        <CurrentWeather
          title={`Current weather for ${location}`}
          coords={coords}
        ></CurrentWeather>
        <DailyForecast title="Daily forecast" coords={coords}></DailyForecast>
        <HourlyForecast
          title="Hourly forecast"
          coords={coords}
        ></HourlyForecast>
        <AdditionalInfo
          title="Additional info"
          coords={coords}
        ></AdditionalInfo>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </div>
    </>
  );
};
