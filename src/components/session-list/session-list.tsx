import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {SessionAPI} from '../../api/session-api';
import globalStyles from '../../styles/style';
import {Session} from '../../types/session';
import LoadingIndicator from '../loading-indicator/loading-indicator';
import {Course} from '../../types/course';
import {CourseAPI} from '../../api/course-api';
import Line from "../line/line";

const SessionList = ({courseId}: {courseId: string}) => {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [course, setCourse] = useState<Course>({} as Course);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        SessionAPI.getSessionByCourseID(courseId)
            .then(response => {
                setSessions(response);
                setLoading(false);
            })
            .catch(error => console.error(error));
        CourseAPI.getById(courseId).then(response => {
            setCourse(response);
            setLoading(false);
        });
    }, [courseId]);

    if (loading) {
        return <LoadingIndicator loadingText={'Loading Session'} />;
    }
    return (
        <View style={{padding: 10, gap: 5}}>
            <Text style={globalStyles.heading1}>{course.fullName}</Text>
            <Text style={globalStyles.heading2}>Session Detail</Text>
            {sessions.map(s => {
                return (
                    <View style={globalStyles.sessionContainer} key={s.id}>
                        <Text style={globalStyles.sessionName}>
                            {s.sessionNum}. {s.sessionName}
                        </Text>
                        <Text style={globalStyles.sessionDescription}>
                            {s.description}
                        </Text>
                        <View style={{gap: 10}}>
                            <Text style={globalStyles.heading2}>
                                Activities
                            </Text>
                            {s.activities.map((a, activityKey) => {
                                return (
                                    <View
                                        style={globalStyles.activityContainer}
                                        key={a.id}>
                                        <Text
                                            style={globalStyles.activityTitle}>
                                            {activityKey + 1}. {a.title}
                                        </Text>
                                        <Text>{a.description}</Text>
                                    </View>
                                );
                            })}
                        </View>
                        <Line />
                    </View>
                );
            })}
        </View>
    );
};

export default SessionList;
