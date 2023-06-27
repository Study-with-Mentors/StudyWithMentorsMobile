export type Clazz = {
    // TODO: change to date
    id: string;
    startDate: string;
    endDate: string;
    enrollmentEndDate: string;
    price: number;
    courseId: string;
    status: ClazzStatus;
};

export enum ClazzStatus {
    OPEN = 'OPEN',
    CLOSE = 'CLOSE',
    IN_PROGRESS = 'IN_PROGRESS',
    CANCEL = 'CANCEL',
    FINISHED = 'FINISHED',
}
