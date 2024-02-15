"use client";

import { useEffect, useState } from 'react';
import { useAppContext } from '@/app/provider';
import { getLocalizedDateString } from '@/utils/getLocalizedDateString';
import { DateTimeFormatOptions } from 'intl';

type Props = {
  weatherData: WeatherData,
  timeZone: TimeZoneInfo
};

const WeatherDateTime = ({ weatherData, timeZone }: Props) => {
  const { timeFormatOptions } = useAppContext();
  const [currentDateTime, setCurrentDateTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  
  const options: DateTimeFormatOptions = {
    ...timeFormatOptions,
    timeZone: timeZone.timeZoneId,
  };

  const dateFormatOptions: DateTimeFormatOptions = {
    day: '2-digit',
    weekday: 'long',
    month: 'short',
    timeZone: timeZone.timeZoneId,
  };
  
  return (
    <div className='flex flex-col justify-center items-center gap-9 h-full p-12'>
      <h2 className="font-bold text-3xl text-center">{weatherData.name}</h2>
      <div className='flex flex-col items-center gap-2'>
        <h1 className="font-bold text-4xl text-center md:text-6xl">
          {getLocalizedDateString(currentDateTime, options)}
        </h1>
        <h3 className="font-regular text-xl text-center">
          {getLocalizedDateString(currentDateTime, dateFormatOptions)}
        </h3>
      </div>
    </div>
  )
};

export default WeatherDateTime;
