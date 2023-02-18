import api from 'api';
import { selector } from 'recoil';

export const studyCertificateStatusState = selector({
    key: 'studyCertificateStatus',
    get: async () => {
        const { response, error } =
            await api.certificates.getCertificateStatus();
        return { data: response, error };
    },
});
