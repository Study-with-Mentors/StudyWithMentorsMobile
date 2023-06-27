import {Gender} from '../types/user';
import http, {getAccessToken} from '../utils/http';
export type LoginProps = {
    email: string;
    password: string;
};

export type UploadImageProfileProps = {
    profileImage: string;
};

export type UpdateUserParams = {
    id?: string;
    version?: number;
    email?: string;
    firstName: string;
    lastName: string;
    birthdate: Date;
    gender: Gender;
};

export type UpdateUserProfileStudentParams = {
    id?: string;
    version?: number;
    year: number;
    bio: string;
    experience: string;
    education: string;
};

export type UpdateUserProfileMentorParams = {
    id?: string;
    version?: number;
    bio?: string;
    degree?: string;
    fieldId?: string;
};

export const UserAPI = {
    login: async (loginProps: LoginProps) => {
        try {
            const res = await http.post('/login', loginProps);
            return res?.data;
        } catch (err: any) {
            throw err;
        }
    },
    getByUserToken: async () => {
        const res = await http.get('/user/profile', {
            headers: {
                Authorization: 'Bearer ' + getAccessToken(),
            },
        });
        return res?.data;
    },
    getById: async (id: string) => {
        const res = await http.get(`/user/profile/${id}`);
        return res?.data;
    },
    getMentorProfileById: async (id: string) => {
        const res = await http.get(`/mentor/${id}`);
        return res?.data;
    },
    getMentorList: async () => {
        const res = await http.get('/mentor');
        return res?.data;
    },
    uploadImageProfile: async (params: UploadImageProfileProps) => {
        const res = await http.put('/user/profile', params, {
            headers: {
                Authorization: 'Bearer ' + getAccessToken(),
            },
        });
        return res?.data;
    },
    updateUser: async (params: UpdateUserParams) => {
        const res = await http.put('/user/profile', params, {
            headers: {
                Authorization: 'Bearer ' + getAccessToken(),
            },
        });
        return res?.data;
    },
    updateUserProfileStudent: async (
        params: UpdateUserProfileStudentParams,
    ) => {
        const res = await http.put('/user/profile/student', params, {
            headers: {
                Authorization: 'Bearer ' + getAccessToken(),
            },
        });
        return res?.data;
    },
    updateUserProfileMentor: async (params: UpdateUserProfileStudentParams) => {
        const res = await http.put('/user/profile/student', params, {
            headers: {
                Authorization: 'Bearer ' + getAccessToken(),
            },
        });
        return res?.data;
    },
};