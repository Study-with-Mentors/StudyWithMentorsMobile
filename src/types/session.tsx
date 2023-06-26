import {Activity} from './activity';

export type Session = {
    id: string;
    sessionNum: number;
    sessionName: string;
    type: string;
    description: string;
    resource: string;
    courseId: string;
    activities: Activity[];
};
