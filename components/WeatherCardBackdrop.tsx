type Props = {
  children: React.ReactNode;
}

const WeatherCardBackdrop = ({ children }: Props) => {
  return (
    <div className='w-full bg-zinc-300 rounded-3xl shadow-3xl'>
      {children}
    </div>
  )
};

export default WeatherCardBackdrop;
