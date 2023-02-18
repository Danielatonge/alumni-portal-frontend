import { Courses } from 'pages/Alumni/Courses/Courses';
import { MyCourses } from 'pages/Alumni/Courses/MyCourses';
import { AllCourses } from 'components/AllCourses/AllCourses';
import { MainNavigation } from 'pages/Common/Main/MainNavigation';
import { Route } from 'react-router-dom';
import { ALUMNI_ROUTES, APP_ROUTES } from 'consts/ROUTES';
import { ProfilePage } from 'pages/Common/Profile/Profile';
import { NetworkPage } from 'pages/Alumni/Network/Network';
import { CertificatesPage } from 'pages/Alumni/Certificates/Certificates';
import { DonationsPage } from 'pages/Alumni/Donations/Donations';

export const alumniRoutes = (
    <>
        <Route path={APP_ROUTES.MAIN} element={<MainNavigation />} />
        <Route path={APP_ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ALUMNI_ROUTES.NETWORK} element={<NetworkPage />} />
        <Route path={ALUMNI_ROUTES.COURSES} element={<Courses />}>
            <Route index element={<AllCourses />} />
            <Route path={ALUMNI_ROUTES.MY_COURSES} element={<MyCourses />} />
        </Route>
        <Route
            path={ALUMNI_ROUTES.BOOKS}
            element={<div>Books will be added soon, stay tuned</div>}
        />
        <Route
            path={ALUMNI_ROUTES.CERTIFICATES}
            element={<CertificatesPage />}
        />
        <Route
            path={ALUMNI_ROUTES.PASS}
            element={<div>Pass will be added soon, stay tuned</div>}
        />
        <Route path={ALUMNI_ROUTES.DONATIONS} element={<DonationsPage />} />
    </>
);
