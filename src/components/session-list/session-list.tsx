import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {SessionAPI} from '../../api/session-api';
import globalStyles from '../../styles/style';
import {Session} from '../../types/session';

const SessionList = ({courseId}: {courseId: string}) => {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        SessionAPI.getSessionByCourseID(courseId)
            .then(response => {
                setSessions(response);
                setLoading(false);
            })
            .catch(error => console.error(error));
    }, [courseId]);
    return (
        <View>
            <Text>Session Detail</Text>
            {loading ? (
                <Text>Loading</Text>
            ) : (
                sessions.map(s => {
                    // TODO: add style
                    return (
                        <View style={globalStyles.sessionContainer} key={s.id}>
                            <Text style={globalStyles.sessionName}>
                                {s.sessionNum}. {s.sessionName}
                            </Text>
                            <Text style={globalStyles.sessionDescription}>
                                {s.description}
                            </Text>
                            <View>
                                <Text>Activities</Text>
                                {s.activities.map((a, activityKey) => {
                                    return (
                                        <View key={a.id}>
                                            <Text>
                                                {activityKey + 1}. {a.title}
                                            </Text>
                                            <Text>{a.description}</Text>
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    );
                })
            )}
        </View>
    );
};

export default SessionList;
