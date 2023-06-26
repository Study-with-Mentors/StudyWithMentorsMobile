import React from 'react';
import CourseFull from '../../../components/course-full/course-full';
import {View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const CourseDetailScreen = ({route}: NativeStackScreenProps<any>) => {
    const courseId = route.params.courseId;
    if (courseId == null) {
        return (
            <View>
                <Text>Course not found</Text>
            </View>
        );
    }

    return (
        <View>
            <CourseFull courseId={courseId} />
        </View>
    );
};

export default CourseDetailScreen;
