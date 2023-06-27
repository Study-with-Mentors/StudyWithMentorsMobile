import {Field} from './field';
import {Image} from "./image";

export type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    birthdate: Date;
    profileImage: Image;
    gender: Gender;
    student: Partial<Student>;
    mentor: Partial<Mentor>;
};

export type Student = {
    year: number;
    bio: string;
    experience: string;
    education: Education;
};

export type Mentor = {
    bio: string;
    degree: Education;
    field: Field;
};

export enum Gender {
    NONE = 'NONE',
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}

export enum Education {
    NONE = 'NONE',
    HIGH_SCHOOL = 'HIGH_SCHOOL',
    COLLEGE = 'COLLEGE',
    BACHELOR = 'BACHELOR',
    MASTER = 'MASTER',
    PROFESSOR = 'PROFESSOR',
}
