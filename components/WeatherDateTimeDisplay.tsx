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
    <div className='flex flex-col justify-center gap-10 w-full animate-initial md:gap-14 lg:flex-row'>
      <div className='flex' tabIndex={0}>
        <WeatherCardBackdrop>
          <WeatherDateTime weatherData={weatherData} timeZone={timeZone} />
        </WeatherCardBackdrop>
      </div>
      <div className='flex grow' tabIndex={0}>
        <WeatherCardBackdrop>
          <CurrentWeatherDetails weatherData={weatherData} />
        </WeatherCardBackdrop>
      </div>
    </div>
  )
};

export default WeatherDateTimeDisplay;
