import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Header } from 'components/Header/Header';
import Box from '@mui/material/Box';
import { Suspense } from 'react';
import { Loading } from 'components/Loading/Loading';
import { Router } from 'router';
import styles from './styles.module.scss';

const theme = createTheme({
    palette: {
        primary: {
            main: '#40BA21',
            contrastText: '#fff',
        },
        secondary: {
            main: '#826BE9',
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
        },
        MuiCard: {
            defaultProps: {
                elevation: 0,
            },
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Box className={styles.app}>
                <CssBaseline />
                <Header />
                <Suspense fallback={<Loading />}>
                    <Router />
                </Suspense>
            </Box>
        </ThemeProvider>
    );
}

export default App;
