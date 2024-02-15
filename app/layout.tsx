import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AppContextProvider } from "./provider";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "Weather Forecast",
  description: "A weather forecast application built on Next.js. Get accurate weather predictions and forecasts for your location with this intuitive and user-friendly web app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-zinc-800 bg-gradient-to-br from-white to-slate-600`}>
        <AppContextProvider>
          <main className="min-w-[375px] min-h-screen max-w-screen-xl m-auto p-10">
            {children}
          </main>
        </AppContextProvider>
      </body>
    </html>
  );
}
