import http, {getAccessToken, toQueryParams} from '../utils/http';

export type GetLessonByDateParams = {
    lowerTime: string;
    upperTime: string;
};

export const LessionAPI = {
    getLessonByDate: async (params: GetLessonByDateParams) => {
        try {
            const res = await http.get(
                `/student/lesson?${toQueryParams(params)}`,
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
};
