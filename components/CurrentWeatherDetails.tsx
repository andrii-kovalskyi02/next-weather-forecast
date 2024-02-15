"use client";

import Image from 'next/image';
import { getLocalizedDateString } from '@/utils/getLocalizedDateString';
import { useAppContext } from '@/app/provider';
import { getWindDirection } from '@/utils/getWindDirection';

type Props = {
  weatherData: WeatherData
};

const CurrentWeatherDetails = ({
  weatherData
}: Props) => {
  const { timeFormatOptions } = useAppContext();
  const { weather, main, wind, sys } = weatherData;
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className='flex flex-col justify-center items-center gap-10 h-full p-6 md:flex-row md:gap-7'>
      <div className='flex flex-col gap-7'>
        <div className='flex flex-col justify-center'>
          <h1 className='font-bold text-[5rem] leading-[5rem] bg-clip-text text-transparent bg-gradient-to-bl from-white from-1% to-zinc-800'>
            {Math.round(main.temp)}&deg;C
          </h1>
          <h2 className='flex justify-center items-center gap-2 font-semibold text-3xl'>
            <span className='flex flex-shrink-0 text-xl'>Feels like:</span>
            {Math.round(main.feels_like)}&deg;C
          </h2>
        </div>
        <div className='flex flex-col gap-3'>
          <div className='flex justify-center gap-3 text-center'>
            <Image
              src="/assets/icons/sunrise.png"
              alt="Icon for sunrise"
              width={48}
              height={52}
            />
            <div className="flex flex-col">
              <h3 className='font-bold text-xl'>
                Sunrise
              </h3>
              <h4 className='font-semibold text-base'>
                {getLocalizedDateString(sys.sunrise * 1000, timeFormatOptions)}
              </h4>
            </div>
          </div>
          <div className='flex justify-center gap-3 text-center'>
            <Image
              src="/assets/icons/sunset.png"
              alt="Icon for sunset"
              width={48}
              height={52}

            />
            <div className="flex flex-col">
              <h3 className='font-bold text-xl'>
                Sunset
              </h3>
              <h4 className='font-semibold text-base'>
                {getLocalizedDateString(sys.sunset * 1000, timeFormatOptions)}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center w-[60%]'>
        <Image
          src={weatherIconUrl}
          alt={`Weather icon for ${weather[0].description}`}
          width={150}
          height={150}
        />
        <h2 className='font-bold text-3xl text-center'>
          {weather[0].main}
        </h2>
      </div>
      <div className='flex flex-wrap justify-center gap-y-4 max-w-72'>
        <div className='flex flex-col items-center w-32'>
          <Image
            src="/assets/icons/humidity.png"
            alt="Weather icon for humidity"
            width={60}
            height={51}
            className='mb-4'
          />
          <h3 className='mb-1 font-bold text-xl'>
            {main.humidity}%
          </h3>
          <h4 className='font-medium text-base'>
            Humidity
          </h4>
        </div>
        <div className='flex flex-col items-center w-32'>
          <Image
            src="/assets/icons/wind.png"
            alt="Weather icon for wind speed"
            width={60}
            height={60}
            className='mb-2'
          />
          <h3 className='mb-1 font-bold text-xl'>
            {Math.round(wind.speed)}km/h
          </h3>
          <h4 className='font-medium text-base'>
            Wind Speed
          </h4>
        </div>
        <div className='flex flex-col items-center w-32'>
          <Image
            src="/assets/icons/pressure.png"
            alt="Weather icon for pressure"
            width={60}
            height={60}
            className='mb-2'
          />
          <h3 className='mb-1 font-bold text-xl'>
            {main.pressure}hPa
          </h3>
          <h4 className='font-medium text-base'>
            Pressure
          </h4>
        </div>
        <div className='flex flex-col items-center w-32'>
          <div className="mb-2">
            <Image
              src="/assets/icons/wind-direction.png"
              alt="Weather icon for wind direction"
              width={60}
              height={60}
              style={{ transform: `rotate(${wind.deg}deg)` }}
            />
          </div>
          <h3 className='mb-1 font-bold text-xl'>
            {getWindDirection(wind.deg)}
          </h3>
          <h4 className='font-medium text-base'>
            Wind Direction
          </h4>
        </div>
      </div>
    </div>
  )
};

export default CurrentWeatherDetails;
