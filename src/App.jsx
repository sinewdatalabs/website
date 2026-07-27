import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

import Layout from './components/Layout';
import Home from './pages/Home';

const displayFont = "'Pixelify Sans', 'Inter', sans-serif";

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#171717',
    },
    secondary: {
      main: '#6b6b67',
    },
    background: {
      default: '#fafaf8',
      paper: '#ffffff',
    },
    text: {
      primary: '#171717',
      secondary: '#6b6b67',
    },
    divider: '#e4e4e1',
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: displayFont, fontWeight: 500 },
    h2: { fontFamily: displayFont, fontWeight: 500 },
    h3: { fontFamily: displayFont, fontWeight: 500 },
    h4: { fontFamily: displayFont, fontWeight: 500 },
    h5: { fontFamily: displayFont, fontWeight: 500 },
    h6: { fontFamily: displayFont, fontWeight: 500 },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      letterSpacing: '0.1px',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Pixelify Sans', 'Inter', sans-serif !important;
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '10px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: '#ffffff',
          border: '1px solid #e4e4e1',
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          border: '1px solid #e4e4e1',
          boxShadow: 'none',
          backgroundImage: 'none',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'medium',
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
