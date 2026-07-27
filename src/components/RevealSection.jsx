import React from 'react';
import { Box } from '@mui/material';
import useScrollReveal from '../hooks/useScrollReveal';

/**
 * Reusable wrapper component that animates its children on scroll.
 * Uses the `useScrollReveal` custom hook internally.
 * 
 * Props:
 * - children: React nodes to render.
 * - selector: CSS selector targeting children to animate (e.g. '.reveal-item').
 *             If not specified (or set to ""), the entire wrapper container animates as a single block.
 * - Component: The component/HTML tag to render as the wrapper container. Default: Box.
 * - y: Starting vertical offset (slide up). Default: 50.
 * - x: Starting horizontal offset (slide in). Default: 0.
 * - opacity: Starting opacity. Default: 0.
 * - duration: Animation duration in seconds. Default: 1.0.
 * - stagger: Stagger delay in seconds between elements. Default: 0.15.
 * - ease: Animation easing function. Default: 'power3.out'.
 * - start: ScrollTrigger start scroll point. Default: 'top 80%'.
 * - end: ScrollTrigger end scroll point. Default: 'bottom 20%'.
 * - toggleActions: ScrollTrigger actions on scroll events. Default: 'play none none reverse'.
 * - once: Whether to trigger the animation only once. Default: false.
 * - delay: Extra delay before starting the animation in seconds. Default: 0.
 * - sx: Styling props for MUI Box or custom components.
 * - ...restProps: Any other props to pass down to the container.
 */
export default function RevealSection({
  children,
  selector = '.reveal-item',
  Component = Box,
  y = 50,
  x = 0,
  opacity = 0,
  duration = 1.0,
  stagger = 0.15,
  ease = 'power3.out',
  start = 'top 80%',
  end = 'bottom 20%',
  toggleActions = 'play none none reverse',
  once = false,
  delay = 0,
  sx,
  ...restProps
}) {
  const containerRef = useScrollReveal({
    selector,
    y,
    x,
    opacity,
    duration,
    stagger,
    ease,
    start,
    end,
    toggleActions,
    once,
    delay,
  });

  return (
    <Component ref={containerRef} sx={sx} {...restProps}>
      {children}
    </Component>
  );
}
