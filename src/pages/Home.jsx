import React, { useState } from 'react';
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
} from '@mui/icons-material';
import TextReveal from '../components/TextReveal';
import RevealSection from '../components/RevealSection';

const mono = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '0.78rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: '#8a8a85',
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
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      e.target.reset();
    }, 1200);
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
    { label: 'Tactile gloves & assistive devices', highlight: true },
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
        <Box sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/city_night_bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(1) brightness(0.6) contrast(1.1)',
        }} />
        <Box sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(19,18,17,0.35) 0%, rgba(19,18,17,0.8) 100%)',
        }} />
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
                Captured during ordinary task performance: kitchens, workshops, service counters, care settings. Frame-synchronized. Quality-checked before delivery.
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
                Our near-term focus is healthcare: elder care, caregiving support, and tactile gloves and other assistive devices, where force and contact data is hardest to get and matters most.
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
      <Box id="dataset" sx={{ py: { xs: 10, md: 14 }, backgroundColor: '#f3f3f0', borderTop: '1px solid #e4e4e1', borderBottom: '1px solid #e4e4e1' }}>
        <Container maxWidth="lg">
          <RevealSection selector=".dataset-reveal" once y={24}>
            <Box className="dataset-reveal" sx={{ maxWidth: '760px' }}>
              <Eyebrow index="05" label="Dataset" />
              <Typography
                variant="h2"
                sx={{ color: '#171717', fontFamily: displayFont, fontWeight: 500, fontSize: { xs: '1.7rem', md: '2.3rem' }, lineHeight: 1.3, mb: 3 }}
              >
                Dataset
              </Typography>
              <Typography sx={{ color: '#54544f', fontFamily: bodyFont, fontSize: '1.02rem', lineHeight: 1.8, mb: 3 }}>
                Our first multimodal manipulation dataset, built around healthcare and elder care tasks, is in progress.
              </Typography>
              <Box sx={{ display: 'inline-flex' }}>
                <Typography sx={{ ...mono, color: '#171717', border: '1px solid #171717', borderRadius: '999px', px: 2, py: 0.75 }}>
                  Coming soon
                </Typography>
              </Box>
            </Box>
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
                { initial: 'A', name: 'Aryan Shah', role: 'Founder & CEO' },
                { initial: 'U', name: 'Umang Bhargav', role: 'Co-founder & COO' },
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
                      <Typography sx={{ ...mono }}>
                        {person.role}
                      </Typography>
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
            <Typography sx={{ color: '#9c9c96', mb: 1.5, lineHeight: 1.6, fontSize: '0.95rem', fontFamily: bodyFont }}>
              A small number of design partner and contributor slots are open right now.
            </Typography>
            <Typography
              component="a"
              href="mailto:sinew.datalabs@gmail.com"
              sx={{
                display: 'inline-block',
                color: '#fafaf8',
                mb: 4,
                fontSize: '0.95rem',
                fontFamily: bodyFont,
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                '&:hover': { color: '#e4e4e1' },
              }}
            >
              sinew.datalabs@gmail.com
            </Typography>

            {formStatus === 'success' ? (
              <Fade in>
                <Alert
                  icon={<CheckCircle fontSize="inherit" />}
                  severity="success"
                  sx={{ borderRadius: '6px', backgroundColor: 'rgba(52, 211, 153, 0.08)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.2)', textAlign: 'left' }}
                >
                  Thanks, that's been received. We'll be in touch soon.
                </Alert>
              </Fade>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <Stack spacing={2}>
                  <TextField fullWidth required label="Name" variant="outlined" sx={inputSx} />
                  <TextField fullWidth required type="email" label="Email" variant="outlined" sx={inputSx} />
                  <TextField
                    fullWidth
                    required
                    label="What are you interested in?"
                    placeholder="e.g. training data for a manipulation policy, or joining as a contributor"
                    multiline
                    rows={3}
                    variant="outlined"
                    sx={inputSx}
                  />
                  <Button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    endIcon={<Send sx={{ fontSize: 16 }} />}
                    sx={{
                      py: 1.3,
                      borderRadius: '6px',
                      backgroundColor: '#fafaf8',
                      color: '#131211',
                      fontWeight: 500,
                      '&:hover': { backgroundColor: '#e4e4e1' },
                      '&.Mui-disabled': { backgroundColor: 'rgba(255,255,255,0.25)', color: 'rgba(0,0,0,0.4)' },
                    }}
                  >
                    {formStatus === 'submitting' ? 'Submitting...' : 'Get in touch'}
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
