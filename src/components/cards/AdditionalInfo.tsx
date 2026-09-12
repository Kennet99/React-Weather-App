import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import type { WeatherSchema } from "../../schemas/weatherSchema";
// import WeatherIcon from "../WeatherIcon";

type Props = {
  //   children?: React.ReactNode;
  title: string;
};

type FormatComponentProps = {
  value: string;
  number?: string | number;
};

const rows = [
  {
    label: "Cloudiness (%)",
    value: "clouds",
  },
  {
    label: "UV Index",
    value: "uvi",
  },
  {
    label: "Wind direction",
    value: "wind_deg",
  },
  {
    label: "Pressure (hPa)",
    value: "pressure",
  },
  {
    label: "Sunrise",
    value: "sunrise",
  },
  {
    label: "Sunset",
    value: "sunset",
  },
] as const;

export default function AdditionalInfo({ title }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }) as Promise<WeatherSchema>,
  });
  return (
    <Card title={title}>
      {rows.map(({ label, value }) => (
        <div key={value} className="flex justify-between mb-4">
          <span>{label}</span>
          {/* <span>{data?.current[value]}</span> */}
          <span>
            <FormatComponent value={value} number={data?.current[value]} />
          </span>
        </div>
      ))}
    </Card>
  );
}

function FormatComponent({ value, number }: FormatComponentProps) {
  if (value === "sunrise" || value === "sunset") {
    return new Date(Number(number) * 1000).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }
  return number;
}
