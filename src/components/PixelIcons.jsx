import React from 'react';
import { Box } from '@mui/material';

// Same construction as public/favicon.svg: a handful of blocks on a 4px
// module, crisp edges, monochrome. Initials instead of photos, so the team
// section stays consistent with the brand mark instead of borrowing a
// stock-avatar style from somewhere else.
const GLYPHS = {
  A: [
    [16, 0, 4, 4],
    [12, 4, 4, 4],
    [20, 4, 4, 4],
    [8, 8, 4, 8],
    [24, 8, 4, 8],
    [8, 16, 20, 4],
    [8, 20, 4, 12],
    [24, 20, 4, 12],
  ],
  U: [
    [8, 4, 4, 24],
    [24, 4, 4, 24],
    [8, 28, 20, 4],
  ],
};

export function PixelMonogram({ letter, sx }) {
  const blocks = GLYPHS[letter] || [];
  return (
    <Box
      component="svg"
      viewBox="0 0 36 36"
      shapeRendering="crispEdges"
      sx={{ width: 28, height: 28, display: 'block', ...sx }}
    >
      <g fill="currentColor">
        {blocks.map(([x, y, w, h], i) => (
          // Blocks are a fixed constant per letter, never reordered, so the
          // index is a stable key.
          <rect key={i} x={x} y={y} width={w} height={h} />
        ))}
      </g>
    </Box>
  );
}

export function PixelMailIcon({ sx }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 36 36"
      shapeRendering="crispEdges"
      aria-hidden="true"
      sx={{ width: 14, height: 14, display: 'block', flexShrink: 0, ...sx }}
    >
      <g fill="currentColor">
        <rect x="4" y="8" width="28" height="4" />
        <rect x="4" y="24" width="28" height="4" />
        <rect x="4" y="8" width="4" height="20" />
        <rect x="28" y="8" width="4" height="20" />
        <rect x="8" y="12" width="4" height="4" />
        <rect x="12" y="16" width="4" height="4" />
        <rect x="16" y="20" width="4" height="4" />
        <rect x="20" y="16" width="4" height="4" />
        <rect x="24" y="12" width="4" height="4" />
      </g>
    </Box>
  );
}
