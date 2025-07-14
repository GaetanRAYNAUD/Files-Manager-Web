import { createTheme, responsiveFontSizes } from '@mui/material';

const baseTheme = createTheme({
  palette: {
    primary: {
      main: '#4f914d',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#e0e0e0',
      contrastText: '#000000'
    },
    background: {
      default: '#fafafa',
      paper: '#e0e0e0'
    },
    text: {
      primary: '#212121',
      secondary: '#757575'
    },
    action: {
      active: '#4f914d'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500
    },
    h2: {
      fontWeight: 500
    },
    button: {
      textTransform: 'none',
      fontWeight: 'bold'
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#212121',
          boxShadow: '0 2px 4px -1px rgba(0,0,0,0.1)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: '#ffffff'
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: {
          margin: themeParam.spacing(1)
        }
      })
    }
  },
  custom: {
    background: {
      secondary: {
        default: '#e5e5e5'
      }
    },
    header: {
      height: 64
    }
  }
});

export const theme = responsiveFontSizes(baseTheme);
