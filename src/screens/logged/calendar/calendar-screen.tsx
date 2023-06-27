import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import ToolbarCustom from '../../../components/toolbar/toolbar-custom';
import {Lesson} from '../../../types/lesson';
import {GetLessonByDateParams, LessionAPI} from '../../../api/lesson-api';
import LoadingIndicator from '../../../components/loading-indicator/loading-indicator';

const CalendarScreen = () => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        LessionAPI.getLessonByDate({
            upperTime: '2023-12-31 23:00:00',
            lowerTime: '2022-01-01 00:00:00',
        } as GetLessonByDateParams)
            .then(response => {
                setLessons(response);
            })
            .catch(error => console.log(error.response))
            .finally(() => setLoading(false));
    }, []);
    return (
        <View style={{flex: 1}}>
            <ToolbarCustom title={'Calendar'} />
            {loading ? (
                <LoadingIndicator loadingText={'Loading calendar'} />
            ) : (
                <View>
                    {lessons.map(lesson => {
                        return (
                            <View>
                                <Text>{lesson.courseName}</Text>
                                <Text>{lesson.lessonNum}. {lesson.sessionName}</Text>
                            </View>
                        );
                    })}
                </View>
            )}
        </View>
    );
};

export default CalendarScreen;
