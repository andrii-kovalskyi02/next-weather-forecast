import { Suspense } from "react";
import Loading from "./loading";
import WeatherDateTimeDisplay from "@/components/WeatherDateTimeDisplay";
import Search from "@/components/Search";

type Props = {
  searchParams?: {
    query?: string;
    lat?: string;
    lon?: string;
  };
};

export default async function Home({ searchParams }: Props) {
  const geolocation = {
    lat: +(searchParams?.lat ?? 52.0799838),
    lon: +(searchParams?.lon ?? 4.3113461)
  };

  return (
    <section>
      <Search placeholder="Search for your preffered city..." />
      <Suspense fallback={<Loading />}>
        <WeatherDateTimeDisplay
          geolocation={geolocation}
        />
      </Suspense> 
    </section>
  );
}
