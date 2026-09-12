//import { useState, type JSX } from "react";
// import type { JSX } from "react/jsx-runtime";
import { getWeather } from "./api";
import { useSuspenseQuery } from "@tanstack/react-query";
import "./App.css";
import Card from "./components/cards/Card";
import DailyForecast from "./components/cards/DailyForecast";

export const App = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }) as Promise<unknown>,
  });

  return (
    <>
      <Card title="Current weather">
        {JSON.stringify(data?.current, null, 2)}
      </Card>
      <DailyForecast title="Daily forecast"></DailyForecast>
      <Card title="Hourly forecast">
        {JSON.stringify(data?.hourly, null, 2)}
      </Card>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {/* <>{JSON.stringify(data, null, 2)}</> */}
    </>
  );
};
