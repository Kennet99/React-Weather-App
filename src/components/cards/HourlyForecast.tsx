import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import type { WeatherSchema } from "../../schemas/weatherSchema";
import WeatherIcon from "../WeatherIcon";
import type { WeatherComponent } from "../../types";

export default function HourlyForecast({ title, coords }: WeatherComponent) {
  const { lat, lon } = coords;
  const { data } = useSuspenseQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () =>
      getWeather({
        lat,
        lon,
      }) as Promise<WeatherSchema>,
  });

  return (
    <Card title={title}>
      <div className="flex flex-row gap-10 overflow-x-scroll scrollbar-gutter-stable">
        {data?.hourly?.map((hour) => (
          <div className="flex flex-col items-center min-w-20" key={hour.dt}>
            <p className="text-xl font-semibold">{Math.round(hour.temp)}°C</p>
            <WeatherIcon
              icon={hour.weather[0].icon}
              description={hour.weather[0].description}
            />
            <p className="text-zinc-400">
              {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            {/* <p>{hour.weather[0].description}</p> */}
          </div>
        ))}
      </div>
    </Card>
  );
}
