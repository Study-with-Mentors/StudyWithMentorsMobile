import http, {getAccessToken, toQueryParams} from '../utils/http';

export type DateTimeFilter = {
    lowerTime: Date;
    upperTime: Date;
};

export const ClassAPI = {
    getClassByUserToken: async () => {
        const res = await http.get('/student/clazz', {
            headers: {
                Authorization: 'Bearer ' + (await getAccessToken()),
            },
        });
        return res?.data;
    },
    getClassByCourse: async (courseId: string) => {
        const res = await http.get(`/course/${courseId}/clazz`, {
            headers: {
                Authorization: 'Bearer ' + (await getAccessToken()),
            },
        });
        return res?.data;
    },
    getClassById: async (clazzId: string) => {
        const res = await http.get(`/clazz/${clazzId}`, {
            headers: {
                Authorization: 'Bearer ' + (await getAccessToken()),
            },
        });
        return res?.data;
    },
    getLessonByUserToken: async (params: DateTimeFilter) => {
        const res = await http.get(`/student/lesson${toQueryParams(params)}`, {
            headers: {
                Authorization: 'Bearer ' + (await getAccessToken()),
            },
        });
        return res?.data;
    },
};
