import { ReactComponent as Book } from 'static/icons/leftMenuIcons/books.svg';
import { ReactComponent as Pass } from 'static/icons/leftMenuIcons/pass.svg';
import { ReactComponent as Certificate } from 'static/icons/leftMenuIcons/certificate.svg';
import { ReactComponent as Donate } from 'static/icons/leftMenuIcons/donation.svg';
import { ReactComponent as Courses } from 'static/icons/leftMenuIcons/courses.svg';
import { ReactComponent as Network } from 'static/icons/leftMenuIcons/personaldata.svg';

import { ALUMNI_ROUTES, ADMIN_ROUTES, APP_ROUTES } from 'consts/ROUTES';

export const alumniTabs = [
    { name: 'Personal data', Icon: Network, to: APP_ROUTES.PROFILE },
    { name: 'Booked courses', Icon: Courses, to: ALUMNI_ROUTES.MY_COURSES },
    { name: 'Your certificates', Icon: Certificate, to: '/certificates' },
    { name: 'Pass', Icon: Pass, to: '/pass' },
    { name: 'Booked books', Icon: Book, to: '/books' },
    { name: 'Donations', Icon: Donate, to: 'donations' },
];

export const adminTabs = [
    { name: 'Personal data', Icon: Network, to: APP_ROUTES.PROFILE },
    { name: 'Manage courses', Icon: Courses, to: ADMIN_ROUTES.COURSES },
];
