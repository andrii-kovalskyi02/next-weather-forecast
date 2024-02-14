type LocalNames = {
  [languageCode: string]: string;
};

type CustomGeolocation = {
  name: string;
  local_names: LocalNames;
  lat: number;
  lon: number;
  country: string;
  state?: string;
};
