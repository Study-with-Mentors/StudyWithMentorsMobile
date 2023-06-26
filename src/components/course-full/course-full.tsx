import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Course} from '../../types/course';
import Line from '../line/line';
import {CourseAPI} from '../../api/course-api';
import {Session} from '../../types/session';
import {SessionAPI} from '../../api/session-api';
import ButtonCustom from '../button-custom/button-custom';
import globalStyles from '../../styles/style';
import {useNavigation} from '@react-navigation/native';
import LoadingIndicator from '../loading-indicator/loading-indicator';

const styles = StyleSheet.create({
    courseCompactContainer: {
        ...globalStyles.courseCompactContainer,
        width: '100%',
        padding: 10,
    },

    image: {
        width: '100%',
        height: 200,
    },
});

const CourseFull = ({courseId}: {courseId: string}) => {
    const [course, setCourse] = useState<Partial<Course>>();
    const [sessions, setSessions] = useState<Partial<Session>[]>();
    const navigation = useNavigation();
    // TODO: API call error handler
    useEffect(() => {
        CourseAPI.getById(courseId).then(response => {
            console.log(response);
            setCourse(response);
        });
        SessionAPI.getSessionByCourseID(courseId).then(response => {
            setSessions(response);
        });
        // TODO: get mentor profile by id
    }, [courseId]);
    if (course == null || sessions == null) {
        return <LoadingIndicator loadingText={'Loading course'} />;
    }

    return (
        <ScrollView
            style={globalStyles.vertical}
            contentContainerStyle={[{gap: 5, backgroundColor: 'white'}]}>
            <Image source={{uri: course.image?.url}} style={styles.image} />
            <View style={{paddingHorizontal: 20, paddingVertical: 10, gap: 10}}>
                {/*course*/}
                <Text style={globalStyles.courseName}>{course.fullName}</Text>
                <Text style={globalStyles.description}>
                    {course.description}
                </Text>
                <Line />
                <View>
                    <Text style={globalStyles.subText}>
                        {/*TODO: add an icon and number of session*/}
                        {sessions.length} sessions
                    </Text>
                    <Text style={globalStyles.subText}>
                        {/*TODO: add an icon and number of session*/}
                        TODO: INSERT NUMBER OF ENROLLMENTS
                    </Text>
                    <Text style={globalStyles.subText}>
                        {/*TODO: add an icon*/}
                        {course.courseLevel}
                    </Text>
                </View>
                <Line />
                <View>
                    <Text style={globalStyles.heading1}>What you'll learn</Text>
                    <Text style={globalStyles.text}>
                        {course.learningOutcome}
                    </Text>
                </View>
                <View>
                    <Text style={globalStyles.heading1}>Intended learner</Text>
                    <Text style={globalStyles.text}>
                        {course.intendedLearner}
                    </Text>
                </View>

                <View style={globalStyles.horizontal}>
                    <Text style={globalStyles.mentor}>
                        {course.mentor?.firstName} {course.mentor?.lastName}
                    </Text>
                    <Text style={globalStyles.subText}>
                        {' '}
                        - {course.field?.name}
                    </Text>
                </View>
                <Line />

                {/*mentor*/}
                {/*TODO: make click go to mentor detail*/}
                <View style={[globalStyles.horizontal, {gap: 25}]}>
                    <Image
                        source={{uri: 'https://reactjs.org/logo-og.png'}}
                        style={globalStyles.mentorProfile}
                    />
                    <View>
                        <Text style={globalStyles.courseName}>
                            {course.mentor?.firstName} {course.mentor?.lastName}
                        </Text>
                        <Text style={globalStyles.description}>
                            {course.mentor?.mentor?.bio}
                        </Text>
                    </View>
                </View>

                <Line />

                <Text
                    style={globalStyles.heading1}
                    onPress={() =>
                        navigation.navigate('SessionDetails', {
                            courseId: course.id,
                        })
                    }>
                    Sessions
                </Text>
                {sessions.map((s) => {
                    // TODO: add style
                    return (
                        <View style={globalStyles.sessionContainer} key={s.id}>
                            <Text style={globalStyles.sessionName}>
                                {s.sessionNum}. {s.sessionName}
                            </Text>
                            <Text style={globalStyles.sessionDescription}>
                                {s.description}
                            </Text>
                        </View>
                    );
                })}
                {/*TODO: sticky button*/}
                <ButtonCustom
                    onPress={() => {
                        console.log('enroll');
                    }}
                    title={'Enroll'}
                />
            </View>
        </ScrollView>
    );
};

export default CourseFull;
