import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';

const mono = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '0.72rem',
  letterSpacing: '0.04em',
};

// Eight pads: five fingertips plus three palm zones, laid out on a simplified
// top-down glove silhouette. Positions are in the diagram's own 0-320/0-400
// coordinate space.
const SENSORS = [
  { id: '01', label: 'Thumb tip', x: 58, y: 190 },
  { id: '02', label: 'Index tip', x: 116, y: 90 },
  { id: '03', label: 'Middle tip', x: 160, y: 70 },
  { id: '04', label: 'Ring tip', x: 204, y: 90 },
  { id: '05', label: 'Pinky tip', x: 242, y: 120 },
  { id: '06', label: 'Palm, thumb side', x: 120, y: 320 },
  { id: '07', label: 'Palm, centre', x: 160, y: 290 },
  { id: '08', label: 'Palm, pinky side', x: 200, y: 320 },
];

export default function GloveDiagram() {
  const [hovered, setHovered] = useState(null);
  const nodeRefs = useRef({});
  const rafRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const render = (t) => {
      // A shared slow envelope stands in for a grasp-and-release cycle; each
      // pad rides it with its own phase and noise so they don't move in lockstep.
      const envelope = reduceMotion ? 0.6 : (Math.sin(t / 3600) + 1) / 2;
      SENSORS.forEach((sensor, i) => {
        const node = nodeRefs.current[sensor.id];
        if (!node) return;
        const wobble = reduceMotion ? 0 : Math.sin(t / 900 + i * 0.9) * 0.5;
        const force = Math.max(0.2, 0.6 + envelope * 4.4 + wobble);
        const isHovered = hovered === sensor.id;
        const radius = 3.4 + force * 1.15 + (isHovered ? 2 : 0);
        const alpha = 0.35 + Math.min(force / 6, 1) * 0.5 + (isHovered ? 0.15 : 0);

        node.circle.setAttribute('r', radius.toFixed(2));
        node.circle.setAttribute('fill-opacity', Math.min(alpha, 0.95).toFixed(2));
        node.ring.setAttribute('r', (radius + 5).toFixed(2));
        node.ring.setAttribute('stroke-opacity', (Math.min(force / 6, 1) * 0.35).toFixed(2));
        node.text.textContent = `${force.toFixed(1)} N`;
      });
      if (!reduceMotion) rafRef.current = requestAnimationFrame(render);
    };

    render(0);
    if (!reduceMotion) rafRef.current = requestAnimationFrame(render);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [hovered]);

  return (
    <Box sx={{ my: { xs: 5, md: 6 } }}>
      <Box
        sx={{
          border: '1px solid #e4e4e1',
          borderRadius: '10px',
          backgroundColor: '#131211',
          p: { xs: 2, md: 3 },
          position: 'relative',
        }}
      >
        <Typography sx={{ ...mono, color: '#8f8f89', textTransform: 'uppercase', mb: 1.5 }}>
          Sensor layout, illustrative
        </Typography>

        <Box
          component="svg"
          viewBox="0 0 320 400"
          sx={{ width: '100%', maxWidth: 340, display: 'block', mx: 'auto' }}
        >
          <g fill="none" stroke="rgba(250,250,248,0.28)" strokeWidth="1.5">
            <rect x="90" y="230" width="140" height="140" rx="26" />
            <rect x="130" y="360" width="60" height="34" rx="8" />
            <rect x="100" y="90" width="32" height="150" rx="16" />
            <rect x="144" y="70" width="32" height="170" rx="16" />
            <rect x="188" y="90" width="32" height="150" rx="16" />
            <rect x="228" y="120" width="28" height="120" rx="14" />
            <g transform="rotate(-35 110 235)">
              <rect x="70" y="160" width="40" height="90" rx="18" />
            </g>
          </g>

          {SENSORS.map((sensor) => (
            <g
              key={sensor.id}
              onMouseEnter={() => setHovered(sensor.id)}
              onMouseLeave={() => setHovered((v) => (v === sensor.id ? null : v))}
              style={{ cursor: 'pointer' }}
            >
              {/* Generous invisible hit target, the visible marker stays small. */}
              <circle cx={sensor.x} cy={sensor.y} r="16" fill="transparent" />
              <circle
                ref={(el) => {
                  if (!nodeRefs.current[sensor.id]) nodeRefs.current[sensor.id] = {};
                  nodeRefs.current[sensor.id].ring = el;
                }}
                cx={sensor.x}
                cy={sensor.y}
                r="9"
                fill="none"
                stroke="#fafaf8"
                strokeWidth="1"
              />
              <circle
                ref={(el) => {
                  if (!nodeRefs.current[sensor.id]) nodeRefs.current[sensor.id] = {};
                  nodeRefs.current[sensor.id].circle = el;
                }}
                cx={sensor.x}
                cy={sensor.y}
                r="4"
                fill="#fafaf8"
              />
              <text
                ref={(el) => {
                  if (!nodeRefs.current[sensor.id]) nodeRefs.current[sensor.id] = {};
                  nodeRefs.current[sensor.id].text = el;
                }}
                x={sensor.x + (sensor.x > 200 ? 12 : sensor.x < 100 ? -12 : 0)}
                y={sensor.y - 12}
                textAnchor={sensor.x > 200 ? 'start' : sensor.x < 100 ? 'end' : 'middle'}
                fontFamily="'IBM Plex Mono', monospace"
                fontSize="9"
                fill="#9c9c96"
              />
              {hovered === sensor.id && (
                <text
                  x={sensor.x}
                  y={sensor.y + 22}
                  textAnchor="middle"
                  fontFamily="'IBM Plex Mono', monospace"
                  fontSize="9"
                  fill="#fafaf8"
                >
                  {sensor.id} · {sensor.label}
                </text>
              )}
            </g>
          ))}
        </Box>
      </Box>

      <Typography sx={{ ...mono, color: '#8f8f89', mt: 1.5, textAlign: 'center' }}>
        Eight-pad layout across fingertips and palm. Hover a pad for its position; values above are illustrative.
      </Typography>
    </Box>
  );
}
