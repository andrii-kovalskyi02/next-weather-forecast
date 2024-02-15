import { DateTimeFormatOptions } from "intl";

export const getLocalizedDateString = (
  timestamp: number,
  options?: DateTimeFormatOptions
  ): string => {
  const date =  new Date(timestamp);
  
  return date.toLocaleString(undefined, options)
};
