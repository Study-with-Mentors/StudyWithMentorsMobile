import {Field} from './field';
import {User} from './user';
import {Image} from './image';

export type Course = {
    id: string;
    shortName: string;
    fullName: string;
    description: string;
    learningOutcome: string;
    status: CourseStatus;
    courseLevel: CourseLevel;
    intendedLearner: CourseIntendedLearner;
    field: Partial<Field>;
    mentor: Partial<User>;
    images: Image;
};

export enum CourseStatus {
    ENALBE = 'ENABLE',
    DRAFTING = 'DRAFTING',
    OPEN = 'OPEN',
    CLOSE = 'CLOSE',
    DISABLE = 'DISABLE',
}

export enum CourseLevel {}

export enum CourseIntendedLearner {
    STUDENT = 'STUDENT',
    FULLTIME = 'FULLTIME',
    PARTTIME = 'PARTTIME',
    COLLEGE = 'COLLEGE',
}
