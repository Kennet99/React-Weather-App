import type { Dispatch, SetStateAction } from "react";
// import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
// import type { LocationDropdownProps } from "./LocationDropdown";
//"@/components/ui/select";

export type MapTypeDropdownProps = {
  mapType: string;
  setMapType: Dispatch<SetStateAction<string>>;
};

export default function MapTypeDropdown({
  mapType,
  setMapType,
}: MapTypeDropdownProps) {
  const MapTypes = [
    { label: "Clouds", value: "clouds_new" },
    { label: "Precipitation", value: "precipitation_new" },
    { label: "Pressure", value: "pressure_new" },
    { label: "Wind", value: "wind_new" },
    { label: "Temperature", value: "temp_new" },
  ];

  return (
    <Select
      items={MapTypes}
      value={mapType}
      onValueChange={(value) => setMapType(value ?? "")}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Map Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {MapTypes.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className="capitalize"
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
