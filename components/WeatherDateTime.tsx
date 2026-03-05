"use client";

import { useEffect, useState } from 'react';
import { useAppContext } from '@/providers/AppProvider';
import { getLocalizedDateString } from '@/utils/getLocalizedDateString';
import { DateTimeFormatOptions } from 'intl';

type Props = {
  weatherData: WeatherData;
  timeZone: TimeZoneInfo;
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

  const timeOptions: DateTimeFormatOptions = {
    ...timeFormatOptions,
    timeZone: timeZone.timeZoneId,
  };

  const dateOptions: DateTimeFormatOptions = {
    day: '2-digit',
    weekday: 'long',
    month: 'short',
    timeZone: timeZone.timeZoneId,
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8 h-full p-10">
      <h2 className="font-bold text-3xl text-center">{weatherData.name}</h2>
      <div className="flex flex-col items-center gap-1.5">
        <h1 className="font-bold text-5xl text-center tabular-nums md:text-6xl">
          {getLocalizedDateString(currentDateTime, timeOptions)}
        </h1>
        <p className="font-normal text-xl text-center text-zinc-600">
          {getLocalizedDateString(currentDateTime, dateOptions)}
        </p>
      </div>
    </div>
  );
};

export default WeatherDateTime;
