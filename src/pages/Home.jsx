import React, { Suspense, lazy, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  TextField,
  Alert,
  Fade,
} from '@mui/material';
import {
  Send,
  CheckCircle,
  Sensors,
  AccessibilityNew,
  Hub,
  LinkedIn,
  Language,
} from '@mui/icons-material';
import TextReveal from '../components/TextReveal';
import RevealSection from '../components/RevealSection';
import { PixelMailIcon } from '../components/PixelIcons';

// tsParticles pulls in its own engine, split into its own chunk instead of
// shipping it on every route.
const HeroParticles = lazy(() => import('../components/HeroParticles'));

const mono = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '0.78rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: '#6b6b67',
};

const displayFont = "'Pixelify Sans', sans-serif";
const bodyFont = "'Inter', sans-serif";

function Eyebrow({ index, label }) {
  return (
    <Typography sx={{ ...mono, mb: 2.5 }}>
      {index} / {label}
    </Typography>
  );
}

export default function Home() {
  const [formStatus, setFormStatus] = useState('idle');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get('name')?.toString().trim() || '';
    const email = data.get('email')?.toString().trim() || '';
    const message = data.get('message')?.toString().trim() || '';

    // No backend on a static site, so this hands off to the visitor's own
    // mail client with the message pre-filled rather than faking a submit.
    const subject = `Get in touch — ${name || 'New inquiry'}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:sinew.datalabs@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setFormStatus('opened');
  };

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '6px',
      color: '#ffffff',
      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.16)' },
      '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
      '&.Mui-focused fieldset': { borderColor: '#ffffff', borderWidth: '1px' },
    },
    '& .MuiInputLabel-root': { color: '#8a8a85' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#ffffff' },
  };

  const verticals = [
    { label: 'Healthcare & elder care', highlight: true },
    { label: 'Home & hospitality' },
    { label: 'Skilled trades' },
    { label: 'Logistics & inspection' },
    { label: 'Food service' },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      {/* 1. Hero */}
      <Box sx={{
        position: 'relative',
        backgroundColor: '#131211',
        py: { xs: 12, md: 16 },
        borderBottom: '1px solid #1f1e1c',
        overflow: 'hidden',
      }}>
        <Suspense fallback={null}>
          <HeroParticles />
        </Suspense>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Stack spacing={4} sx={{ maxWidth: '780px', mx: 'auto', textAlign: 'center', alignItems: 'center' }}>
            <Typography sx={{ ...mono, color: '#6e6e69', mx: 'auto' }}>
              Physical AI data infrastructure
            </Typography>

            <TextReveal variant="fade-up" duration={0.7} stagger={0.05} scroller={false}>
              <Typography
                variant="h1"
                sx={{
                  color: '#fafaf8',
                  fontSize: { xs: '2.1rem', sm: '3rem', md: '3.6rem' },
                  fontWeight: 500,
                  fontFamily: displayFont,
                  lineHeight: 1.25,
                }}
              >
                The data layer for robots that can touch the world.
              </Typography>
            </TextReveal>

            <Fade in timeout={900} style={{ transitionDelay: '250ms' }}>
              <Typography
                sx={{
                  color: '#9c9c96',
                  fontFamily: bodyFont,
                  fontWeight: 400,
                  lineHeight: 1.7,
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  maxWidth: '620px',
                  mx: 'auto',
                }}
              >
                Vision, depth, motion, and force, captured at the scale physical AI needs.
              </Typography>
            </Fade>

            <Fade in timeout={900} style={{ transitionDelay: '450ms' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1.5 }}>
                <Button
                  onClick={() => handleScrollTo('contact')}
                  sx={{
                    backgroundColor: '#fafaf8',
                    color: '#131211',
                    borderRadius: '6px',
                    px: 3.5,
                    py: 1.4,
                    fontSize: '0.92rem',
                    fontWeight: 500,
                    '&:hover': { backgroundColor: '#e4e4e1' },
                  }}
                >
                  Get in touch
                </Button>
              </Box>
            </Fade>
          </Stack>
        </Container>
      </Box>

      {/* 2. The Problem */}
      <Box id="problem" sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <RevealSection selector=".problem-item" once y={24}>
            <Box className="problem-item" sx={{ maxWidth: '760px' }}>
              <Eyebrow index="01" label="The problem" />
              <Typography
                variant="h2"
                sx={{ color: '#171717', fontFamily: displayFont, fontWeight: 500, fontSize: { xs: '1.7rem', md: '2.3rem' }, lineHeight: 1.3, mb: 3 }}
              >
                Manipulation is stuck on data, not models.
              </Typography>
              <Typography sx={{ color: '#54544f', fontFamily: bodyFont, fontSize: '1.02rem', lineHeight: 1.8 }}>
                VLA models can see and plan. They still can't feel: force, contact, how a grip holds under load. That data barely exists at scale. That's the gap we close.
              </Typography>
            </Box>
          </RevealSection>
        </Container>
      </Box>

      {/* 3. What Sinew Does */}
      <Box id="platform" sx={{ py: { xs: 10, md: 14 }, backgroundColor: '#f3f3f0', borderTop: '1px solid #e4e4e1', borderBottom: '1px solid #e4e4e1' }}>
        <Container maxWidth="lg">
          <RevealSection selector=".what-reveal" once y={24}>
            <Stack spacing={2.5} className="what-reveal" sx={{ maxWidth: '760px', mb: 7 }}>
              <Eyebrow index="02" label="What we do" />
              <Typography
                variant="h2"
                sx={{ color: '#171717', fontFamily: displayFont, fontWeight: 500, fontSize: { xs: '1.7rem', md: '2.3rem' }, lineHeight: 1.3 }}
              >
                A data layer, not a robot.
              </Typography>
              <Typography sx={{ color: '#54544f', fontFamily: bodyFont, fontSize: '1.02rem', lineHeight: 1.75 }}>
                We capture real-world human demonstration data, synchronized across vision, depth, motion, and contact force, and deliver it as training-ready datasets.
              </Typography>
            </Stack>

            <Grid container spacing={3}>
              {[
                { icon: <Sensors sx={{ fontSize: 24 }} />, title: 'Multimodal', desc: 'Vision, depth, motion, and force, captured together.' },
                { icon: <AccessibilityNew sx={{ fontSize: 24 }} />, title: 'Embodiment-agnostic', desc: 'Built to retarget across manipulator types.' },
                { icon: <Hub sx={{ fontSize: 24 }} />, title: 'Built to scale', desc: 'A capture network, not a lab.' },
              ].map((item) => (
                <Grid size={{ xs: 12, md: 4 }} className="what-reveal" key={item.title}>
                  <Card sx={{ height: '100%', transition: 'border-color 0.15s ease', '&:hover': { borderColor: '#c4c4c0' } }}>
                    <CardContent sx={{ p: 3.5 }}>
                      <Box sx={{ color: '#171717', mb: 2.5 }}>{item.icon}</Box>
                      <Typography variant="h6" sx={{ mb: 1.25, fontWeight: 600, color: '#171717', fontFamily: bodyFont, fontSize: '1.02rem' }}>
                        {item.title}
                      </Typography>
                      <Typography sx={{ color: '#6b6b67', lineHeight: 1.65, fontSize: '0.92rem', fontFamily: bodyFont }}>
                        {item.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </RevealSection>
        </Container>
      </Box>

      {/* 4. Where the Data Comes From */}
      <Box id="data" sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <RevealSection selector=".data-reveal" once y={24}>
            <Box className="data-reveal" sx={{ maxWidth: '760px' }}>
              <Eyebrow index="03" label="Where it comes from" />
              <Typography
                variant="h2"
                sx={{ color: '#171717', fontFamily: displayFont, fontWeight: 500, fontSize: { xs: '1.7rem', md: '2.3rem' }, lineHeight: 1.3, mb: 3 }}
              >
                Real hands. Real environments. Real force.
              </Typography>
              <Typography sx={{ color: '#54544f', fontFamily: bodyFont, fontSize: '1.02rem', lineHeight: 1.8 }}>
                Captured during ordinary task performance: kitchens, workshops, service counters, care settings. Wearable rigs, including tactile gloves, log contact force directly at the hand. Frame-synchronized. Quality-checked before delivery.
              </Typography>
            </Box>
          </RevealSection>
        </Container>
      </Box>

      {/* 5. Verticals */}
      <Box id="verticals" sx={{ py: { xs: 10, md: 14 }, backgroundColor: '#f3f3f0', borderTop: '1px solid #e4e4e1', borderBottom: '1px solid #e4e4e1' }}>
        <Container maxWidth="lg">
          <RevealSection selector=".vert-reveal" once y={24}>
            <Box className="vert-reveal" sx={{ mb: 3, maxWidth: '760px' }}>
              <Eyebrow index="04" label="Verticals" />
              <Typography
                variant="h2"
                sx={{ color: '#171717', fontFamily: displayFont, fontWeight: 500, fontSize: { xs: '1.7rem', md: '2.3rem' }, lineHeight: 1.3, mb: 3 }}
              >
                Manipulation is everywhere. So are we.
              </Typography>
              <Typography sx={{ color: '#54544f', fontFamily: bodyFont, fontSize: '1.02rem', lineHeight: 1.8 }}>
                Our near-term focus is healthcare: elder care and caregiving support, where force and contact data is hardest to get and matters most.
              </Typography>
            </Box>

            <Stack direction="row" spacing={1.5} className="vert-reveal" sx={{ flexWrap: 'wrap', rowGap: 1.5, mt: 3 }}>
              {verticals.map((vert) => (
                <Box
                  key={vert.label}
                  sx={{
                    px: 2.5,
                    py: 1.25,
                    border: vert.highlight ? '1px solid #171717' : '1px solid #e4e4e1',
                    borderRadius: '6px',
                    backgroundColor: vert.highlight ? '#171717' : '#ffffff',
                  }}
                >
                  <Typography sx={{ fontWeight: 600, color: vert.highlight ? '#fafaf8' : '#171717', fontFamily: bodyFont, fontSize: '0.95rem' }}>
                    {vert.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </RevealSection>
        </Container>
      </Box>

      {/* 6. Dataset */}
      <Box id="dataset" sx={{ py: { xs: 5, md: 6 }, backgroundColor: '#f3f3f0', borderTop: '1px solid #e4e4e1', borderBottom: '1px solid #e4e4e1' }}>
        <Container maxWidth="lg">
          <RevealSection selector=".dataset-reveal" once y={16}>
            <Stack
              className="dataset-reveal"
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 2, sm: 3 }}
              sx={{ alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between' }}
            >
              <Stack direction="row" spacing={2.5} sx={{ alignItems: 'baseline', flexWrap: 'wrap' }}>
                <Typography sx={{ ...mono, mb: 0 }}>05 / Dataset</Typography>
                <Typography sx={{ color: '#54544f', fontFamily: bodyFont, fontSize: '0.98rem', lineHeight: 1.7 }}>
                  Our first dataset is built around humans doing daily tasks, to train robots for home and elder care.
                </Typography>
              </Stack>
              <Box sx={{ display: 'inline-flex', flexShrink: 0 }}>
                <Typography
                  sx={{
                    ...mono,
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#fafaf8',
                    backgroundColor: '#171717',
                    borderRadius: '999px',
                    px: 2.75,
                    py: 1,
                  }}
                >
                  Coming soon
                </Typography>
              </Box>
            </Stack>
          </RevealSection>
        </Container>
      </Box>

      {/* 7. Team */}
      <Box id="team" sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <RevealSection selector=".team-reveal" once y={24}>
            <Box className="team-reveal" sx={{ maxWidth: '760px', mb: 6 }}>
              <Eyebrow index="06" label="Team" />
              <Typography
                variant="h2"
                sx={{ color: '#171717', fontFamily: displayFont, fontWeight: 500, fontSize: { xs: '1.7rem', md: '2.3rem' }, lineHeight: 1.3 }}
              >
                Built by the people building the pipeline.
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {[
                {
                  initial: 'A',
                  name: 'Aryan Shah',
                  role: 'Founder & CEO',
                  linkedin: 'https://www.linkedin.com/in/aryan-shah-03b5b0229/',
                  portfolio: 'https://aryanshah.work/',
                },
                {
                  initial: 'U',
                  name: 'Umang Bhargav',
                  role: 'Co-founder & COO',
                  linkedin: 'https://www.linkedin.com/in/umang-bhargav-9121a7229/',
                },
              ].map((person) => (
                <Grid size={{ xs: 12, sm: 6 }} className="team-reveal" key={person.name}>
                  <Card sx={{ height: '100%', textAlign: 'center' }}>
                    <CardContent sx={{ p: 4.5 }}>
                      <Box sx={{
                        width: 64,
                        height: 64,
                        mx: 'auto',
                        mb: 2.5,
                        border: '1px solid #171717',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Typography sx={{ fontFamily: displayFont, fontWeight: 500, fontSize: '1.5rem', color: '#171717' }}>
                          {person.initial}
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600, color: '#171717', fontFamily: bodyFont, fontSize: '1.05rem' }}>
                        {person.name}
                      </Typography>
                      <Typography sx={{ ...mono, mb: 1.75 }}>
                        {person.role}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
                        {person.linkedin ? (
                          <Box
                            component="a"
                            href={person.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${person.name} on LinkedIn`}
                            sx={{
                              width: 32,
                              height: 32,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: '50%',
                              border: '1px solid #e4e4e1',
                              color: '#6b6b67',
                              transition: 'color 0.15s ease, border-color 0.15s ease',
                              '&:hover': { color: '#171717', borderColor: '#c4c4c0' },
                            }}
                          >
                            <LinkedIn sx={{ fontSize: 16 }} />
                          </Box>
                        ) : null}
                        {person.portfolio ? (
                          <Box
                            component="a"
                            href={person.portfolio}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${person.name}'s portfolio`}
                            sx={{
                              width: 32,
                              height: 32,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: '50%',
                              border: '1px solid #e4e4e1',
                              color: '#6b6b67',
                              transition: 'color 0.15s ease, border-color 0.15s ease',
                              '&:hover': { color: '#171717', borderColor: '#c4c4c0' },
                            }}
                          >
                            <Language sx={{ fontSize: 16 }} />
                          </Box>
                        ) : null}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </RevealSection>
        </Container>
      </Box>

      {/* 7. Forms */}
      <Box id="contact" sx={{ py: { xs: 10, md: 14 }, backgroundColor: '#131211', borderTop: '1px solid #1f1e1c' }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '520px', mx: 'auto', textAlign: 'center' }}>
            <Typography variant="h5" sx={{ color: '#fafaf8', fontFamily: displayFont, fontWeight: 500, fontSize: '1.6rem', mb: 1.5 }}>
              Get in touch
            </Typography>
            <Box
              component="a"
              href="mailto:sinew.datalabs@gmail.com"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                color: '#fafaf8',
                mb: 4,
                fontSize: '0.95rem',
                fontFamily: bodyFont,
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                '&:hover': { color: '#e4e4e1' },
              }}
            >
              <PixelMailIcon sx={{ color: '#9c9c96' }} />
              sinew.datalabs@gmail.com
            </Box>

            {formStatus === 'opened' ? (
              <Fade in>
                <Alert
                  icon={<CheckCircle fontSize="inherit" />}
                  severity="success"
                  sx={{ borderRadius: '6px', backgroundColor: 'rgba(52, 211, 153, 0.08)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.2)', textAlign: 'left' }}
                >
                  Opening your email app with this pre-filled, hit send there to reach us. If nothing opens,
                  email us directly at sinew.datalabs@gmail.com.
                </Alert>
              </Fade>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <Stack spacing={2}>
                  <TextField fullWidth required name="name" label="Name" variant="outlined" sx={inputSx} />
                  <TextField fullWidth required type="email" name="email" label="Email" variant="outlined" sx={inputSx} />
                  <TextField
                    fullWidth
                    required
                    name="message"
                    label="What are you interested in?"
                    placeholder="e.g. training data for a manipulation policy, or joining as a contributor"
                    multiline
                    rows={3}
                    variant="outlined"
                    sx={inputSx}
                  />
                  <Button
                    type="submit"
                    endIcon={<Send sx={{ fontSize: 16 }} />}
                    sx={{
                      py: 1.3,
                      borderRadius: '6px',
                      backgroundColor: '#fafaf8',
                      color: '#131211',
                      fontWeight: 500,
                      '&:hover': { backgroundColor: '#e4e4e1' },
                    }}
                  >
                    Get in touch
                  </Button>
                </Stack>
              </form>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
