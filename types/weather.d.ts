type Coord = {
  lat: number;
  lon: number;
};

type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type Main = {
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
  sea_level?: number;
  grnd_level?: number;
};

type Wind = {
  speed: number;
  deg: number;
  gust?: number;
};

type Clouds = {
  all: number;
};

type Rain = {
  '1h'?: number;
  '3h'?: number;
};

type Snow = {
  '1h'?: number;
  '3h'?: number;
};

type Sys = {
  type?: number;
  id?: number;
  message?: number;
  country: string;
  sunrise: number
  sunset: number;
};

type WeatherData = {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility?: number;
  wind: Wind;
  clouds: Clouds;
  rain?: Rain;
  snow?: Snow;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}