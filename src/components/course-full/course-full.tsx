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
import {User} from '../../types/user';
import {UserAPI} from '../../api/user-api';

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
    const [mentorProfile, setMentorProfile] = useState<User>();
    const navigation = useNavigation();
    // TODO: API call error handler
    useEffect(() => {
        CourseAPI.getById(courseId)
            .then(response => {
                setCourse(response);
            })
            .catch(error => console.log(error.response));
        SessionAPI.getSessionByCourseID(courseId).then(response => {
            setSessions(response);
        }).catch(error => console.log(error.response));
    }, [courseId]);
    useEffect(() => {
        if (course?.mentor?.id != null) {
            UserAPI.getMentorProfileById(course.mentor.id).then(response =>
                setMentorProfile(response),
            );
        }
    }, [course]);
    if (course == null || sessions == null) {
        return <LoadingIndicator loadingText={'Loading course'} />;
    }

    return (
        <ScrollView
            style={globalStyles.vertical}
            contentContainerStyle={[{gap: 5, backgroundColor: 'white'}]}>
            <View style={globalStyles.shadowBottom}>
                <Image source={{uri: course.image?.url}} style={styles.image} />
            </View>
            <View style={{paddingHorizontal: 20, paddingVertical: 10, gap: 10}}>
                {/*course*/}
                <View style={{marginBottom: 5}}>
                    <Text style={[globalStyles.courseName, {fontSize: 22}]}>
                        {course.fullName}
                    </Text>
                    <Text style={globalStyles.description}>
                        {course.description}
                    </Text>
                </View>
                <Line />
                <View style={{paddingLeft: 20, gap: 10}}>
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

                <Line />

                {/*mentor*/}
                <View style={[globalStyles.horizontal, {gap: 25}]}>
                    <Image
                        source={{uri: course.mentor?.profileImage?.url}}
                        style={globalStyles.mentorProfile}
                    />
                    <View>
                        <Text
                            style={globalStyles.courseName}
                            onPress={() => {
                                navigation.navigate('CourseDetailStack', {
                                    screen: 'MentorDetail',
                                    params: {
                                        mentorId: course.mentor?.id,
                                        mentor: course.mentor,
                                    },
                                });
                            }}>
                            {course.mentor?.firstName} {course.mentor?.lastName}
                        </Text>
                        <Text style={{marginBottom: 5}}>
                            {mentorProfile?.mentor?.field?.name}
                        </Text>
                        <Text style={globalStyles.description}>
                            {mentorProfile?.mentor.bio}
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
                {sessions.map(s => {
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
                    title={'Enroll in class'}
                    onPress={() => {
                        navigation.navigate('CourseDetailStack', {
                            screen: 'ClazzList',
                            params: {
                                courseId: course.id,
                                course: course,
                            },
                        });
                    }}
                />
            </View>
        </ScrollView>
    );
};

export default CourseFull;
