import { createTheme, responsiveFontSizes } from '@mui/material';

const primary = '#4f914d';
const secondary = '#e0e0e0';

const baseTheme = createTheme({
  palette: {
    primary: {
      main: primary,
      contrastText: '#ffffff'
    },
    secondary: {
      main: secondary,
      contrastText: '#212121'
    },
    background: {
      default: secondary,
      paper: '#ffffff'
    },
    text: {
      primary: '#212121',
      secondary: '#757575'
    },
    action: {
      active: primary
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
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: primary
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          fontWeight: 'bold'
        })
      }
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
