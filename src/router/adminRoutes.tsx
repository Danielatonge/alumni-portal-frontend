import { Route } from 'react-router-dom';
import { APP_ROUTES, ADMIN_ROUTES } from 'consts/ROUTES';
import { Courses } from 'pages/Admin/Courses/Courses';
import { AllAvailableCourses } from 'pages/Admin/Courses/AllCourses';
import { ProfilePage } from 'pages/Common/Profile/Profile';

export const adminRoutes = (
    <>
        <Route path={APP_ROUTES.MAIN} element={<div />} />
        <Route path={ADMIN_ROUTES.COURSES} element={<Courses />}>
            <Route index element={<AllAvailableCourses />} />
        </Route>
        <Route path={APP_ROUTES.PROFILE} element={<ProfilePage />} />
    </>
);
