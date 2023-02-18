import { ChangeableUserInfo, User } from 'types/user';
import { AxiosError } from 'axios';
import axios from './axios';
import { API_ALUMNI_ROUTES } from './API_ROUTES';

type ServerError = { message: string };
export type Response<R> = Promise<{
    response?: R;
    error?: AxiosError<ServerError>;
}>;

export const getUserDetails = (): Response<{ user: User }> =>
    axios
        .get(API_ALUMNI_ROUTES.PROFILE)
        .then(({ data }: any) => ({
            response: data,
        }))
        .catch(error => ({ error }));

export const updateUserDetails = (
    params: ChangeableUserInfo,
): Response<{ success: true }> =>
    axios
        .patch(API_ALUMNI_ROUTES.PROFILE, params)
        .then(({ data }: any) => ({
            response: data,
        }))
        .catch(error => ({ error }));

export const resetPassword = ({ email }: { email: string }): Response<any> =>
    axios
        .get(`${API_ALUMNI_ROUTES.RESET_PASSWORD}/?email=${email}`)
        .then(({ data }: any) => ({
            response: data,
        }))
        .catch(error => ({ error }));

export const updatePassword = ({
    password,
    token,
}: {
    password: string;
    token: string;
}): Response<any> =>
    axios
        .patch(
            API_ALUMNI_ROUTES.UPDATE_PASSWORD,
            { password },
            { headers: { Authorization: `${token}` } },
        )
        .then(({ data }: any) => ({
            response: data,
        }))
        .catch(error => ({ error }));

const user = {
    getUserDetails,
    updateUserDetails,
    resetPassword,
    updatePassword,
};

export default user;
