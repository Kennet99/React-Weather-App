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
import type { Geocode } from "./schemas/geocodeSchema";
import type { Coords } from "./types";
import { getGeocode } from "./api";

export const App = () => {
  // const { data } = useSuspenseQuery({
  //   queryKey: ["weather"],
  //   queryFn: () => getWeather({ lat: 50, lon: 50 }) as Promise<unknown>,
  // });

  const [coords, setCoords] = useState<Coords>({
    lat: 50,
    lon: 50,
  });

  const [location, setLocation] = useState<Geocode | string>("New York");

  // Tanstack React Query for fetching geocode data based on the location
  const { data } = useQuery({
    queryKey: ["geocode", location],
    queryFn: () =>
      // getGeocode({ cityName: location as string }) as Promise<Geocode>,
      getGeocode({ cityName: location as string }),
  });

  // console.log("Location data:", data);

  // Function to handle map click events and set the coordinates - passed down as props
  const onMapClick = (lat: number, lon: number) => {
    setCoords({ lat, lon });
  };

  return (
    <>
      <div className="flex flex-col gap-4 p-8">
        {/* <Card title="Current weather">
          {JSON.stringify(data?.current, null, 2)}
        </Card> */}
        <Map coords={coords} onMapClick={onMapClick} />
        <LocationDropdown />
        <CurrentWeather
          title="Current weather"
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
