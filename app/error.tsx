'use client'

type Props = {
  error: Error & { digest?: string }
  reset: () => void
};

const Error = ({ error, reset } : Props) => {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
};

export default Error;
