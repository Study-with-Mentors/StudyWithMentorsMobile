import React, {useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import ToolbarCustom from '../../../components/toolbar/toolbar-custom';
import {Lesson} from '../../../types/lesson';
import {GetLessonByDateParams, LessionAPI} from '../../../api/lesson-api';
import LoadingIndicator from '../../../components/loading-indicator/loading-indicator';
import {AppContext} from '../../screen-stack';

const CalendarScreen = () => {
    const [lesssons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(false);
    const {auth} = useContext(AppContext);
    useEffect(() => {
        setLoading(true);
        LessionAPI.getLessonByDate(
            {
                upperTime: '2023-12-31 23:00:00',
                lowerTime: '2022-01-01 00:00:00',
            } as GetLessonByDateParams,
            auth,
        )
            .then(response => {
                setLessons(response);
            })
            .catch(error => console.log(error.response))
            .finally(() => setLoading(false));
    }, [auth]);
    // FIXME: for some reason, lessonApi not working
    return (
        <View style={{flex: 1}}>
            <ToolbarCustom title={'Calendar'} />
            {loading ? (
                <LoadingIndicator loadingText={'Loading calendar'} />
            ) : (
                <View>
                    <Text>{lesssons.length}</Text>
                    <Text>Hllsdfasda</Text>
                </View>
            )}
        </View>
    );
};

export default CalendarScreen;
