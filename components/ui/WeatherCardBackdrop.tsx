type Props = {
  children: React.ReactNode;
};

const WeatherCardBackdrop = ({ children }: Props) => {
  return (
    <div className="w-full bg-white/30 backdrop-blur-md border border-white/50 rounded-3xl shadow-card">
      {children}
    </div>
  );
};

export default WeatherCardBackdrop;
