"use client";

import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/app/provider';
import getLocalizedDateString from '@/utils/getLocalizedDateString';
import { DateTimeFormatOptions } from 'intl';

type Props = {
  weatherData: WeatherData,
  timeZone: TimeZoneInfo
};

const WeatherDateTime = ({ weatherData, timeZone }: Props) => {
  const { timeFormatOptions } = useAppContext();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
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
    <div className='flex flex-col justify-center items-center gap-9 h-full p-12 md:p-14 xl:p-16'>
      <h2 className="font-bold text-3xl text-center">{weatherData.name}</h2>
      <div className='flex flex-col items-center gap-2'>
        <h1 className="font-bold text-4xl text-center md:text-6xl">
          {getLocalizedDateString(undefined, options)}
        </h1>
        <h3 className="font-regular text-xl text-center">
          {getLocalizedDateString(undefined, dateFormatOptions)}
        </h3>
      </div>
    </div>
  )
};

export default WeatherDateTime;
