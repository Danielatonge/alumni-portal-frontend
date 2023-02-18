import { selector } from 'recoil';
import api from 'api';

export const userProfileState = selector({
    key: 'userProfile',
    get: async () => {
        const { response, error } = await api.user.getUserDetails();
        return { data: response, error };
    },
});

export const userRoleState = selector({
    key: 'userRole',
    get: ({ get }) => {
        const { data } = get(userProfileState);
        const role = data?.user?.role;
        return role || null;
    },
});
