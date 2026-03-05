'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { getLocation } from '@/lib/api';
import LoadingSpinner from './ui/LoadingSpinner';
import SearchIcon from './icons/SearchIcon';

const CITY_PATTERN = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;

const Search = ({ placeholder }: { placeholder: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [locations, setLocations] = useState<CustomGeolocation[]>([]);
  const [validationError, setValidationError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const searchRef = useRef<HTMLDivElement | null>(null);
  const query = searchParams.get('query') || '';

  const resetInputQuery = useCallback(() => {
    setInputQuery('');
  }, []);

  const handleSearch = useDebouncedCallback((searchQuery: string) => {
    const params = new URLSearchParams(searchParams);
    const normalizedQuery = searchQuery.trim();
    const isQueryValid = CITY_PATTERN.test(normalizedQuery);

    setValidationError(!isQueryValid && !!normalizedQuery);

    if (isQueryValid && normalizedQuery) {
      params.set('query', normalizedQuery);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 400);

  const handleOptionClick = (lat: number, lon: number) => {
    const params = new URLSearchParams(searchParams);

    params.delete('query');
    params.set('lat', lat.toString());
    params.set('lon', lon.toString());

    replace(`${pathname}?${params.toString()}`);
    resetInputQuery();
  };

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        resetInputQuery();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [resetInputQuery]);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getLocation(query);
        setLocations(response);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query]);

  useEffect(() => {
    handleSearch(inputQuery);
  }, [inputQuery, handleSearch]);

  return (
    <div
      ref={searchRef}
      onKeyUp={e => e.key === 'Escape' && resetInputQuery()}
      className="relative flex flex-col gap-2 w-full mb-10 animate-initial lg:w-[50%] lg:ml-36"
    >
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10 pointer-events-none md:left-6" />
      <input
        id="search"
        className="w-full py-3 pl-12 pr-4 rounded-full text-sm placeholder:text-gray-400 bg-white/80 backdrop-blur-sm shadow-lg border border-white/60 outline-none focus:ring-2 focus:ring-white/50 transition-all md:pl-14 md:py-4 md:text-base"
        placeholder={placeholder}
        onChange={e => setInputQuery(e.target.value)}
        value={inputQuery}
        aria-describedby={validationError ? 'search-input-error' : undefined}
        autoComplete="off"
      />
      {query && inputQuery && (
        <ul
          className="absolute top-14 z-50 w-full p-1.5 rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl border border-white/60 animate-initial md:top-[60px]"
          aria-label={`Found ${locations.length} search results. Use tab to navigate and choose a location.`}
          role="listbox"
          tabIndex={0}
        >
          {isLoading ? (
            <LoadingSpinner />
          ) : locations.length > 0 ? (
            locations.map(({ name, state, country, lat, lon }, index) => (
              <li
                key={`${name}-${state}-${country}-${lat}-${lon}-${index}`}
                className="py-2.5 px-4 rounded-xl text-sm cursor-pointer transition-colors hover:bg-zinc-100 focus:bg-zinc-100 outline-none md:text-base"
                onClick={() => handleOptionClick(lat, lon)}
                onKeyUp={e => e.key === 'Enter' && handleOptionClick(lat, lon)}
                tabIndex={0}
              >
                {name}{state ? `, ${state}` : ''}, {country}
              </li>
            ))
          ) : (
            <li className="py-2.5 px-4 text-sm text-gray-500">No results found</li>
          )}
        </ul>
      )}
      {validationError && (
        <span
          id="search-input-error"
          className="italic text-sm text-red-500 pl-2 md:text-base"
          role="alert"
        >
          Enter a valid city name
        </span>
      )}
    </div>
  );
};

export default Search;
