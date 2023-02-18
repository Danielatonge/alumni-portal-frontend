import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import { ALUMNI_ROUTES } from 'consts/ROUTES';
import styles from './styles.module.scss';

type LinkTabProps = {
    href: string;
    label: string;
};

const LinkTab = ({ href, label }: LinkTabProps) => (
    <Link to={href} className={styles.link}>
        <Tab label={label} color="primary" />
    </Link>
);

const NAVIGATION = {
    [ALUMNI_ROUTES.COURSES]: 0,
    [ALUMNI_ROUTES.MY_COURSES]: 1,
};

type TABS = ALUMNI_ROUTES.COURSES | ALUMNI_ROUTES.MY_COURSES;

export const Courses = () => {
    const { pathname } = useLocation();

    return (
        <Box className={styles.coursesPage}>
            <Box
                className={styles.tabs}
                sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
                <Tabs
                    value={NAVIGATION[pathname as TABS]}
                    aria-label="course tabs"
                >
                    <LinkTab label="All Courses" href={ALUMNI_ROUTES.COURSES} />
                    <LinkTab
                        label="My Courses"
                        href={ALUMNI_ROUTES.MY_COURSES}
                    />
                </Tabs>
            </Box>
            <Box className={styles.coursesContent}>
                <Outlet />
            </Box>
        </Box>
    );
};
