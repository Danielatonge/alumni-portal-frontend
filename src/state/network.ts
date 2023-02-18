import { selector } from 'recoil';
import api from 'api';

export const alumniNetworkState = selector({
    key: 'network',
    get: async () => {
        const { response, error } = await api.network.getNetwork();
        return { data: response, error };
    },
});
