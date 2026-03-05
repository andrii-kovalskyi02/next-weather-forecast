'use client';

import ErrorNotification from "@/components/ui/ErrorNotification";

type Props = {
  error: Error;
  reset: () => void;
};

const Error = ({ reset }: Props) => {
  return (
    <ErrorNotification>
      <button
        className="px-5 py-2 rounded-full text-sm font-medium bg-white/80 backdrop-blur-sm text-zinc-800 shadow-md border border-white/60 transition-all hover:bg-white hover:shadow-lg"
        onClick={() => reset()}
      >
        Try again
      </button>
    </ErrorNotification>
  );
};

export default Error;
