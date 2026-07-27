import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin to GSAP so that it is aware of scroll-driven animations
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom React hook to animate a section and/or its children on scroll.
 * Uses gsap.context() internally to handle cleanups and prevent duplication in React 18 Strict Mode.
 *
 * @param {Object} options - Configuration options for the reveal animation.
 * @param {string} [options.selector='.reveal-item'] - A CSS selector targeting children elements inside the section to stagger. Pass empty string or null to animate the section container itself instead.
 * @param {number} [options.y=50] - Starting vertical translation offset in pixels. The element will slide up from this value to 0.
 * @param {number} [options.x=0] - Starting horizontal translation offset in pixels. The element will slide in from this value to 0.
 * @param {number} [options.opacity=0] - Starting opacity value (typically 0 for a fade-in effect).
 * @param {number} [options.duration=1.0] - The length of the animation in seconds.
 * @param {number} [options.stagger=0.15] - Stagger time in seconds between child elements matching the selector.
 * @param {string} [options.ease='power3.out'] - Easing function used for smooth movement. 'power3.out' offers a sophisticated deceleration curve.
 * @param {string} [options.start='top 80%'] - Defines when ScrollTrigger should activate. e.g., 'top 80%' means when the top of the element hits 80% of the viewport height.
 * @param {string} [options.end='bottom 20%'] - Defines when ScrollTrigger should end. e.g., 'bottom 20%' means when the bottom of the element hits 20% of the viewport height.
 * @param {string} [options.toggleActions='play none none reverse'] - Actions on enter, leave, enterBack, and leaveBack.
 *                                                                  'play none none reverse' means:
 *                                                                  1. On scrolling down past the start point: play the animation.
 *                                                                  2. On scrolling down past the end point: do nothing (keep state).
 *                                                                  3. On scrolling up past the end point (returning): do nothing.
 *                                                                  4. On scrolling up past the start point (leaving): reverse the animation.
 * @param {boolean} [options.once=false] - If true, the ScrollTrigger will destroy itself after triggering once (it won't reverse on scroll up).
 * @param {number} [options.delay=0] - Time in seconds to delay the start of the animation.
 * @returns {React.RefObject} Ref to be attached to the container element of the section.
 */
export default function useScrollReveal({
  selector = '.reveal-item',
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
} = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Use gsap.context() to record all GSAP animations and ScrollTriggers created.
    // This allows us to easily revert them all at once when the component unmounts
    // or when dependencies change, solving React 18 Strict Mode double-invocation issues.
    const ctx = gsap.context((self) => {
      // Find the targets. If a selector is provided, look for matching children within our scoped container.
      // If no selector is provided or found, target the container itself.
      const targets = selector ? self.selector(selector) : [container];

      if (targets.length === 0) return;

      // Ensure that initial opacity is zero to avoid a flash of unstyled content (FOUC).
      // We set the initial state immediately before animating.
      gsap.fromTo(
        targets,
        {
          opacity: opacity, // Start with the specified initial opacity (usually 0)
          y: y,             // Slide up from vertical offset
          x: x,             // Slide in from horizontal offset
        },
        {
          opacity: 1,         // Animate to full visibility
          y: 0,               // Animate back to original Y position
          x: 0,               // Animate back to original X position
          duration: duration, // Animation length in seconds
          ease: ease,         // Easing function for smooth deceleration
          stagger: stagger,   // Time gap between child animations to create a cascade effect
          delay: delay,       // Delay before the animation starts
          scrollTrigger: {
            trigger: container,     // The element that controls the activation scroll point
            start: start,           // Scroll position that starts the animation
            end: end,               // Scroll position that ends the animation
            toggleActions: toggleActions, // Behavior of animation when scrolling in/out
            once: once,             // Set to true if the animation should only play once and never reverse
          },
        }
      );
    }, container); // Pass the container to scope selectors (e.g. self.selector will only find elements inside container)

    // Cleanup function: reverts all GSAP animations and destroys ScrollTriggers in this context.
    // This prevents memory leaks and duplicate ScrollTrigger markers/calculators on re-renders or page changes.
    return () => ctx.revert();
  }, [selector, y, x, opacity, duration, stagger, ease, start, end, toggleActions, once, delay]);

  return containerRef;
}
