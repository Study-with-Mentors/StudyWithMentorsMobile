export type Lesson = {
    id: string;
    lessonNum: number;
    // TODO: change time to datetime type
    startTime: string;
    endTime: string;
    location: string;
    courseName: string;
    sessionName: string;
    courseId: string;
    clazzId: string;
    sessionId: string;
};