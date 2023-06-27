import http, {getAccessToken, toQueryParams} from '../utils/http';

export type CreateCourseParams = {
    shortName: string;
    fullName: string;
    description: string;
    learningOutcome: string;
    status: string;
    courseLevel: string;
    intendedLearner: string;
    fieldId: string;
};

type Direction = {
    ASC: 'ASC';
    DES: 'DES';
};

export type SearchCourseParams = {
    orderBy?: string;
    name?: string;
    level?: string;
    mentorId?: string;
    page?: string;
    field?: string[];
    learner?: string;
    dir?: string;
};

export const CourseAPI = {
    getAll: async (searchCourseParams: SearchCourseParams) => {
        try {
            var url;
            if (Object.keys(searchCourseParams).length == 0) {
                url = '/course';
            } else {
                url = `/course?${toQueryParams(searchCourseParams).toString()}`;
            }

            const res = await http.get(url);
            return res.data;
        } catch (error) {
            throw error;
        }
    },
    getById: async (id: string) => {
        try {
            const res = await http.get(`/course/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + getAccessToken(),
                },
            });
            return res.data;
        } catch (error) {
            throw error;
        }
    },
};
