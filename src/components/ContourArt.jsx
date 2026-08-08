import React from 'react';
import { Box } from '@mui/material';

// Six pressure origins (thumb, four fingertips, palm) each radiate a dozen
// wobbling contour rings; overlapping across origins builds a dense,
// moiré-like field. Purely decorative, no labels, no claimed data, computed
// once at module scope since the geometry is fixed.
const ORIGINS = [
  { x: 58, y: 190 },
  { x: 116, y: 90 },
  { x: 160, y: 70 },
  { x: 204, y: 90 },
  { x: 242, y: 120 },
  { x: 160, y: 290 },
];

const RING_COUNT = 12;
const SAMPLES = 48;

const buildRingPath = (origin, oi, ri) => {
  const baseR = 10 + ri * 9;
  const lobes = 3 + (oi % 4);
  const phase = oi * 0.7 + ri * 0.35;
  const amplitude = 3 + (ri % 3) * 1.5;
  let d = '';
  for (let s = 0; s <= SAMPLES; s += 1) {
    const angle = (s / SAMPLES) * Math.PI * 2;
    const r = baseR + amplitude * Math.sin(lobes * angle + phase);
    const x = origin.x + r * Math.cos(angle);
    const y = origin.y + r * Math.sin(angle);
    d += `${s === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)} `;
  }
  return `${d}Z`;
};

const RINGS = ORIGINS.flatMap((origin, oi) =>
  Array.from({ length: RING_COUNT }, (_, ri) => ({
    key: `${oi}-${ri}`,
    d: buildRingPath(origin, oi, ri),
    opacity: Math.max(0.05, 0.24 - ri * 0.014),
  }))
);

export default function ContourArt() {
  return (
    <Box
      sx={{
        border: '1px solid #e4e4e1',
        borderRadius: '10px',
        backgroundColor: '#131211',
        overflow: 'hidden',
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 320 400"
        sx={{
          width: '100%',
          maxHeight: 480,
          display: 'block',
          mx: 'auto',
          '@keyframes contour-breathe': {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.015)' },
          },
          '@media (prefers-reduced-motion: no-preference)': {
            '& g': { animation: 'contour-breathe 14s ease-in-out infinite', transformOrigin: '160px 190px' },
          },
        }}
      >
        <g fill="none" stroke="#fafaf8" strokeWidth="0.6">
          {RINGS.map((ring) => (
            <path key={ring.key} d={ring.d} opacity={ring.opacity} />
          ))}
        </g>
      </Box>
    </Box>
  );
}
