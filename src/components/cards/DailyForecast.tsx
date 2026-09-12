import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import type { WeatherSchema } from "../../schemas/weatherSchema";

type Props = {
  //   children?: React.ReactNode;
  title: string;
};

export default function DailyForecast({ title }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }) as Promise<WeatherSchema>,
  });

  return (
    <Card title={title}>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="flex flex-row gap-8">
        {data?.daily?.map((day) => (
          <div className="flex flex-col items-center w-24" key={day.dt}>
            <img
              className="w-16 h-16"
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
            />
            <p>
              {new Date(day.dt * 1000).toLocaleDateString(undefined, {
                weekday: "short",
              })}
            </p>
            <p>{Math.round(day.temp.day)}°C</p>
            <p>{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
