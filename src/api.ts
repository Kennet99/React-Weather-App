import { weatherSchema, type WeatherSchema } from "./schemas/weatherSchema";
import { GeocodeSchema, type Geocode } from "./schemas/geocodeSchema";

type Coords = {
  lat: number;
  lon: number;
};

type GeocodeParams = {
  cityName: string;
  stateCode?: string;
  countryCode?: string;
  limit?: number;
};

const API_Key = import.meta.env.VITE_API_KEY;

export async function getWeather({
  lat,
  lon,
}: Coords): Promise<WeatherSchema | undefined> {
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
    // return data;
    return weatherSchema.parse(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

export async function getGeocode({
  cityName,
  // stateCode,
  // countryCode,
  limit = 1,
}: GeocodeParams): Promise<Geocode | undefined> {
  try {
    // Full query
    // const result = await fetch(
    //   `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${API_Key}`,
    // );
    const result = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${API_Key}`,
    );
    const data = await result.json();
    // console.log(data);
    console.log("Geocode data:", GeocodeSchema.parse(data));
    return GeocodeSchema.parse(data);
  } catch (error) {
    console.error("Error fetching geocode data:", error);
  }
}
