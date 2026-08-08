import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

/**
 * A quiet depth-map mesh for the hero: a grid warps gently like a terrain
 * scan, and brightens into sharper contour lines wherever the cursor
 * passes, the same idea as the depth channel described on the page, just
 * made to look at instead of read.
 */
export default function DepthField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const spacing = 34;
    const pointerRadius = 220;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cols = 0;
    let rows = 0;
    let pointer = { x: -9999, y: -9999, active: false };
    let rafId;

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
      cols = Math.ceil(width / spacing) + 1;
      rows = Math.ceil(height / spacing) + 1;
      if (reduceMotion) draw(0);
    };

    // Two low-frequency sine fields combined stand in for a smooth terrain,
    // cheap to evaluate per point and per frame.
    const depthAt = (x, y, t) =>
      0.5 +
      0.25 * Math.sin(x * 0.006 + t * 0.00012) * Math.sin(y * 0.008 + t * 0.00009) +
      0.25 * Math.sin((x + y) * 0.0035 - t * 0.00015);

    const draw = (t) => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;

      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          const x = c * spacing;
          const y = r * spacing;
          const depth = depthAt(x, y, reduceMotion ? 0 : t);

          let proximity = 0;
          if (pointer.active) {
            const dist = Math.hypot(x - pointer.x, y - pointer.y);
            if (dist < pointerRadius) proximity = 1 - dist / pointerRadius;
          }

          const alpha = 0.045 + depth * 0.05 + proximity * 0.5;

          if (c < cols - 1) {
            const nx = (c + 1) * spacing;
            const nDepth = depthAt(nx, y, reduceMotion ? 0 : t);
            ctx.strokeStyle = `rgba(250, 250, 248, ${Math.min((alpha + nDepth * 0.05) / 1.4, 0.85)})`;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(nx, y);
            ctx.stroke();
          }
          if (r < rows - 1) {
            const ny = (r + 1) * spacing;
            const nDepth = depthAt(x, ny, reduceMotion ? 0 : t);
            ctx.strokeStyle = `rgba(250, 250, 248, ${Math.min((alpha + nDepth * 0.05) / 1.4, 0.85)})`;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, ny);
            ctx.stroke();
          }
        }
      }
    };

    const loop = (t) => {
      draw(t);
      if (!reduceMotion) rafId = requestAnimationFrame(loop);
    };

    const handlePointerMove = (e) => {
      const rect = canvas.parentElement.getBoundingClientRect();
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
      if (reduceMotion) draw(0);
    };
    const handlePointerLeave = () => {
      pointer = { ...pointer, active: false };
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
