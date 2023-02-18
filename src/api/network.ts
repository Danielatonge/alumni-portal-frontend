import { User } from 'types/user';
import axios from './axios';
import { API_ALUMNI_ROUTES } from './API_ROUTES';

export type Response<T> = Promise<{
    response?: T;
    error?: any;
}>;

const getNetwork = (): Response<{ users: Array<User> }> =>
    axios
        .get(API_ALUMNI_ROUTES.NETWORK)
        .then(({ data }: any) => ({ response: data }))
        .catch((error: Error) => ({ error }));

const network = { getNetwork };

export default network;
