import React from 'react';
import WeatherCardBackdrop from './WeatherCardBackdrop';
import CurrentWeatherDetails from './CurrentWeatherDetails';
import { getCurrentWeather, getTimeZone } from '@/app/handler';
import WeatherDateTime from './WeatherDateTime';

type Props = {
  geolocation: {
    lat: number;
    lon: number;
  };
};

const WeatherDateTimeDisplay = async ({ geolocation }: Props) => {
  const { lat, lon } = geolocation;

  const weatherData = await getCurrentWeather(
    lat,
    lon
  );
  const timeZone = await getTimeZone(
    lat,
    lon,
    weatherData.dt
  );

  return (
    <div className='flex flex-col justify-center gap-14 w-full lg:flex-row'>
      <div className='flex'>
        <WeatherCardBackdrop>
          <WeatherDateTime weatherData={weatherData} timeZone={timeZone} />
        </WeatherCardBackdrop>
      </div>
      <div className='flex grow'>
        <WeatherCardBackdrop>
          <CurrentWeatherDetails weatherData={weatherData} />
        </WeatherCardBackdrop>
      </div>
    </div>
  )
};

export default WeatherDateTimeDisplay;