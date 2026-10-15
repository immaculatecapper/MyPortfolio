import { siteConfig } from '../config/siteConfig.js';

// SVG path data for each supported logo outline (100x100 viewBox)
const logoOutlines = {
  hexagon: 'M50 4 L90 27 L90 73 L50 96 L10 73 L10 27 Z',
  square: 'M22 6 H78 A16 16 0 0 1 94 22 V78 A16 16 0 0 1 78 94 H22 A16 16 0 0 1 6 78 V22 A16 16 0 0 1 22 6 Z',
  circle: 'M50 5 A45 45 0 1 1 49.99 5 Z',
  triangle: 'M50 6 L95 90 H5 Z',
};

/**
 * Custom site logo: a colour-filled shape with the owner's initials inside.
 * Colours come from CSS variables so the logo follows the active theme.
 */
export default function Logo({ size = 44, shape = siteConfig.logoShape }) {
  const outlinePath = logoOutlines[shape] ?? logoOutlines.hexagon;
  // Triangles need the text nudged down so it sits in the visual centre
  const textBaselineY = shape === 'triangle' ? 72 : 61;
  const fontSize = shape === 'triangle' ? 26 : 32;

  return (
    <svg
      className="logo"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={`${siteConfig.initials} logo`}
    >
      <path d={outlinePath} fill="var(--accent)" />
      <path d={outlinePath} fill="none" stroke="var(--accent-strong)" strokeWidth="4" />
      <text
        x="50"
        y={textBaselineY}
        textAnchor="middle"
        fontFamily="var(--font-heading)"
        fontWeight="800"
        fontSize={fontSize}
        fill="var(--on-accent)"
      >
        {siteConfig.initials}
      </text>
    </svg>
  );
}
