import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Stack, Typography } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import RevealSection from '../components/RevealSection';
import { posts } from '../data/posts';

const mono = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '0.78rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: '#8a8a85',
};

const displayFont = "'Pixelify Sans', sans-serif";
const bodyFont = "'Inter', sans-serif";

export default function Blog() {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ py: { xs: 9, md: 13 }, borderBottom: '1px solid #e4e4e1' }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '760px' }}>
            <Typography sx={{ ...mono, mb: 2.5 }}>Blog</Typography>
            <Typography
              variant="h1"
              sx={{
                color: '#171717',
                fontFamily: displayFont,
                fontWeight: 500,
                fontSize: { xs: '2rem', md: '2.9rem' },
                lineHeight: 1.25,
                mb: 3,
              }}
            >
              Notes from the pipeline.
            </Typography>
            <Typography sx={{ color: '#54544f', fontFamily: bodyFont, fontSize: '1.02rem', lineHeight: 1.8 }}>
              How we capture, process, and validate multimodal manipulation data, written up as we build it.
            </Typography>
          </Box>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 8, md: 11 } }}>
        <Container maxWidth="lg">
          <RevealSection selector=".post-reveal" once y={24}>
            <Stack sx={{ maxWidth: '820px' }}>
              {posts.map((post, index) => (
                <Box
                  key={post.slug}
                  className="post-reveal"
                  component={RouterLink}
                  to={`/blog/${post.slug}`}
                  sx={{
                    display: 'block',
                    textDecoration: 'none',
                    py: { xs: 4, md: 5 },
                    borderTop: index === 0 ? '1px solid #e4e4e1' : 'none',
                    borderBottom: '1px solid #e4e4e1',
                    transition: 'opacity 0.15s ease',
                    '&:hover .post-title': { textDecoration: 'underline', textUnderlineOffset: '4px' },
                    '&:hover .post-arrow': { transform: 'translateX(4px)' },
                  }}
                >
                  <Stack direction="row" spacing={2} sx={{ mb: 1.5, alignItems: 'baseline', flexWrap: 'wrap' }}>
                    <Typography sx={{ ...mono }}>{post.dateLabel}</Typography>
                    <Typography sx={{ ...mono, color: '#b4b4b0' }}>{post.readingTime}</Typography>
                  </Stack>

                  <Typography
                    variant="h2"
                    className="post-title"
                    sx={{
                      color: '#171717',
                      fontFamily: displayFont,
                      fontWeight: 500,
                      fontSize: { xs: '1.35rem', md: '1.75rem' },
                      lineHeight: 1.35,
                      mb: 1.75,
                    }}
                  >
                    {post.title}
                  </Typography>

                  <Typography
                    sx={{ color: '#54544f', fontFamily: bodyFont, fontSize: '0.98rem', lineHeight: 1.75, mb: 2 }}
                  >
                    {post.excerpt}
                  </Typography>

                  <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
                    <Typography sx={{ ...mono, color: '#171717' }}>Read</Typography>
                    <ArrowForward
                      className="post-arrow"
                      sx={{ fontSize: 15, color: '#171717', transition: 'transform 0.15s ease' }}
                    />
                  </Stack>
                </Box>
              ))}
            </Stack>
          </RevealSection>
        </Container>
      </Box>
    </Box>
  );
}
