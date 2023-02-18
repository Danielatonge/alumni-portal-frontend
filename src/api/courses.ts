import { AxiosError } from 'axios';
import axios from './axios';
import { API_ALUMNI_ROUTES } from './API_ROUTES';

type ServerError = { message: string };
export type Response<R> = Promise<{
    response?: R;
    error?: AxiosError<ServerError>;
}>;

type Tag = {
    id: number;
    name: string;
};

type Course = {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    slotsAvailable: number;
    slotsOccupied: number;
    tags: Array<string>;
    teachers: Array<string>;
};

type Tags = {
    tags: Array<Tag>;
};

type Courses = {
    courses: Array<Course>;
};

type ApplyForCourseRequestParams = { courseId: string };

type AddNewTagParams = { name: string };

export const getAllCoursesWithRequests = (): Response<Courses> =>
    axios
        .get(API_ALUMNI_ROUTES.COURSES_WITH_REQUESTS)
        .then(({ data }: any) => ({
            response: data,
        }))
        .catch(error => ({ error }));

export const getAllCourses = (): Response<Courses> =>
    axios
        .get(API_ALUMNI_ROUTES.COURSES)
        .then(({ data }: any) => ({
            response: data,
        }))
        .catch(error => ({ error }));

export const getAllCoursesTags = (): Response<Tags> =>
    axios
        .get(API_ALUMNI_ROUTES.TAGS)
        .then(({ data }: any) => ({
            response: data,
        }))
        .catch(error => ({ error }));

export const addNewTag = (params: AddNewTagParams): Response<Tags> =>
    axios
        .post(API_ALUMNI_ROUTES.TAGS, params)
        .then(({ data }: any) => ({
            response: data,
        }))
        .catch(error => ({ error }));

export const deleteTag = ({ id }: { id: number }): Response<any> =>
    axios
        .delete(`${API_ALUMNI_ROUTES.TAGS}/${id}`)
        .then(({ data }: any) => ({
            response: data,
        }))
        .catch(error => ({ error }));

export const applyForCourse = (
    params: ApplyForCourseRequestParams,
): Response<{ success: true }> =>
    axios
        .post(API_ALUMNI_ROUTES.COURSE_APPLY, params)
        .then(({ data }: any) => ({
            response: data,
        }))
        .catch(error => ({ error }));

export const cancelCourseRequest = (
    params: ApplyForCourseRequestParams,
): Response<{ success: true }> =>
    axios
        .post(API_ALUMNI_ROUTES.CANCEL_COURSE_REQUEST, params)
        .then(({ data }: any) => ({
            response: data,
        }))
        .catch(error => ({ error }));

export const getMyCourses = (): Response<any> =>
    axios
        .get(API_ALUMNI_ROUTES.USER_COURSES)
        .then(({ data }: any) => ({
            response: data,
        }))
        .catch(error => ({ error }));

export const createCourse = (params: any): Response<any> =>
    axios
        .post(API_ALUMNI_ROUTES.COURSES, params)
        .then(({ data }: any) => ({
            response: data,
        }))
        .catch(error => ({ error }));

export const updateCourse = (id: number, course: any): Response<any> =>
    axios
        .patch(`${API_ALUMNI_ROUTES.COURSES}/${id}`, course)
        .then(({ data }: any) => ({
            response: data,
        }))
        .catch(error => ({ error }));

export const deleteCourse = ({ id }: { id: number }): Response<any> =>
    axios
        .delete(`${API_ALUMNI_ROUTES.COURSES}/${id}`)
        .then(({ data }: any) => ({
            response: data,
        }))
        .catch(error => ({ error }));

export const updateCourseRequestStatus = (params: {
    requestIds: Array<number>;
    status: 'PENDING' | 'CONFIRMED' | 'REJECTED';
}): Response<any> =>
    axios
        .patch(API_ALUMNI_ROUTES.UPDATE_REQUEST_STATUS, params)
        .then(({ data }: any) => ({
            response: data,
        }))
        .catch(error => ({ error }));

const courses = {
    getAllCourses,
    getAllCoursesTags,
    applyForCourse,
    cancelCourseRequest,
    getMyCourses,
    createCourse,
    deleteCourse,
    addNewTag,
    deleteTag,
    getAllCoursesWithRequests,
    updateCourse,
    updateCourseRequestStatus,
};

export default courses;
