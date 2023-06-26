import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SessionList from '../../../components/session-list/session-list';
import ToolbarCustom from '../../../components/toolbar/toolbar-custom';

const SessionDetailScreen = ({route}: NativeStackScreenProps<any>) => {
    const courseId = route.params.courseId;
    if (courseId == null) {
        return <Text>Course not found</Text>;
    }
    return (
        <View style={{flex: 1}}>
            <ToolbarCustom title="Session Detail" isBackButton={true} />
            <ScrollView>
                <SessionList courseId={courseId} />
            </ScrollView>
        </View>
    );
};

export default SessionDetailScreen;
