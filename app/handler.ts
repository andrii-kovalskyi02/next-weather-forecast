const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

async function getLocation(city: string): Promise<CustomGeolocation[]> {
  const response = await fetch(
    `${BASE_API_URL}/geo/1.0/direct?q=${city}&limit=5&appid=${WEATHER_API_KEY}`,
    { cache: 'no-store' }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json()
}

async function getTimeZone(
  lat: number,
  lon: number,
  timeStamp: number
): Promise<TimeZoneInfo> {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/timezone/json?location=${lat}%2C${lon}&timestamp=${timeStamp}&key=${process.env.MAPS_API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}

async function getCurrentWeather(
  lat: number,
  lon: number
): Promise<WeatherData> {
  const response = await fetch(
    `${BASE_API_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`,
    { cache: 'no-store' }
  );

  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}

export { getLocation, getTimeZone, getCurrentWeather };
