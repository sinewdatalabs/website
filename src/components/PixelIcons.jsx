import React from 'react';
import { Box } from '@mui/material';

// A small standing figure built the same way as public/favicon.svg: a
// handful of blocks on a 4px module, crisp edges, monochrome. No likeness,
// just a pixel character, so the team section stays consistent with the
// brand mark instead of borrowing a stock-avatar style from somewhere else.
const CHARACTER_BLOCKS = [
  [12, 0, 16, 12], // head
  [16, 12, 8, 4], // neck
  [8, 16, 24, 20], // torso
  [4, 16, 4, 16], // left arm
  [32, 16, 4, 16], // right arm
  [8, 36, 8, 20], // left leg
  [24, 36, 8, 20], // right leg
];

export function PixelCharacter({ sx }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 40 56"
      shapeRendering="crispEdges"
      sx={{ width: 24, height: 34, display: 'block', ...sx }}
    >
      <g fill="currentColor">
        {CHARACTER_BLOCKS.map(([x, y, w, h], i) => (
          // Blocks are a fixed constant, never reordered, so the index is a
          // stable key.
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
