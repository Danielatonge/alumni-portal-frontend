import api from '../api';

type UseRegisterType = (
    errorHandler: (error: { message: string }) => void,
    authCallback: (response: any) => void,
) => {
    submit: (form: { email: string; password: string }) => void;
};

export const useAuthenticate: UseRegisterType = (
    errorCallback,
    successFallback,
) => {
    const submit = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => {
        if (email && password) {
            const { response, error } = await api.auth.login({
                email,
                password,
            });
            if (error) {
                errorCallback(error);
            } else if (response?.id && response?.email)
                successFallback(response);
        } else {
            errorCallback({ message: 'Missing email or Password' });
        }
    };

    return { submit };
};
