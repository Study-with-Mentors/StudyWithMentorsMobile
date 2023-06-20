import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import styles from '../../../../style';
import {
    Course,
    CourseIntendedLearner,
    CourseLevel,
    CourseStatus,
} from '../../../../types/course';
import {Field} from '../../../../types/field';
import {User} from '../../../../types/user';
import CourseFull from '../../../../components/course-full/course-full';
import CourseCompact from '../../../../components/course-compact/course-compact';
import MentorCompact from '../../../../components/mentor-compact/mentor-compact';

const HomeScreen = () => {
    let field: Partial<Field> = {
        name: 'Computer Science',
        code: 'CS',
        description: 'A beginning introduction to know everything about CS',
    };

    let user: Partial<User> = {
        firstName: 'Duy',
        lastName: 'Nguyen',
    };

    let course: Partial<Course> = {
        fullName: 'Introduction to Computer science: A very easy course',
        shortName: 'Computer science',
        intendedLearner: CourseIntendedLearner.COLLEGE,
        learningOutcome: 'Fully understand CS',
        courseLevel: CourseLevel.ADVANCE,
        status: CourseStatus.OPEN,
        field: field,
        description:
            'A full course to understand everything about computer science',
        mentor: user,
    };

    let mentor: Partial<User> = {
        firstName: 'Mentor',
        lastName: 'Last',
        mentor: {
            bio: 'Something about this mentor makes me very interested',
        },
    };

    return (
        <View style={[styles.topView, {gap: 10}]}>
            {/*<CourseFull course={course} />*/}
            <Text style={[styles.heading1, {marginLeft: 5}]}>
                Popular course
            </Text>
            <ScrollView
                horizontal={true}
                contentContainerStyle={{
                    flexGrow: 1,
                }}
                style={{width: '100%'}}>
                <CourseCompact course={course} />
                <CourseCompact course={course} />
                <CourseCompact course={course} />
                <CourseCompact course={course} />
            </ScrollView>
            <Text style={[styles.heading1, {marginLeft: 5}]}>
                Popular mentor
            </Text>
            <ScrollView
                horizontal={true}
                contentContainerStyle={{
                    flexGrow: 1,
                }}
                style={{width: '100%'}}>
                <MentorCompact mentor={mentor} />
                <MentorCompact mentor={mentor} />
                <MentorCompact mentor={mentor} />
                <MentorCompact mentor={mentor} />
            </ScrollView>
        </View>
    );
};

export default HomeScreen;
