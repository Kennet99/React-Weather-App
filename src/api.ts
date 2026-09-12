type Coords = {
  lat: number;
  lon: number;
};
import { weatherSchema, type WeatherSchema } from "./schemas/weatherSchema";
export async function getWeather({
  lat,
  lon,
}: Coords): Promise<WeatherSchema | undefined> {
  const API_Key = import.meta.env.VITE_API_KEY;
  try {
    // API V4
    // const result = await fetch(
    //   `https://api.openweathermap.org/data/4.0/onecall/current?lat=${lat}&lon=${lon}&appid=${API_Key}&units=metric&exclude=minutely,alerts`,
    // );
    const result = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${API_Key}&units=metric`,
    );
    const data = await result.json();
    console.log(data);
    console.log(weatherSchema.parse(data));
    // return data;
    return weatherSchema.parse(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}
