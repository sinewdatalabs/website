import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

/**
 * A quiet, monochrome point field for the hero. Each point drifts on its own
 * slow cycle and brightens as the cursor nears it, the same "something is
 * sensing distance" idea as the depth and contact data described below it.
 * Canvas-only, no dependencies, and it goes still under prefers-reduced-motion.
 */
export default function SensorField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const spacing = 46;
    const pointerRadius = 150;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let points = [];
    let pointer = { x: -9999, y: -9999, active: false };
    let rafId;

    const buildPoints = () => {
      points = [];
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          points.push({
            x: c * spacing,
            y: r * spacing,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildPoints();
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < points.length; i += 1) {
        const p = points[i];
        const ambient = reduceMotion ? 0.5 : (Math.sin(t / 1800 + p.phase) + 1) / 2;
        let alpha = 0.05 + ambient * 0.08;
        let radius = 1;

        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < pointerRadius) {
            const proximity = 1 - dist / pointerRadius;
            alpha += proximity * 0.55;
            radius += proximity * 1.8;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(250, 250, 248, ${Math.min(alpha, 0.75)})`;
        ctx.fill();
      }
    };

    const loop = (t) => {
      draw(t);
      if (!reduceMotion || pointer.active) rafId = requestAnimationFrame(loop);
    };

    const handlePointerMove = (e) => {
      const rect = canvas.parentElement.getBoundingClientRect();
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
      if (reduceMotion) draw(0);
    };
    const handlePointerLeave = () => {
      pointer = { x: -9999, y: -9999, active: false };
      if (reduceMotion) draw(0);
    };

    resize();
    draw(0);
    if (!reduceMotion) rafId = requestAnimationFrame(loop);

    window.addEventListener('resize', resize);
    canvas.parentElement.addEventListener('pointermove', handlePointerMove);
    canvas.parentElement.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      canvas.parentElement.removeEventListener('pointermove', handlePointerMove);
      canvas.parentElement.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <Box
      component="canvas"
      ref={canvasRef}
      aria-hidden="true"
      sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
    />
  );
}
