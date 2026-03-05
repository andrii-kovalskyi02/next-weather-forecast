type Props = {
  children: React.ReactNode;
};

const ErrorNotification = ({ children }: Props) => {
  return (
    <section
      className="flex flex-col items-center gap-5 animate-initial"
      role="alert"
      tabIndex={0}
    >
      <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-rose-500/90 backdrop-blur-sm text-white shadow-lg border border-rose-400/50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 flex-shrink-0"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p className="text-sm font-medium md:text-base">
          Something went wrong while fetching data.
        </p>
      </div>
      {children}
    </section>
  );
};

export default ErrorNotification;
