type IconProps = {
  className?: string;
};

const PressureIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Gauge arc */}
    <path d="M5 17a7 7 0 0 1 14 0" />
    {/* Needle */}
    <line x1="12" y1="17" x2="15.5" y2="11" />
    {/* Center dot */}
    <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
    {/* Tick marks */}
    <line x1="5" y1="17" x2="3.5" y2="17" />
    <line x1="19" y1="17" x2="20.5" y2="17" />
    <line x1="12" y1="10" x2="12" y2="8.5" />
  </svg>
);

export default PressureIcon;
