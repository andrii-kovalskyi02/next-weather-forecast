"use client";

import { DateTimeFormatOptions } from "intl";
import { createContext, useContext } from "react";

type Context = {
  timeFormatOptions: DateTimeFormatOptions
};

const AppContext = createContext<Context>({
  timeFormatOptions: {}
});

export function AppContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const timeFormatOptions: DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
  };

  return (
    <AppContext.Provider value={{
      timeFormatOptions
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext);
}
