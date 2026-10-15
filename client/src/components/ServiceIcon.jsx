// Inline SVG icons for the Services page. Using stroke="currentColor"
// lets each icon pick up the theme's accent colour from CSS.
const iconPaths = {
  ai: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" />
    </>
  ),
  qa: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  code: (
    <>
      <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />
    </>
  ),
  api: (
    <>
      <path d="M9 7H6a3 3 0 0 0 0 6h3M15 11h3a3 3 0 0 1 0 6h-3M8 12h8" />
    </>
  ),
};

export default function ServiceIcon({ name }) {
  return (
    <svg
      className="service-icon"
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
}
