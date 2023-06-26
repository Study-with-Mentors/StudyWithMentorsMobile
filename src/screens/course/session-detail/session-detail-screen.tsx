import React from 'react';
import {Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SessionList from '../../../components/session-list/session-list';

const SessionDetailScreen = ({route}: NativeStackScreenProps<any>) => {
    const courseId = route.params.courseId;
    if (courseId == null) {
        return <Text>Course not found</Text>;
    }
    return (
        <View>
            <SessionList courseId={courseId} />
        </View>
    );
};

export default SessionDetailScreen;
