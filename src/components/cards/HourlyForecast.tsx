import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import type { WeatherSchema } from "../../schemas/weatherSchema";
import WeatherIcon from "../WeatherIcon";

type Props = {
  //   children?: React.ReactNode;
  title: string;
};

export default function HourlyForecast({ title }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }) as Promise<WeatherSchema>,
  });

  return (
    <Card title={title}>
      <div className="flex flex-row gap-12 overflow-x-scroll scrollbar-gutter-stable">
        {data?.hourly?.map((hour) => (
          <div className="flex flex-col items-center w-16" key={hour.dt}>
            <p>{Math.round(hour.temp)}°C</p>
            <WeatherIcon
              icon={hour.weather[0].icon}
              description={hour.weather[0].description}
            />
            <p>
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
