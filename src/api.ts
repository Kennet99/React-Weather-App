type Coords = {
  lat: number;
  lon: number;
};

export async function getWeather({ lat, lon }: Coords): Promise<void> {
  const API_Key = import.meta.env.VITE_API_KEY;
  try {
    const result = await fetch(
      `https://api.openweathermap.org/data/4.0/onecall/current?lat=${lat}&lon=${lon}&appid=${API_Key}&units=metric&exclude=minutely,alerts`,
    );
    const data = await result.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}
