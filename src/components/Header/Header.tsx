import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRecoilState } from 'recoil';
import { drawerOpenState } from 'state/app';
import { DRAWER_WIDTH } from 'consts/APP';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as UniversityLogo } from 'static/icons/universityLogo.svg';
import { useCallback } from 'react';
import { Description } from 'components/Description/Description';

import { ALUMNI_ROUTES, APP_ROUTES } from 'consts/ROUTES';
import styles from './styles.module.scss';

export const Header = () => {
    const [drawerOpen, setDrawerOpenState] = useRecoilState(drawerOpenState);
    const handleDrawerToggle = () => {
        setDrawerOpenState(!drawerOpen);
    };
    const { pathname } = useLocation();

    const isAuth =
        pathname === APP_ROUTES.AUTH ||
        pathname === APP_ROUTES.REGISTER ||
        pathname === APP_ROUTES.UPDATE_PASSWORD ||
        pathname === APP_ROUTES.RESET_PASSWORD;

    const HeaderSign = useCallback(() => {
        switch (true) {
            case isAuth:
                return (
                    <Link to="/" style={{}}>
                        <img
                            src="alumni_logo.png"
                            alt="logo"
                            className="Alumni-logo"
                        />
                    </Link>
                );
            case pathname === ALUMNI_ROUTES.MY_COURSES:
            case pathname === ALUMNI_ROUTES.COURSES:
                return <Description>Courses</Description>;
            case pathname === ALUMNI_ROUTES.CERTIFICATES:
                return <Description>Certificates</Description>;
            case pathname === ALUMNI_ROUTES.DONATIONS:
                return <Description>Donations</Description>;
            case pathname === ALUMNI_ROUTES.BOOKS:
                return <Description>Books</Description>;
            case pathname === ALUMNI_ROUTES.PASS:
                return <Description>Pass</Description>;
            case pathname === APP_ROUTES.PROFILE:
                return <Description>Profile</Description>;
            case pathname === ALUMNI_ROUTES.NETWORK:
                return <Description>Network</Description>;
            default:
                return null;
        }
    }, [pathname, isAuth]);
    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                width: !isAuth
                    ? { sm: `calc(100% - ${DRAWER_WIDTH}px)` }
                    : '100%',
                ml: !isAuth ? { sm: `${DRAWER_WIDTH}px` } : 0,
                background: '#EDF1F5',
            }}
        >
            <Toolbar>
                <div className={styles.authHeader}>
                    <div className={styles.description}>
                        {!isAuth && (
                            <IconButton
                                color="primary"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2, display: { sm: 'none' } }}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                        <HeaderSign />
                    </div>
                    <Box sx={{ display: { sm: 'none' }, height: 24 }}>
                        <UniversityLogo />
                    </Box>
                </div>
            </Toolbar>
        </AppBar>
    );
};
