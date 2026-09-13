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
//"@/components/ui/select";

export type LocationDropdownProps = {
  location: string;
  //   setLocation: (location: string) => void;
  setLocation: Dispatch<SetStateAction<string>>;
};

export default function LocationDropdown({
  location,
  setLocation,
}: LocationDropdownProps) {
  const Cities = [
    { label: "New York", value: "new_york" },
    { label: "Los Angeles", value: "los_angeles" },
    { label: "Chicago", value: "chicago" },
    { label: "Houston", value: "houston" },
    { label: "Phoenix", value: "phoenix" },
  ];

  return (
    <Select
      items={Cities}
      value={location}
      onValueChange={(value) => setLocation(value ?? "")}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select City" />
      </SelectTrigger>
      <SelectContent className="z-1001">
        {location === "custom" && (
          <SelectItem value="custom">Custom</SelectItem>
        )}
        <SelectGroup>
          {Cities.map((item) => (
            <SelectItem key={item.value} value={item.label}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
