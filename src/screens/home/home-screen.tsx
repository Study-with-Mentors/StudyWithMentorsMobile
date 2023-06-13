import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import styles from '../../style';
import {Course, CourseIntendedLearner} from '../../types/course';
import CourseCompact from '../../components/course-compact/course-compact';
import {Field} from '../../types/field';
import {User} from '../../types/user';
import CourseFull from "../../components/course-full/course-full";

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
        field: field,
        description:
            'A full course to understand everything about computer science',
        mentor: user,
    };
    return (
        <View style={[styles.topView, {margin: 5, gap: 10}]}>
            <CourseFull course={course}/>
            {/*<Text style={styles.heading1}>Upcoming course</Text>*/}
            {/*<ScrollView style={{width: '100%', height: '50%'}}>*/}
            {/*    <CourseCompact course={course} />*/}
            {/*    <CourseCompact course={course} />*/}
            {/*    <CourseCompact course={course} />*/}
            {/*    <CourseCompact course={course} />*/}
            {/*    <CourseCompact course={course} />*/}
            {/*    <CourseCompact course={course} />*/}
            {/*    <CourseCompact course={course} />*/}
            {/*</ScrollView>*/}
            {/*<Text>Something in between</Text>*/}
            {/*<ScrollView style={{width: '100%', height: '50%'}}>*/}
            {/*    <CourseCompact course={course} />*/}
            {/*    <CourseCompact course={course} />*/}
            {/*    <CourseCompact course={course} />*/}
            {/*    <CourseCompact course={course} />*/}
            {/*    <CourseCompact course={course} />*/}
            {/*    <CourseCompact course={course} />*/}
            {/*    <CourseCompact course={course} />*/}
            {/*</ScrollView>*/}
        </View>
    );
};

export default HomeScreen;
