'use client';

import { type ReactNode } from 'react';
import {
    createTheme,
    ThemeProvider
} from '@mui/material';

const defaultTheme = createTheme({palette: {
    text: {
      primary: '#000000', // Set the default text color to black
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#1976d2', // Set the default button text color to black
        },
      },
    }}});
export default function ThemeWrapper ({children}: {children: ReactNode}) {
    return (
        <ThemeProvider theme={defaultTheme}>
            {children}
        </ThemeProvider>
    );
}       