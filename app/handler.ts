import { handleResponse } from "@/utils/handleResponse";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

async function getLocation(city: string) {
  const response = await fetch(
    `${BASE_API_URL}/geo/1.0/direct?q=${city}&limit=5&appid=${WEATHER_API_KEY}`,
    { cache: 'no-store' }
  );

  return handleResponse<CustomGeolocation[]>(response);
}

async function getTimeZone(
  lat: number,
  lon: number,
  timeStamp: number
) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/timezone/json?location=${lat}%2C${lon}&timestamp=${timeStamp}&key=${process.env.MAPS_API_KEY}`
  );

  return handleResponse<TimeZoneInfo>(response);
}

async function getCurrentWeather(
  lat: number,
  lon: number
) {
  const response = await fetch(
    `${BASE_API_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`,
    { cache: 'no-store' }
  );

  return handleResponse<WeatherData>(response);
}

export { getLocation, getTimeZone, getCurrentWeather };
