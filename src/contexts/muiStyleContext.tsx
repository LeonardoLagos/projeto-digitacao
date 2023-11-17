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
            primary: {
                main: '#e3ce10',
            },
            secondary: {
                main: '#a3a3a3',
            },
            text: {
                primary: '#a3a3a3',
                secondary: '#fafafa'
            },
        },
        components: {
            MuiInputBase: {
                styleOverrides: {
                    
                }
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '--TextField-brandBorderColor': '#ababab',
                        '--TextField-brandBorderHoverColor': '#B2BAC2',
                        '--TextField-brandBorderFocusedColor': '#6F7E8C',
                    }
                },
            },
            MuiFormLabel: {
              styleOverrides: {
                root: {
                  color: 'var(--TextField-brandBorderColor)',
                  '&.Mui-focused': {
                    color: '#e3ce10',
                  },
                },
              },
            },
            MuiInput: {
                styleOverrides: {
                    root: {
                        color: '#f2f2f2',
                        '&:before': {
                            borderBottom: '2px solid var(--TextField-brandBorderColor)',
                        },
                        // '&:hover:not(.Mui-disabled, .Mui-error):before': {
                        //     borderBottom: '2px solid red'
                        // }
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        backgroundColor: '#e3ce10',
                        color: '#000',
                        '&:hover': {
                            backgroundColor: '#b8a20d',
                        },
                    },
                },
            },
        },
    });

function MuiStyleProvider({ children }: ThemeProviderProps) {
    const outerTheme = useTheme();
    return (
        <ThemeProvider theme={customTheme(outerTheme)}>
            {children}
        </ThemeProvider >
    );
}

export default MuiStyleProvider;