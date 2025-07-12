import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      header: {
        height: number;
      };
      background: {
        secondary: {
          default: string;
          hover: string;
        };
      }
    };
  }

  interface ThemeOptions {
    custom?: {
      header?: {
        height?: number;
      };
      background?: {
        secondary?: {
          default?: string;
          hover?: string;
        };
      }
    };
  }
}
