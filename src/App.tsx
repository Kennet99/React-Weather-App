//import { useState, type JSX } from "react";
// import type { JSX } from "react/jsx-runtime";
// import { getWeather } from "./api";
// import { useSuspenseQuery } from "@tanstack/react-query";
import "./App.css";
// import Card from "./components/cards/Card";
import CurrentWeather from "./components/cards/CurrentWeather";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import AdditionalInfo from "./components/cards/AdditionalInfo";

export const App = () => {
  // const { data } = useSuspenseQuery({
  //   queryKey: ["weather"],
  //   queryFn: () => getWeather({ lat: 50, lon: 50 }) as Promise<unknown>,
  // });

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* <Card title="Current weather">
          {JSON.stringify(data?.current, null, 2)}
        </Card> */}
        <CurrentWeather title="Current weather"></CurrentWeather>
        <HourlyForecast title="Hourly forecast"></HourlyForecast>
        <DailyForecast title="Daily forecast"></DailyForecast>
        <AdditionalInfo title="Additional info"></AdditionalInfo>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        {/* <>{JSON.stringify(data, null, 2)}</> */}
      </div>
    </>
  );
};
