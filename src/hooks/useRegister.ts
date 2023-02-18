import api from '../api';

type UseRegisterType = (
    errorHandler: (error: { response: { data: { message: string } } }) => void,
    authCallback: (response: any) => void,
) => {
    submit: (form: { email: string; password: string }) => void;
};

export const useRegister: UseRegisterType = (
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
            const { response, error } = await api.auth.register({
                email,
                password,
            });
            if (error) {
                errorCallback(error);
            }
            if (response.success) successFallback(response);
        }
    };

    return { submit };
};
