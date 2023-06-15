export type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    birthdate: Date;
    profileImage: string;
    gender: Gender;
};

export enum Gender {
    NONE = 'NONE',
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}
