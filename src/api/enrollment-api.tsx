import http, {getAccessToken} from "../utils/http";

export type EnrollmentParams = {
    classId: string;
    paymentType?: string;
};

export const EnrollmentApi = {
    createEnrollment: async (enrollmentParams: EnrollmentParams) => {
        try {
            enrollmentParams.paymentType = 'VNPAY';
            const res = await http.post('/enrollment', enrollmentParams, {
                headers: {
                    Authorization: 'Bearer ' + (await getAccessToken()),
                },
            });
            return res?.data;
        } catch (error) {
            throw error;
        }
    },
};
