import { ReactComponent as Book } from 'static/icons/cardIcons/book.svg';
import { ReactComponent as Pass } from 'static/icons/cardIcons/pass.svg';
import { ReactComponent as Certificate } from 'static/icons/cardIcons/certificate.svg';
import { ReactComponent as Donate } from 'static/icons/cardIcons/donate.svg';
import { ReactComponent as Courses } from 'static/icons/cardIcons/courses.svg';
import { ReactComponent as Network } from 'static/icons/cardIcons/network.svg';
import Box from '@mui/material/Box';
import { ALUMNI_ROUTES } from 'consts/ROUTES';

import { NavigationCard } from './NavigationCard';
import styles from './styles.module.scss';

export const MainNavigation = () => (
    <Box className={styles.cardsColumn}>
        <Box className={styles.cardsRow}>
            <NavigationCard
                name="Network"
                caption="Find the people you studied with"
                icon={Network}
                to={ALUMNI_ROUTES.NETWORK}
            />
            <NavigationCard
                name="Courses"
                caption="Find and take additional studies specifically for graduates"
                icon={Courses}
                to={ALUMNI_ROUTES.COURSES}
            />
        </Box>
        <Box className={styles.cardsRow}>
            <NavigationCard
                name="Books"
                caption=" Use the university library, save and read books"
                icon={Book}
                to={ALUMNI_ROUTES.BOOKS}
            />
            <NavigationCard
                name="Certificates"
                caption="  Download your study certificates and documents about university"
                icon={Certificate}
                to={ALUMNI_ROUTES.CERTIFICATES}
            />
        </Box>
        <Box className={styles.cardsRow}>
            <NavigationCard
                name="Pass"
                caption="Get a pass to the university and come visit"
                icon={Pass}
                to={ALUMNI_ROUTES.PASS}
            />
            <NavigationCard
                name="Donations"
                caption="Support your alma mater"
                icon={Donate}
                to={ALUMNI_ROUTES.DONATIONS}
            />
        </Box>
    </Box>
);
