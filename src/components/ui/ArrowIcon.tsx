const ArrowIcon = ({ className = 'btn__icon' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
    <path
      d="M4 10h11.5M11 5.5 15.5 10 11 14.5"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowIcon;
