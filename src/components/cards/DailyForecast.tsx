import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import type { WeatherSchema } from "../../schemas/weatherSchema";
import WeatherIcon from "../WeatherIcon";
import type { WeatherComponent } from "../../types";

export default function DailyForecast({ title, coords }: WeatherComponent) {
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
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="flex flex-row gap-12 overflow-x-scroll scrollbar-gutter-stable">
        {data?.daily?.map((day) => (
          <div className="flex flex-col items-center min-w-20" key={day.dt}>
            <p className="text-xl font-semibold">
              {Math.round(day.temp.day)}°C
            </p>
            <WeatherIcon
              icon={day.weather[0].icon}
              description={day.weather[0].description}
            />
            <p className="text-zinc-400">
              {new Date(day.dt * 1000).toLocaleDateString(undefined, {
                weekday: "short",
              })}
            </p>
            {/* <p className="text-zinc-600 text-sm text-center">
              {day.weather[0].description}
            </p> */}
          </div>
        ))}
      </div>
    </Card>
  );
}
