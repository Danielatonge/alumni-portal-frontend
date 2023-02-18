import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { userProfileState } from 'state/user';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const CompleteAuth = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('access_token');
    const refresh = useRecoilRefresher_UNSTABLE(userProfileState);

    useEffect(() => {
        if (token) {
            cookies.set('access_token', token);
            refresh();
            navigate('/');
        } else {
            navigate('/auth');
        }
    }, [token]);
    return null;
};
