type IconProps = {
  className?: string;
};

const SunriseIcon = ({ className }: IconProps) => (
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
    <path d="M17 18a5 5 0 0 0-10 0" />
    <line x1="12" y1="2" x2="12" y2="9" />
    <polyline points="8 6 12 2 16 6" />
    <line x1="20" y1="18" x2="22" y2="18" />
    <line x1="2" y1="18" x2="4" y2="18" />
    <line x1="4.93" y1="10.93" x2="6.34" y2="12.34" />
    <line x1="17.66" y1="12.34" x2="19.07" y2="10.93" />
  </svg>
);

export default SunriseIcon;
