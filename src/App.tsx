//import { useState, type JSX } from "react";
// import type { JSX } from "react/jsx-runtime";
import { getWeather } from "./api";
import { useQuery } from "@tanstack/react-query";
import "./App.css";

export const App = () => {
  const { data } = useQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }),
  });
  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};
