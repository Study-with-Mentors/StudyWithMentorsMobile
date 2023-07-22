import http, {getAccessToken, toQueryParams} from '../utils/http';

export type DateTimeFilter = {
    lowerTime: Date;
    upperTime: Date;
};

export const ClassAPI = {
    getClassByUserToken: async () => {
        const res = await http.get('me/students/classes', {
            headers: {
                Authorization: 'Bearer ' + (await getAccessToken()),
            },
        });
        return res?.data;
    },
    getClassByCourse: async (courseId: string) => {
        const res = await http.get(`/courses/${courseId}/classes`);
        return res?.data;
    },
    getClassById: async (clazzId: string) => {
        const res = await http.get(`/classes/${clazzId}`);
        return res?.data;
    },
    getLessonByUserToken: async (params: DateTimeFilter) => {
        const res = await http.get(
            `/me/student/lessons${toQueryParams(params)}`,
            {
                headers: {
                    Authorization: 'Bearer ' + (await getAccessToken()),
                },
            },
        );
        return res?.data;
    },
};
