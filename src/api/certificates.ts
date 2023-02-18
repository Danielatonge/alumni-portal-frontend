import { AxiosError } from 'axios';
import axios from './axios';
import { API_ALUMNI_ROUTES } from './API_ROUTES';

type ServerError = { message: string };

type CertificateParams = {
    number: number;
    use: string;
};

export type Response<R> = Promise<{
    response?: R;
    error?: AxiosError<ServerError>;
}>;

export const createStudyCertificateRequest = (
    params: CertificateParams,
): Response<any> =>
    axios
        .post(API_ALUMNI_ROUTES.CERTIFICATE, params)
        .then(({ data }: any) => ({
            response: data,
        }))
        .catch(error => ({ error }));

export const getCertificateStatus = (): Response<any> =>
    axios
        .post(API_ALUMNI_ROUTES.CERTIFICATE_STATUS)
        .then(({ data }: any) => ({
            response: data,
        }))
        .catch(error => ({ error }));

const certificates = { createStudyCertificateRequest, getCertificateStatus };

export default certificates;
