import { Suspense } from "react";
import Loading from "./loading";
import WeatherDateTimeDisplay from "@/components/WeatherDateTimeDisplay";
import Search from "@/components/Search";

const THE_HAGUE_COORDS = {
  lat: 52.0799838,
  lon: 4.3113461
};

type Props = {
  searchParams?: {
    query?: string;
    lat?: string;
    lon?: string;
  };
};

export default async function Home({ searchParams }: Props) { 
  const geolocation = {
    lat: +(searchParams?.lat ?? THE_HAGUE_COORDS.lat),
    lon: +(searchParams?.lon ?? THE_HAGUE_COORDS.lon)
  };

  return (
    <section>
      <Search placeholder="Search for your preferred city..." />
      <Suspense fallback={<Loading />}>
        <WeatherDateTimeDisplay
          geolocation={geolocation}
        />
      </Suspense> 
    </section>
  );
}
