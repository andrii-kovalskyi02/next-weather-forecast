"use client";

import Image from 'next/image';
import { getLocalizedDateString } from '@/utils/getLocalizedDateString';
import { useAppContext } from '@/providers/AppProvider';
import { getWindDirection } from '@/utils/getWindDirection';
import SunriseIcon from './icons/SunriseIcon';
import SunsetIcon from './icons/SunsetIcon';
import HumidityIcon from './icons/HumidityIcon';
import WindIcon from './icons/WindIcon';
import PressureIcon from './icons/PressureIcon';
import CompassIcon from './icons/CompassIcon';

type Props = {
  weatherData: WeatherData;
};

type MetricCardProps = {
  icon: React.ReactNode;
  value: string;
  label: string;
};

const MetricCard = ({ icon, value, label }: MetricCardProps) => (
  <div className="flex flex-col items-center gap-2 w-32 bg-white/20 rounded-2xl p-4">
    <div className="w-10 h-10 flex items-center justify-center text-zinc-700">
      {icon}
    </div>
    <span className="font-bold text-xl">{value}</span>
    <span className="font-medium text-sm text-zinc-600">{label}</span>
  </div>
);

const CurrentWeatherDetails = ({ weatherData }: Props) => {
  const { timeFormatOptions } = useAppContext();
  const { weather, main, wind, sys } = weatherData;
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  const windSpeedKmh = Math.round(wind.speed * 3.6);

  return (
    <div className="flex flex-col justify-center items-center gap-8 h-full p-6 md:flex-row md:gap-6">
      {/* Temperature & sun times */}
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-[5rem] leading-none bg-clip-text text-transparent bg-gradient-to-bl from-white from-5% to-zinc-800">
            {Math.round(main.temp)}&deg;C
          </h1>
          <p className="flex items-center gap-1.5 font-semibold text-xl text-zinc-600">
            <span className="text-base font-medium">Feels like</span>
            {Math.round(main.feels_like)}&deg;C
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <div className="flex items-center gap-3">
            <SunriseIcon className="w-10 h-10 flex-shrink-0 text-amber-500" />
            <div>
              <p className="font-bold text-base leading-tight">Sunrise</p>
              <p className="font-medium text-sm text-zinc-600">
                {getLocalizedDateString(sys.sunrise * 1000, timeFormatOptions)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <SunsetIcon className="w-10 h-10 flex-shrink-0 text-orange-400" />
            <div>
              <p className="font-bold text-base leading-tight">Sunset</p>
              <p className="font-medium text-sm text-zinc-600">
                {getLocalizedDateString(sys.sunset * 1000, timeFormatOptions)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Weather icon & description */}
      <div className="flex flex-col items-center gap-2">
        <Image
          src={weatherIconUrl}
          alt={`Weather icon for ${weather[0].description}`}
          width={150}
          height={150}
        />
        <h2 className="font-bold text-2xl text-center capitalize">
          {weather[0].description}
        </h2>
      </div>

      {/* Metric cards */}
      <div className="flex flex-wrap justify-center gap-3 max-w-72">
        <MetricCard
          icon={<HumidityIcon className="w-full h-full" />}
          value={`${main.humidity}%`}
          label="Humidity"
        />
        <MetricCard
          icon={<WindIcon className="w-full h-full" />}
          value={`${windSpeedKmh} km/h`}
          label="Wind Speed"
        />
        <MetricCard
          icon={<PressureIcon className="w-full h-full" />}
          value={`${main.pressure} hPa`}
          label="Pressure"
        />
        <MetricCard
          icon={
            <CompassIcon
              className="w-full h-full"
              style={{ transform: `rotate(${wind.deg}deg)` }}
            />
          }
          value={getWindDirection(wind.deg)}
          label="Wind Dir"
        />
      </div>
    </div>
  );
};

export default CurrentWeatherDetails;
