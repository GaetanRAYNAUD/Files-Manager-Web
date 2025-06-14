import { createTheme, responsiveFontSizes } from '@mui/material';

const baseTheme = createTheme({});

export const theme = responsiveFontSizes(baseTheme);
