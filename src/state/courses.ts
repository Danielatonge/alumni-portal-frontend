import { selector, useSetRecoilState, atom } from 'recoil';
import api from 'api';

const allCoursesStateIdState = atom({
    key: 'allCoursesTagsStateIdState',
    default: 0,
});

export const addCourseDialogState = atom<{
    open: boolean;
    type: 'ADD' | 'EDIT';
    course?: any;
}>({
    key: 'addCourseDialogOpenState',
    default: { open: false, type: 'ADD', course: {} },
});

export const allCoursesState = selector({
    key: 'allCourses',
    get: async ({ get }) => {
        get(allCoursesStateIdState);
        const { response, error } = await api.courses.getAllCourses();
        return { data: response, error };
    },
});

export const allCoursesWithRequestsState = selector({
    key: 'allCoursesWithRequests',
    get: async ({ get }) => {
        get(allCoursesStateIdState);
        const { response, error } =
            await api.courses.getAllCoursesWithRequests();
        return { data: response, error };
    },
});

export function useRefreshCoursesStateIdState() {
    const setUserInfoQueryRequestID = useSetRecoilState(allCoursesStateIdState);
    return () => {
        setUserInfoQueryRequestID(requestID => requestID + 1);
    };
}

export const allCoursesTagsState = selector({
    key: 'allCoursesTags',
    get: async () => {
        const { response, error } = await api.courses.getAllCoursesTags();
        return { data: response, error };
    },
});

export const allMyCoursesState = selector({
    key: 'allMyCourses',
    get: async () => {
        const { response, error } = await api.courses.getMyCourses();
        return { data: response, error };
    },
});
