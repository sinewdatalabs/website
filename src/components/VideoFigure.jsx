import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';

const mono = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '0.72rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: '#8a8a85',
};

/**
 * Renders a pipeline-output clip. The sources are only attached once the figure
 * scrolls near the viewport, so a page with several clips does not pull every
 * file on first paint.
 */
export default function VideoFigure({ src, poster, label, caption }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  // Without IntersectionObserver there is nothing to defer on, so start visible.
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const node = containerRef.current;
    if (!node || visible) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '300px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  // Pause clips that have scrolled away so only the one being read is decoding.
  useEffect(() => {
    const video = videoRef.current;
    if (!visible || !video || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const attempt = video.play();
            if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <Box ref={containerRef} component="figure" sx={{ m: 0, my: { xs: 4, md: 5 } }}>
      <Box
        sx={{
          border: '1px solid #e4e4e1',
          borderRadius: '10px',
          overflow: 'hidden',
          backgroundColor: '#131211',
          lineHeight: 0,
        }}
      >
        <Box
          ref={videoRef}
          component="video"
          src={visible ? src : undefined}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          controls
          sx={{ display: 'block', width: '100%', height: 'auto' }}
        />
      </Box>

      <Box
        component="figcaption"
        sx={{
          mt: 1.75,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 0.5, sm: 2 },
          alignItems: { xs: 'flex-start', sm: 'baseline' },
        }}
      >
        {label ? <Typography sx={{ ...mono, flexShrink: 0 }}>{label}</Typography> : null}
        <Typography
          sx={{
            color: '#6b6b67',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.88rem',
            lineHeight: 1.65,
          }}
        >
          {caption}
        </Typography>
      </Box>
    </Box>
  );
}
