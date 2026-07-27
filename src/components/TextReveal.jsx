import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * TextReveal component that animates text using GSAP.
 * 
 * Props:
 * - children: string or React node
 * - variant: 'words' | 'chars' | 'fade-up' | 'lines' (default 'words')
 * - delay: animation delay in seconds
 * - duration: duration per element in seconds
 * - stagger: stagger time between elements in seconds
 * - scroller: whether to trigger on scroll (default true)
 * - Component: container component (e.g. 'div', Typography, Box)
 * - sx: MUI style object
 * - ...rest: props passed to container
 */
export default function TextReveal({
  children,
  variant = 'words',
  delay = 0,
  duration = 0.8,
  stagger = 0.035,
  scroller = true,
  Component = Box,
  sx = {},
  ...rest
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = containerRef.current.querySelectorAll('.gsap-reveal-item');
      if (!items.length) return;

      let initialStyles = { y: '110%', opacity: 0, rotateX: -15 };
      let targetStyles = {
        y: '0%',
        opacity: 1,
        rotateX: 0,
        duration,
        stagger,
        delay,
        ease: 'power3.out',
      };

      if (variant === 'fade-up') {
        initialStyles = { y: 35, opacity: 0, rotateX: 0 };
        targetStyles = {
          y: 0,
          opacity: 1,
          duration,
          stagger: stagger || 0.1,
          delay,
          ease: 'power3.out',
        };
      }

      if (scroller) {
        gsap.fromTo(items, initialStyles, {
          ...targetStyles,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      } else {
        gsap.fromTo(items, initialStyles, targetStyles);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [children, variant, delay, scroller, duration, stagger]);

  // Helper to render split words
  const renderWords = (text) => {
    if (typeof text !== 'string') return text;
    const words = text.split(' ');
    return words.map((word, wIdx) => (
      <span
        key={wIdx}
        style={{
          display: 'inline-block',
          overflow: 'hidden',
          verticalAlign: 'bottom',
          paddingBottom: '0.12em',
          marginBottom: '-0.12em',
          marginRight: '0.28em',
          whiteSpace: 'nowrap',
        }}
      >
        <span
          className="gsap-reveal-item"
          style={{
            display: 'inline-block',
            willChange: 'transform, opacity',
            transformOrigin: '0% 100%',
          }}
        >
          {word}
        </span>
      </span>
    ));
  };

  // Helper to render split characters
  const renderChars = (text) => {
    if (typeof text !== 'string') return text;
    const words = text.split(' ');
    return words.map((word, wIdx) => (
      <span
        key={wIdx}
        style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          marginRight: '0.28em',
        }}
      >
        {word.split('').map((char, cIdx) => (
          <span
            key={cIdx}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              verticalAlign: 'bottom',
              paddingBottom: '0.12em',
              marginBottom: '-0.12em',
            }}
          >
            <span
              className="gsap-reveal-item"
              style={{
                display: 'inline-block',
                willChange: 'transform, opacity',
                transformOrigin: '0% 100%',
              }}
            >
              {char}
            </span>
          </span>
        ))}
      </span>
    ));
  };

  const renderContent = () => {
    if (variant === 'words') {
      return renderWords(children);
    }
    if (variant === 'chars') {
      return renderChars(children);
    }
    if (variant === 'fade-up') {
      if (typeof children === 'string') {
        return (
          <span className="gsap-reveal-item" style={{ display: 'inline-block', willChange: 'transform, opacity' }}>
            {children}
          </span>
        );
      }
      return <div className="gsap-reveal-item" style={{ willChange: 'transform, opacity' }}>{children}</div>;
    }
    return children;
  };

  return (
    <Component
      ref={containerRef}
      sx={{
        perspective: '1000px',
        ...sx,
      }}
      {...rest}
    >
      {renderContent()}
    </Component>
  );
}
