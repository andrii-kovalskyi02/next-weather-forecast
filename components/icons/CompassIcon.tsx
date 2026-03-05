type IconProps = {
  className?: string;
  style?: React.CSSProperties;
};

const CompassIcon = ({ className, style }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    aria-hidden="true"
  >
    <polygon points="12 2 15 9 12 7 9 9 12 2" fill="currentColor" />
    <polygon points="12 22 9 15 12 17 15 15 12 22" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export default CompassIcon;
