import React from 'react';
import CourseFull from '../../../components/course-full/course-full';
import {View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ToolbarCustom from '../../../components/toolbar/toolbar-custom';

const CourseDetailScreen = ({route}: NativeStackScreenProps<any>) => {
    const courseId = route.params.courseId;
    if (courseId == null) {
        return (
            <View>
                <ToolbarCustom title={'Course Detail'} isBackButton={true} />
                <Text>Course not found</Text>
            </View>
        );
    }

    return (
        <View style={{flex: 1}}>
            <ToolbarCustom title={'Course Detail'} isBackButton={true} />
            <CourseFull courseId={courseId} />
        </View>
    );
};

export default CourseDetailScreen;
