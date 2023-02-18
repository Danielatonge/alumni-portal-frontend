import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { DRAWER_WIDTH } from 'consts/APP';
import { useRecoilState } from 'recoil';
import { drawerOpenState } from 'state/app';
import Drawer from '@mui/material/Drawer';
import { Outlet } from 'react-router-dom';
import styles from './styles.module.scss';

// import { RightDrawer } from './RightDrawer';
import { LeftDrawer } from './LeftDrawer';

export const Main = () => {
    const [drawerOpen, setDrawerOpen] = useRecoilState(drawerOpenState);

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };
    return (
        <Box className={styles.mainWrapper}>
            <Box
                component="nav"
                sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    variant="temporary"
                    open={drawerOpen}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: DRAWER_WIDTH,
                            background: '#DFE7EE',
                        },
                    }}
                >
                    <LeftDrawer handleDrawerClose={handleDrawerClose} />
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: DRAWER_WIDTH,
                            background: '#DFE7EE',
                        },
                    }}
                    open
                >
                    <LeftDrawer />
                </Drawer>
            </Box>
            <Box component="main" className={styles.content}>
                <Toolbar />
                <Outlet />
            </Box>
            {/* <RightDrawer /> */}
        </Box>
    );
};
