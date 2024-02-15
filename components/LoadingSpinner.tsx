const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-8 h-8 m-4 mx-auto border-4 border-zinc-200 border-l-zinc-800 rounded-full animate-spin" />
    </div>
  )
};

export default LoadingSpinner;
