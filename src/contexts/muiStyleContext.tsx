import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { createTheme, Theme, ThemeProvider, useTheme } from '@mui/material/styles';
import * as React from 'react';

interface ThemeProviderProps {
    children: React.ReactNode
}

const customTheme = (outerTheme: Theme) =>
    createTheme({
        palette: {
            mode: outerTheme.palette.mode,
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '--TextField-brandBorderColor': '#E0E3E7',
                        '--TextField-brandBorderHoverColor': '#B2BAC2',
                        '--TextField-brandBorderFocusedColor': '#6F7E8C',
                        '& label.Mui-focused': {
                            color: 'var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
            MuiInput: {
                styleOverrides: {
                    root: {
                        '&:before': {
                            borderBottom: '2px solid var(--TextField-brandBorderColor)',
                        },
                        '&:hover:not(.Mui-disabled, .Mui-error):before': {
                            borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
                        },
                        '&.Mui-focused:after': {
                            borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
        },
    });

function MuiStyleProvider({ children }: ThemeProviderProps) {
    const outerTheme = useTheme();
    return (
        <ThemeProvider  theme={customTheme(outerTheme)}>
            {children}
        </ThemeProvider >
    );
}

export default MuiStyleProvider;