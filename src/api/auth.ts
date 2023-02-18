import Cookies from 'universal-cookie';
import axios from './axios';
import { API_ALUMNI_ROUTES } from './API_ROUTES';

const cookies = new Cookies();

type RegisterResponse = {
    user: {
        name: string;
        email: string;
        id: number;
    };
};

export type Response = Promise<{
    response?: RegisterResponse;
    error?: any;
}>;

type RequestParams = {
    email: string;
    password: string;
};

const register = (params: RequestParams): Promise<any> =>
    axios
        .post(API_ALUMNI_ROUTES.REGISTER, params)
        .then(({ data, headers }: any) => {
            const { access_token } = headers;
            if (access_token) {
                cookies.set('access_token', access_token);
            }
            return { response: data };
        })
        .catch((error: Error) => ({ error }));

const login = (params: RequestParams): Promise<any> =>
    axios
        .post(API_ALUMNI_ROUTES.LOGIN, params)
        .then(({ data, headers }: any) => {
            const { access_token } = headers;
            if (access_token) {
                cookies.set('access_token', access_token);
            }
            return { response: data };
        })
        .catch((error: Error) => ({ error }));

const auth = { register, login };

export default auth;
