import http, {getAccessToken, toQueryParams} from '../utils/http';

export type GetLessonByDateParams = {
    lowerTime: string;
    upperTime: string;
};

export const LessionAPI = {
    getLessonByDate: async (params: GetLessonByDateParams) => {
        try {
            const res = await http.get(
                `me/student/lessons?${toQueryParams(params)}`,
                {
                    headers: {
                        Authorization: 'Bearer ' + (await getAccessToken()),
                    },
                },
            );
            return res.data;
        } catch (error) {
            throw error;
        }
    },
    getLessonByClass: async (clazzId: string) => {
        try {
            const res = await http.get(`/classes/${clazzId}/lessons`);
            return res.data;
        } catch (error) {
            throw error;
        }
    },
};
