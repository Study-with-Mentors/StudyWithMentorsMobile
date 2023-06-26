import http, {getAccessToken} from '../utils/http';
import {SessionType} from '../types/enum';

export type CreateSessionParams = {
    sessionNum: number;
    sessionName: string;
    type: SessionType;
    description: string;
    resource: string;
    courseId: string;
    activities: string[];
};

export const SessionAPI = {
    getSessionByCourseID: async (courseID: string) => {
        try {
            const res = await http.get(`/session/course/${courseID}`);
            return res.data;
        } catch (error) {
            throw error;
        }
    },

    createSession: async (params: CreateSessionParams) => {
        try {
            const res = await http.post('/session', params, {
                headers: {
                    Authorization:
                        'Bearer ' + getAccessToken()
                },
            });
            return res.data;
        } catch (error) {
            throw error;
        }
    },
};
