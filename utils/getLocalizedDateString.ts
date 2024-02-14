import { DateTimeFormatOptions } from "intl";

const getLocalizedDateString = (
  timestamp?: number,
  options?: DateTimeFormatOptions
  ): string => {
  const date = timestamp
    ? new Date(timestamp * 1000)
    : new Date();
  
  return date.toLocaleString(undefined, options)
};

export default getLocalizedDateString;
