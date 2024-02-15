const ErrorNotification = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="flex flex-col items-center gap-6 animate-initial" role="alert" tabIndex={0}>
      <h2 className="w-fit p-4 rounded-lg italic text-sm text-center bg-rose-500 text-white shadow-2xl md:text-base">
        Something went wrong while fetching data!
      </h2>
      {children}
    </section>
  )
};

export default ErrorNotification;
