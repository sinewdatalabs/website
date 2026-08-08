import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Divider, Stack, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import GloveDiagram from '../components/GloveDiagram';
import { getPost } from '../data/posts';

const mono = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '0.78rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: '#6b6b67',
};

const displayFont = "'Pixelify Sans', sans-serif";
const bodyFont = "'Inter', sans-serif";

const bodyText = {
  color: '#54544f',
  fontFamily: bodyFont,
  fontSize: '1.02rem',
  lineHeight: 1.85,
  mb: 2.5,
};

function SectionHeading({ index, children }) {
  return (
    <Box sx={{ mt: { xs: 7, md: 9 }, mb: 3 }}>
      <Typography sx={{ ...mono, mb: 1.5 }}>{index}</Typography>
      <Typography
        variant="h2"
        sx={{
          color: '#171717',
          fontFamily: displayFont,
          fontWeight: 500,
          fontSize: { xs: '1.45rem', md: '1.85rem' },
          lineHeight: 1.35,
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}

const gaps = [
  { label: 'Vision', detail: 'Sees the hand close. Cannot tell you how hard.' },
  { label: 'Depth', detail: 'Knows the hand reached the surface. Not what happened after.' },
  { label: 'Motion', detail: 'Tracks the joint angles. Says nothing about load.' },
  { label: 'Touch', detail: 'The one channel that was always missing. This is how we get it.' },
];

export default function BlogTactile() {
  const post = getPost('tactile-sensing');

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box sx={{ py: { xs: 7, md: 10 }, borderBottom: '1px solid #e4e4e1' }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '780px' }}>
            <Button
              component={RouterLink}
              to="/blog"
              startIcon={<ArrowBack sx={{ fontSize: 15 }} />}
              sx={{ ...mono, px: 0, mb: 4, '&:hover': { backgroundColor: 'transparent', color: '#171717' } }}
            >
              All posts
            </Button>

            <Stack direction="row" spacing={2} sx={{ mb: 2.5, alignItems: 'baseline', flexWrap: 'wrap' }}>
              <Typography sx={{ ...mono }}>{post.dateLabel}</Typography>
              <Typography sx={{ ...mono, color: '#8f8f89' }}>{post.readingTime}</Typography>
            </Stack>

            <Typography
              variant="h1"
              sx={{
                color: '#171717',
                fontFamily: displayFont,
                fontWeight: 500,
                fontSize: { xs: '1.9rem', md: '2.7rem' },
                lineHeight: 1.28,
                mb: 3,
              }}
            >
              {post.title}
            </Typography>

            <Typography sx={{ color: '#54544f', fontFamily: bodyFont, fontSize: '1.08rem', lineHeight: 1.8 }}>
              {post.excerpt}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Body */}
      <Box sx={{ py: { xs: 7, md: 9 } }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '780px' }}>
            <Typography sx={bodyText}>
              Here's the thing nobody selling a vision pipeline wants to say out loud: you can have perfect camera
              pose, a clean hand skeleton, and dense depth on every pixel, and you still don't know if that grip
              is about to crush an egg or drop a wrench. Sight tells you where the hand is. It doesn't tell you
              what the hand is doing to whatever it's holding. That's not a modeling problem. It's a data problem,
              and it's the one we spend most of our time on.
            </Typography>
            <Typography sx={bodyText}>
              So alongside the camera rig, we run a second one: a glove instrumented with contact-force pads at
              the fingertips and across the palm, worn during the same ordinary tasks, timestamped into the same
              frame index as everything else. It's not a product. It's a capture rig, the same category as the
              head-mounted camera, built to answer one question a camera physically cannot: how hard.
            </Typography>

            <Box
              sx={{
                my: { xs: 5, md: 6 },
                border: '1px solid #e4e4e1',
                borderRadius: '10px',
                backgroundColor: '#f3f3f0',
                p: { xs: 3, md: 3.5 },
              }}
            >
              <Typography sx={{ ...mono, mb: 2.5 }}>What each channel actually gives you</Typography>
              <Stack divider={<Divider sx={{ borderColor: '#e4e4e1' }} />}>
                {gaps.map((gap, index) => (
                  <Stack
                    key={gap.label}
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 0.5, sm: 3 }}
                    sx={{ py: 1.5, alignItems: { xs: 'flex-start', sm: 'baseline' } }}
                  >
                    <Typography sx={{ ...mono, color: '#8f8f89', minWidth: '2.5rem' }}>
                      {String(index + 1).padStart(2, '0')}
                    </Typography>
                    <Typography
                      sx={{ fontFamily: bodyFont, fontWeight: 600, color: '#171717', fontSize: '0.95rem', minWidth: '6rem' }}
                    >
                      {gap.label}
                    </Typography>
                    <Typography sx={{ fontFamily: bodyFont, color: '#6b6b67', fontSize: '0.92rem', lineHeight: 1.6 }}>
                      {gap.detail}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>

            {/* 01 */}
            <SectionHeading index="01 / The rig">Eight pads, one hand, no wires you'd notice.</SectionHeading>
            <Typography sx={bodyText}>
              Each fingertip carries a pad, and the palm carries three more, thumb side, centre, pinky side,
              because a real grip loads the palm as much as the fingers do. Every pad reports force continuously
              while the task runs, and every reading lands on the same frame index as the camera, the hand
              skeleton, and the depth stream. That last part is the whole point: force means nothing floating on
              its own. It only becomes useful once you can ask what the hand looked like at the exact instant the
              grip tightened.
            </Typography>
            <Typography sx={bodyText}>
              Below is that eight-pad layout. The numbers are illustrative rather than a real capture, but the
              positions and the idea are exactly what ships: a force reading per pad, synced to everything else
              in the take.
            </Typography>

            <GloveDiagram />

            {/* 02 */}
            <SectionHeading index="02 / Why this is the hard part">
              Anyone can point a camera. Almost nobody wires a glove.
            </SectionHeading>
            <Typography sx={bodyText}>
              Video is everywhere. You can scrape it, license it, generate it. Force data isn't any of those
              things, it only exists if someone put real hardware on a real hand and did a real task with it.
              There's no shortcut, no synthetic substitute good enough to train on, no archive to mine. That's
              exactly why almost nobody has a real tactile dataset at any real size, and it's exactly why we think
              it's worth building the hard way.
            </Typography>

            {/* 03 */}
            <SectionHeading index="03 / What we're actually doing differently">Scale.</SectionHeading>
            <Typography sx={bodyText}>
              Not a better sensor. Not a proprietary architecture. Scale, plainly: a capture network instead of a
              lab bench, more people, more environments, more ordinary tasks, run continuously instead of one
              instrumented room producing a few hundred clean takes. Tactile ground truth is the actual bottleneck
              holding physical AI back right now, everyone building a manipulation policy needs it and almost
              nobody can get enough of it. The company that can produce it at volume, across real conditions, own
              that layer. That's the bet.
            </Typography>
            <Typography sx={bodyText}>
              We're not trying to sound like we've reinvented anything. The camera, the depth sensor, the
              force pad, none of that is exotic. What's hard, and what's actually defensible, is doing it
              thousands of times over instead of a few dozen, without the data degrading as it grows. That's the
              part we're built around.
            </Typography>

            <Box
              sx={{
                mt: { xs: 6, md: 8 },
                p: { xs: 3.5, md: 4.5 },
                borderRadius: '10px',
                backgroundColor: '#131211',
              }}
            >
              <Typography
                variant="h3"
                sx={{ color: '#fafaf8', fontFamily: displayFont, fontWeight: 500, fontSize: '1.35rem', mb: 1.5 }}
              >
                If you're a VC and scale is the part you'd want to dig into
              </Typography>
              <Typography sx={{ color: '#9c9c96', fontFamily: bodyFont, fontSize: '0.98rem', lineHeight: 1.7, mb: 3 }}>
                We'd rather talk numbers than adjectives. Reach out and we can walk through the capture network,
                where it stands today, and what it looks like at the volume physical AI actually needs.
              </Typography>
              <Button
                component="a"
                href="mailto:sinew.datalabs@gmail.com"
                sx={{
                  backgroundColor: '#fafaf8',
                  color: '#131211',
                  borderRadius: '6px',
                  px: 3,
                  py: 1.2,
                  fontWeight: 500,
                  fontSize: '0.92rem',
                  '&:hover': { backgroundColor: '#e4e4e1' },
                }}
              >
                Talk to us
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
