'use client'

import ErrorNotification from "@/components/ErrorNotification";

type Props = {
  error: Error
  reset: () => void
};

const Error = ({ error, reset } : Props) => {
  return (
    <ErrorNotification>
      <button
        className="transition-all hover:font-medium"
        onClick={() => reset()}
      >
        Try again
      </button>
    </ErrorNotification>
  )
};

export default Error;
