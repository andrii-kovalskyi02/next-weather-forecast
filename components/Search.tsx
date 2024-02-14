'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { getLocation } from '@/app/handler';
import LoadingSpinner from './LoadingSpinner';
 
const Search = ({ placeholder }: { placeholder: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [validationError, setValidationError] = useState(false);
  const [locations, setLocations] = useState<CustomGeolocation[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const query = searchParams.get('query') || '';
  
  const handleSearch = useDebouncedCallback((searchQuery: string) => {
    const params = new URLSearchParams(searchParams);
    const normalizedQuery = searchQuery.trim();
    const cityPattern = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    const isQueryValid = cityPattern.test(normalizedQuery);

    if (!isQueryValid && normalizedQuery) {
      setValidationError(true);
    } else {
      setValidationError(false);
    }

    if (isQueryValid && normalizedQuery) {
      params.set('query', normalizedQuery);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleOptionClick = (lat: number, lon: number) => {
    const params = new URLSearchParams(searchParams);

    params.delete('query');
    params.set('lat', lat.toString());
    params.set('lon', lon.toString());

    replace(`${pathname}?${params.toString()}`)

    setInputQuery('');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getLocation(query);

        setLocations(response);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  useEffect(() => {
    handleSearch(inputQuery);
  }, [inputQuery, handleSearch]);
 
  return (
    <div className="relative flex flex-col gap-2 w-full mb-7 lg:w-[50%] lg:ml-36">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <Image
        src="/assets/icons/search.png"
        alt="Icon for search"
        width={20}
        height={23}
        className='absolute left-5 py-3 z-10 md:left-7 md:py-4'
      />
      <input
        id="search"
        className="outline-1 w-full py-3 pl-14 rounded-full text-sm placeholder:text-gray-500 shadow-2xl md:pl-16 md:text-lg"
        placeholder={placeholder}
        onChange={e => setInputQuery(e.target.value)}
        value={inputQuery}
      />
      {query && (
        <ul
          className="absolute top-12 w-full p-2 rounded-lg bg-white shadow-2xl md:top-[60px]"
          tabIndex={0}
        >
          {isLoading
            ? <LoadingSpinner />
            : locations.map(({ name, state, country, lat, lon }) => (
              <li
                key={Math.random()}
                className="py-2 px-3 rounded-lg cursor-pointer transition-all hover:bg-zinc-300"
                onClick={() => handleOptionClick(lat, lon)}
                tabIndex={0}
              >
                {`${name}, ${state ? `${state},` : ''} ${country}`}
              </li>
            ))
          }
          {locations.length === 0 && !isLoading && <h1>Not Found</h1>}
        </ul>
      )}
      {validationError && (
        <span className="italic text-sm text-red-500 md:text-base" role="alert">
          Enter a valid city name
        </span>
      )}
    </div>
  );
};

export default Search;
