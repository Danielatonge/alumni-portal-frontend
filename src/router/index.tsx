import { Auth } from 'pages/Common/Auth/Auth';
import { Registration } from 'pages/Common/Registration/Registration';

import { ProtectedRoute } from 'router/ProtectedRoute';
import { APP_ROUTES } from 'consts/ROUTES';
import { Navigate, Route, useLocation, Routes } from 'react-router-dom';
import { Main } from 'pages/Common/Main/Main';
import { userRoleState } from 'state/user';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import { notificationState } from 'state/notification';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SyntheticEvent } from 'react';
import { UpdatePassword } from 'pages/Common/UpdatePassword/UpdatePassword';
import { ResetPassword } from 'pages/Common/ResetPassword/ResetPassword';
import { CompleteAuth } from 'pages/Common/CompleteAuth/CompleteAuth';
import { alumniRoutes } from './alumniRoutes';
import { adminRoutes } from './adminRoutes';

export const Router = () => {
    const location = useLocation();

    const [{ open, severity, message }, setNotificationState] =
        useRecoilState(notificationState);

    const ROLE = useRecoilValue(userRoleState);

    const handleClose = (
        event: Event | SyntheticEvent<any, Event>,
        reason: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotificationState({ open: false, severity, message });
    };

    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity={severity}>{message}</Alert>
            </Snackbar>
            <Routes>
                <Route path={APP_ROUTES.AUTH} element={<Auth />} />
                <Route path={APP_ROUTES.REGISTER} element={<Registration />} />
                <Route
                    path={APP_ROUTES.COMPLETE_AUTH}
                    element={<CompleteAuth />}
                />
                <Route
                    path={APP_ROUTES.UPDATE_PASSWORD}
                    element={<UpdatePassword />}
                />
                <Route
                    path={APP_ROUTES.RESET_PASSWORD}
                    element={<ResetPassword />}
                />
                <Route
                    path={APP_ROUTES.MAIN}
                    element={
                        <ProtectedRoute>
                            <Main />
                        </ProtectedRoute>
                    }
                >
                    {ROLE === 'ALUMNI' && alumniRoutes}
                    {ROLE === 'ADMIN' && adminRoutes}
                    <Route
                        path="*"
                        element={
                            <Navigate
                                to={APP_ROUTES.MAIN}
                                state={{ from: location }}
                                replace
                            />
                        }
                    />
                </Route>
            </Routes>
        </>
    );
};
