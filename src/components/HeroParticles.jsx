import React, { useMemo } from 'react';
import { Particles, ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { Box } from '@mui/material';

// Must be a stable reference across renders, ParticlesProvider throws if the
// init callback changes identity.
const initEngine = async (engine) => {
  await loadSlim(engine);
};

/**
 * A connected particle network for the hero, via tsParticles (the actively
 * maintained successor to particles.js). The design comes from the library
 * itself rather than anything hand-drawn here, configured to the site's
 * existing monochrome palette. Reacts to hover (particles link and pull
 * toward the cursor) and click (adds a burst of particles).
 */
export default function HeroParticles() {
  const options = useMemo(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return {
      fullScreen: { enable: false },
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: 90, density: { enable: true, width: 1200, height: 800 } },
        color: { value: '#fafaf8' },
        opacity: { value: { min: 0.15, max: 0.5 } },
        size: { value: { min: 1, max: 2.4 } },
        links: {
          enable: true,
          distance: 140,
          color: '#fafaf8',
          opacity: 0.18,
          width: 1,
        },
        move: {
          enable: !reduceMotion,
          speed: 0.6,
          direction: 'none',
          random: true,
          outModes: { default: 'out' },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'grab' },
          onClick: { enable: true, mode: 'push' },
          resize: { enable: true },
        },
        modes: {
          grab: { distance: 180, links: { opacity: 0.5 } },
          push: { quantity: 3 },
        },
      },
    };
  }, []);

  return (
    <Box sx={{ position: 'absolute', inset: 0 }}>
      <ParticlesProvider init={initEngine}>
        <Particles id="hero-particles" options={options} style={{ width: '100%', height: '100%' }} />
      </ParticlesProvider>
    </Box>
  );
}
