import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

// Rest-pose bone vectors for one open hand, wrist-relative, in the same
// 21-keypoint topology the pipeline itself tracks (wrist + 4 joints per
// finger). Each finger is [bone-to-MCP, bone-to-PIP, bone-to-DIP, bone-to-TIP].
const FINGERS = [
  { name: 'thumb', bones: [[-30, -10], [-25, -25], [-20, -20], [-17, -17]], phase: 0.2 },
  { name: 'index', bones: [[-25, -80], [-5, -40], [-3, -30], [-2, -25]], phase: 1.1 },
  { name: 'middle', bones: [[0, -85], [0, -45], [0, -33], [0, -27]], phase: 2.0 },
  { name: 'ring', bones: [[25, -80], [5, -42], [3, -30], [2, -25]], phase: 2.9 },
  { name: 'pinky', bones: [[48, -70], [7, -35], [3, -23], [2, -20]], phase: 3.8 },
];

const rotate = (x, y, angle) => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x * cos - y * sin, x * sin + y * cos];
};

// Walks one finger's bone chain from the wrist, applying a small cumulative
// curl so the fingertip bends more than the knuckle, the way a real finger does.
const computeFinger = (bones, curl) => {
  const points = [[0, 0]];
  let [cx, cy] = [0, 0];
  let cumAngle = 0;
  const weights = [0, 0.4, 0.75, 1];
  for (let i = 0; i < bones.length; i += 1) {
    if (i > 0) cumAngle = curl * weights[i];
    const [bx, by] = bones[i];
    const [rx, ry] = rotate(bx, by, cumAngle);
    cx += rx;
    cy += ry;
    points.push([cx, cy]);
  }
  return points;
};

/**
 * A quiet, monochrome hand skeleton for the hero, standing in for the actual
 * subject of the site (tracked hands, retargeted to a gripper) instead of a
 * stock photo. It idles on its own and eases toward the cursor when present.
 */
export default function HandField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let anchor = { x: 0, y: 0 };
    let pointer = { x: 0, y: 0, active: false };
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
      anchor = { x: width * 0.5, y: height * 0.66 };
      if (reduceMotion) draw(0);
    };

    const idleTarget = (t) => ({
      x: width * 0.5 + Math.sin(t / 9000) * width * 0.16,
      y: height * 0.64 + Math.cos(t / 7000) * height * 0.07,
    });

    const draw = (t) => {
      ctx.clearRect(0, 0, width, height);

      const target = pointer.active ? pointer : idleTarget(t);
      anchor.x += (target.x - anchor.x) * (reduceMotion ? 1 : 0.045);
      anchor.y += (target.y - anchor.y) * (reduceMotion ? 1 : 0.045);

      const scale = Math.min(Math.max(height * 0.0032, 0.85), 1.5);

      // Absolute MCP joint positions (finger index 1..4, joint index 1) drive
      // the palm outline connecting the knuckles.
      const mcps = [];

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      FINGERS.forEach((finger) => {
        const curl = reduceMotion ? 0 : Math.sin(t / 2600 + finger.phase) * 0.16;
        const local = computeFinger(finger.bones, curl);
        const world = local.map(([x, y]) => [anchor.x + x * scale, anchor.y + y * scale]);
        mcps.push(world[1]);

        for (let i = 0; i < world.length - 1; i += 1) {
          const [x1, y1] = world[i];
          const [x2, y2] = world[i + 1];
          const dist = pointer.active ? Math.hypot((x1 + x2) / 2 - pointer.x, (y1 + y2) / 2 - pointer.y) : 999;
          const glow = pointer.active ? Math.max(0, 1 - dist / 160) : 0;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = `rgba(250, 250, 248, ${0.16 + glow * 0.45})`;
          ctx.lineWidth = 1.3;
          ctx.stroke();
        }

        world.forEach(([x, y], i) => {
          const dist = pointer.active ? Math.hypot(x - pointer.x, y - pointer.y) : 999;
          const glow = pointer.active ? Math.max(0, 1 - dist / 160) : 0;
          ctx.beginPath();
          ctx.arc(x, y, i === world.length - 1 ? 2.1 : 1.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(250, 250, 248, ${0.22 + glow * 0.55})`;
          ctx.fill();
        });
      });

      // Palm: wrist to each MCP is already drawn as finger bone 1; add the
      // knuckle-to-knuckle lines so the palm reads as a connected surface.
      for (let i = 0; i < mcps.length - 1; i += 1) {
        const [x1, y1] = mcps[i];
        const [x2, y2] = mcps[i + 1];
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'rgba(250, 250, 248, 0.14)';
        ctx.lineWidth = 1.3;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(anchor.x, anchor.y, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(250, 250, 248, 0.3)';
      ctx.fill();
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
