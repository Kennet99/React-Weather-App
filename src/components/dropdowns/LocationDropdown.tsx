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

export default function LocationDropdown() {
  const Cities = [
    { label: "New York", value: "new_york" },
    { label: "Los Angeles", value: "los_angeles" },
    { label: "Chicago", value: "chicago" },
    { label: "Houston", value: "houston" },
    { label: "Phoenix", value: "phoenix" },
  ];

  return (
    <Select items={Cities}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select City" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Cities.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
