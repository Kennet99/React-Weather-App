import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import type { WeatherSchema } from "../../schemas/weatherSchema";
import WeatherIcon from "../WeatherIcon";

type Props = {
  //   children?: React.ReactNode;
  title: string;
};

export default function CurrentWeather({ title }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }) as Promise<WeatherSchema>,
  });

  return (
    <>
      <Card title={title}>
        <div className="flex flex-row gap-12">
          {data?.current && (
            <div
              className="flex flex-col gap-4 items-start"
              key={data.current.dt}
            >
              <WeatherIcon
                className="size-24"
                icon={data.current.weather[0].icon}
                description={data.current.weather[0].description}
              />
              <h1 className="text-6xl font-semibold">
                {Math.round(data.current.temp)}°C
              </h1>
              <h3 className="text-2xl">
                {data.current.weather[0].description}
              </h3>
              {/* <p className="text-lg">
                Feels like: {Math.round(data.current.feels_like)}°C
              </p> */}
            </div>
          )}
        </div>
        <div className="flex flex-row gap-2">
          Feels like:
          <h3>{Math.round(data.current.feels_like)}°C</h3>
        </div>
        <div className="flex flex-row gap-2">
          Local time:
          <h3>
            {new Intl.DateTimeFormat("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
              timeZone: data.timezone,
            }).format(new Date(data.current.dt * 1000))}
          </h3>
        </div>
        <div className="flex flex-row gap-2">
          Humidity:
          <h3>{data.current.humidity}%</h3>
        </div>
        <div className="flex flex-row gap-2">
          Wind speed:
          <h3>{data.current.wind_speed} mph</h3>
        </div>
      </Card>
    </>
  );
}
