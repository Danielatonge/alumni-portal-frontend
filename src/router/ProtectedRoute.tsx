import { Navigate, useLocation } from 'react-router-dom';

import { APP_ROUTES } from 'consts/ROUTES';
import { userProfileState } from 'state/user';
import { useRecoilValue } from 'recoil';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const user = useRecoilValue(userProfileState);
    const location = useLocation();

    const isAuthorized = user?.data?.user.email;

    if (!isAuthorized) {
        return (
            <Navigate to={APP_ROUTES.AUTH} state={{ from: location }} replace />
        );
    }

    return children;
};
