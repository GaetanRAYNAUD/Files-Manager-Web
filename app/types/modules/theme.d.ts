import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      header: {
        height: number;
      };
    };
  }

  interface ThemeOptions {
    custom?: {
      header?: {
        height?: number;
      };
    };
  }
}
