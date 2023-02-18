import axios from './axios';
import { API_ALUMNI_ROUTES } from './API_ROUTES';

export const getOpenIdaAuthorizationUrl = (): Promise<any> =>
    axios
        .get(API_ALUMNI_ROUTES.AUTHORIZATION_URL)
        .then(({ data }: any) => ({
            data,
        }))
        .catch((error: Error) => ({ error }));

const sso = { getOpenIdaAuthorizationUrl };

export default sso;
