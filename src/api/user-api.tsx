import {Gender} from '../types/user';
import http, {getAccessToken} from '../utils/http';
export type LoginProps = {
    email: string;
    password: string;
};

export type SignUpProps = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    gender: string;
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
    signUp: async (signUpProps: SignUpProps) => {
        try {
            const res = await http.post('/signup', signUpProps);
            return res?.data;
        } catch (err: any) {
            throw err;
        }
    },
    loginGoogle: async (googleToken: string) => {
        try {
            console.log(googleToken);
            const res = await http.post('/login/google', googleToken, {
                headers: {
                    'Content-Type': 'text/plain',
                },
            });
            return res?.data;
        } catch (err: any) {
            throw err;
        }
    },
    getByUserToken: async () => {
        const res = await http.get('/me', {
            headers: {
                Authorization: 'Bearer ' + (await getAccessToken()),
            },
        });
        return res?.data;
    },
    // getById: async (id: string) => {
    //     const res = await http.get(`/user/profile/${id}`);
    //     return res?.data;
    // },
    getMentorProfileById: async (id: string) => {
        const res = await http.get(`/mentors/${id}`);
        return res?.data;
    },
    getMentorList: async () => {
        const res = await http.get('/mentors');
        return res?.data;
    },
    // uploadImageProfile: async (params: UploadImageProfileProps) => {
    //     const res = await http.put('/user/profile', params, {
    //         headers: {
    //             Authorization: 'Bearer ' + getAccessToken(),
    //         },
    //     });
    //     return res?.data;
    // },
    updateUser: async (params: UpdateUserParams) => {
        const res = await http.put('me', params, {
            headers: {
                Authorization: 'Bearer ' + (await getAccessToken()),
            },
        });
        return res?.data;
    },
    // updateUserProfileStudent: async (
    //     params: UpdateUserProfileStudentParams,
    // ) => {
    //     const res = await http.put('/user/profile/student', params, {
    //         headers: {
    //             Authorization: 'Bearer ' + getAccessToken(),
    //         },
    //     });
    //     return res?.data;
    // },
    // updateUserProfileMentor: async (params: UpdateUserProfileStudentParams) => {
    //     const res = await http.put('/user/profile/student', params, {
    //         headers: {
    //             Authorization: 'Bearer ' + getAccessToken(),
    //         },
    //     });
    //     return res?.data;
    // },
    updateNotificationToken: async (params: {token: string}) => {
        const res = await http.put('/notification/token', params, {
            headers: {
                Authorization: 'Bearer ' + (await getAccessToken()),
            },
        });
        return res?.data;
    },
    deleteNotificationToken: async () => {
        const res = await http.delete('/notification/token', {
            headers: {
                Authorization: 'Bearer ' + (await getAccessToken()),
            },
        });
        return res?.data;
    },
};
