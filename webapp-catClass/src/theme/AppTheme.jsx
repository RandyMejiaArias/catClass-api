import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { catClassTheme } from './catClassTheme';

export const AppTheme = ({ children }) => (
  <ThemeProvider theme={catClassTheme}>
    <CssBaseline />
    { children }
  </ThemeProvider>
)