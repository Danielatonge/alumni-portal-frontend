import { ReactComponent as UniversityLogo } from 'static/icons/universityLogo.svg';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import styles from './styles.module.scss';

const drawerWidth = 260;

export const RightDrawer = () => (
    <Drawer
        variant="permanent"
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
        }}
        open
        anchor="right"
    >
        <Toolbar />
        <div className={styles.rightDrawerHeader}>
            <UniversityLogo />
        </div>
    </Drawer>
);
