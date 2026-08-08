import React from 'react';
import { Box } from '@mui/material';

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
