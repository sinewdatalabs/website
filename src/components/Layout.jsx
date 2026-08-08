import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Stack,
  Typography,
  IconButton,
  Button,
  Drawer,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  ChevronRight,
} from '@mui/icons-material';

const BRAND_NAME = 'Sinew';

const navLinks = [
  { title: 'Platform', targetId: 'platform' },
  { title: 'Verticals', targetId: 'verticals' },
  { title: 'Dataset', targetId: 'dataset' },
  { title: 'Team', targetId: 'team' },
];

const monoLabel = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '0.8rem',
  letterSpacing: '0.02em',
};

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Sub-pages should open at the top rather than inheriting the previous scroll.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const scrollToId = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Section links live on the home page, so from a sub-page we route there first
  // and scroll once the sections have mounted.
  const handleScroll = (targetId) => {
    if (isHome) {
      scrollToId(targetId);
      return;
    }
    navigate('/');
    requestAnimationFrame(() => scrollToId(targetId));
  };

  const handleNavClick = (targetId) => {
    handleScroll(targetId);
    setMobileOpen(false);
  };

  const goToRoute = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#fafaf8',
    }}>
      {/* Top bar */}
      <Box sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        display: 'flex',
        justifyContent: 'center',
        pt: 2,
        pb: 1,
        px: 2,
      }}>
        <Box sx={{
          width: '100%',
          maxWidth: 820,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2, sm: 2.5 },
          py: 1,
          borderRadius: '999px',
          backgroundColor: 'rgba(250, 250, 248, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid #e4e4e1',
          boxShadow: '0 6px 20px rgba(23, 23, 23, 0.06)',
        }}>
          <Typography
            onClick={() => (isHome ? window.scrollTo({ top: 0, behavior: 'smooth' }) : navigate('/'))}
            sx={{
              fontFamily: "'Pixelify Sans', sans-serif",
              fontWeight: 500,
              color: '#171717',
              fontSize: '1.1rem',
              cursor: 'pointer',
            }}
          >
            {BRAND_NAME}
          </Typography>

          <Stack
            direction="row"
            spacing={0.5}
            sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
          >
            {navLinks.map((link) => (
              <Button
                key={link.title}
                onClick={() => handleScroll(link.targetId)}
                sx={{
                  ...monoLabel,
                  color: '#6b6b67',
                  px: 1.5,
                  py: 0.75,
                  borderRadius: '999px',
                  textTransform: 'uppercase',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    color: '#171717',
                  },
                }}
              >
                {link.title}
              </Button>
            ))}
            <Button
              onClick={() => goToRoute('/blog')}
              sx={{
                ...monoLabel,
                color: location.pathname.startsWith('/blog') ? '#171717' : '#6b6b67',
                px: 1.5,
                py: 0.75,
                borderRadius: '999px',
                textTransform: 'uppercase',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  color: '#171717',
                },
              }}
            >
              Blog
            </Button>
          </Stack>

          <Button
            onClick={() => handleScroll('contact')}
            sx={{
              display: { xs: 'none', md: 'inline-flex' },
              alignItems: 'center',
              gap: 0.75,
              backgroundColor: '#171717',
              color: '#fafaf8',
              borderRadius: '999px',
              pl: 2,
              pr: 0.75,
              py: 0.6,
              fontSize: '0.85rem',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: '#000000',
              },
            }}
          >
            Get in touch
            <Box sx={{
              width: 22,
              height: 22,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.16)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <ChevronRight sx={{ fontSize: 16, color: '#fafaf8' }} />
            </Box>
          </Button>

          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: 'flex', md: 'none' }, color: '#171717' }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Mobile Navigation Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            backgroundColor: '#fafaf8',
            border: 'none',
            borderLeft: '1px solid #e4e4e1',
            p: 3,
          },
        }}
        anchor="right"
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography sx={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 500, color: '#171717' }}>
            {BRAND_NAME}
          </Typography>
          <IconButton onClick={handleDrawerToggle} sx={{ color: '#171717' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Stack spacing={0.5} sx={{ mb: 4 }}>
          {navLinks.map((link) => (
            <Button
              key={link.title}
              onClick={() => handleNavClick(link.targetId)}
              fullWidth
              sx={{
                ...monoLabel,
                justifyContent: 'flex-start',
                color: '#6b6b67',
                textTransform: 'uppercase',
                px: 1.5,
                py: 1.2,
                borderRadius: '6px',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  color: '#171717',
                },
              }}
            >
              {link.title}
            </Button>
          ))}
          <Button
            onClick={() => goToRoute('/blog')}
            fullWidth
            sx={{
              ...monoLabel,
              justifyContent: 'flex-start',
              color: location.pathname.startsWith('/blog') ? '#171717' : '#6b6b67',
              textTransform: 'uppercase',
              px: 1.5,
              py: 1.2,
              borderRadius: '6px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                color: '#171717',
              },
            }}
          >
            Blog
          </Button>
        </Stack>

        <Button
          onClick={() => handleNavClick('contact')}
          fullWidth
          sx={{
            backgroundColor: '#171717',
            color: '#fafaf8',
            borderRadius: '6px',
            py: 1.3,
            fontWeight: 500,
            '&:hover': { backgroundColor: '#000000' },
          }}
        >
          Get in touch
        </Button>
      </Drawer>

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </Box>

      {/* Footer */}
      <Box sx={{ borderTop: '1px solid #e4e4e1', py: 5 }}>
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            sx={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Typography sx={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 500, color: '#171717', fontSize: '1rem' }}>
              {BRAND_NAME}
            </Typography>
            <Typography
              component="a"
              href="mailto:sinew.datalabs@gmail.com"
              sx={{ ...monoLabel, color: '#6b6b67', textDecoration: 'none', '&:hover': { color: '#171717' } }}
            >
              sinew.datalabs@gmail.com
            </Typography>
            <Typography sx={{ ...monoLabel, color: '#6b6b67' }}>
              © {new Date().getFullYear()} {BRAND_NAME}
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
