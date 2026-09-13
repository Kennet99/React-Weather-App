import clsx from "clsx";
// import React from "react";

type Props = {
  icon: string;
  description: string;
  className?: string;
};

export default function WeatherIcon({ icon, description, className }: Props) {
  return (
    <img
      // className={`w-16 h-16 ${className ?? ""}`}
      className={clsx("size-20", className)}
      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
      alt={description}
    />
  );
}
