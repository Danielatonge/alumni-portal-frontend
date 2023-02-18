import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styles from './styles.module.scss';

export const Loading = () => (
    <Box>
        <CircularProgress className={styles.progress} />
    </Box>
);
