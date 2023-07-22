import React, {useContext, useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import ToolbarCustom from '../../../components/toolbar/toolbar-custom';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {Clazz} from '../../../types/clazz';
import LoadingIndicator from '../../../components/loading-indicator/loading-indicator';
import {ClassAPI} from '../../../api/class-api';
import {CourseAPI} from '../../../api/course-api';
import {Course} from '../../../types/course';
import ButtonCustom from '../../../components/button-custom/button-custom';
import globalStyles from '../../../styles/style';
import Line from '../../../components/line/line';
import {EnrollmentApi} from '../../../api/enrollment-api';
import WebView from 'react-native-webview';
import {Lesson} from '../../../types/lesson';
import {LessionAPI} from '../../../api/lesson-api';
import {getAccessToken} from '../../../utils/http';
import {AppContext} from '../../screen-stack';
import {Icon} from 'react-native-elements';

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

const ClazzDetailScreen = ({route}: {route: RouteProp<any>}) => {
    const clazzId = route.params.clazzId;
    const loadedClazz = route.params.clazz;
    const loadedCourse = route.params.course;
    const [clazz, setClazz] = useState<Clazz>(loadedClazz as Clazz);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [course, setCourse] = useState<Course>(loadedCourse as Course);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [loadingCourse, setLoadingCourse] = useState(false);
    const {setNavigation} = useContext(AppContext);
    const navigation = useNavigation();
    useEffect(() => {
        if (loadedClazz == null) {
            setLoading(true);
            ClassAPI.getClassById(clazzId)
                .then(response => setClazz(response))
                .catch(error => console.log(error))
                .finally(() => setLoading(false));
        }
        LessionAPI.getLessonByClass(clazzId)
            .then(response => {
                setLessons(response);
            })
            .catch(error => console.log(error));
    }, [clazzId, loadedClazz]);
    useEffect(() => {
        if (loadedCourse == null) {
            setLoadingCourse(true);
            CourseAPI.getById(clazz.courseId)
                .then(response => setCourse(response))
                .catch(error => console.log(error))
                .finally(() => setLoadingCourse(false));
        }
    }, [clazz, loadedCourse, setCourse]);

    const [paymentURL, setPaymentURL] = useState('');
    const [loadingPayment, setLoadingPayment] = useState(false);
    const createPayment = () => {
        setLoadingPayment(true);
        getAccessToken()
            .then(token => {
                console.log(token);
                if (token === null || token === '') {
                    setNavigation({
                        screen: 'CourseDetailStack',
                        params: {
                            screen: 'ClazzDetail',
                            params: {
                                clazzId: clazz.id,
                                clazz: clazz,
                                course: course,
                            },
                        },
                    });
                    navigation.navigate('Profile', {
                        screen: 'Login',
                        params: {
                            message: 'Please login first',
                        },
                    });
                } else {
                    EnrollmentApi.createEnrollment({classId: clazzId})
                        .then(response => setPaymentURL(response.object))
                        .catch(_error => {
                            console.log(_error.response);
                            setMessage('Already enrolled in this class');
                        })
                        .finally(() => setLoadingPayment(false));
                }
            })
            .finally(() => setLoadingPayment(false));
    };

    if (paymentURL !== null && paymentURL !== '') {
        return (
            <WebView
                onError={error => {
                    console.log(error);
                }}
                source={{
                    uri: paymentURL,
                }}
            />
        );
    }

    return (
        <ScrollView style={{flex: 0}} stickyHeaderIndices={[0]}>
            <ToolbarCustom title={'Class'} isBackButton={true} />
            {loadingCourse ? (
                <LoadingIndicator loadingText={'Loading course'} />
            ) : (
                <View>
                    <View style={globalStyles.shadowBottom}>
                        <Image
                            source={{uri: course.image?.url}}
                            style={styles.image}
                        />
                    </View>
                    <View
                        style={{
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            gap: 10,
                        }}>
                        {/*course*/}
                        <View style={{marginBottom: 5}}>
                            <Text
                                style={[
                                    globalStyles.courseName,
                                    {fontSize: 22},
                                ]}>
                                {course.fullName}
                            </Text>
                            <Text style={globalStyles.description}>
                                {course.description}
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
                                <Text style={globalStyles.courseName}>
                                    {course.mentor?.firstName}{' '}
                                    {course.mentor?.lastName}
                                </Text>
                            </View>
                        </View>
                        <Line />
                    </View>
                </View>
            )}
            {loading ? (
                <LoadingIndicator loadingText={'Loading clazz'} />
            ) : (
                <View
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        gap: 10,
                    }}>
                    <Text>
                        From: {clazz.startDate} - To: {clazz.endDate}
                    </Text>
                    <Text>Enrollment close on: {clazz.enrollmentEndDate}</Text>
                    <View
                        style={{
                            flex: 1,
                            marginTop: 5,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}>
                        <Icon name={'attach-money'} />
                        <Text style={{color: 'black', fontSize: 15}}>
                            {clazz.price}
                        </Text>
                    </View>
                    <Line />
                    <Text style={globalStyles.heading1}>Lessons</Text>
                    {lessons.map(lesson => {
                        const date = lesson.startTime.split('T')[0];
                        const startTime = lesson.startTime
                            .split('T')[1]
                            .substring(0, 5);
                        const endTime = lesson.endTime
                            .split('T')[1]
                            .substring(0, 5);
                        return (
                            <View key={lesson.id} style={{gap: 5, padding: 10}}>
                                <Text>
                                    {lesson.lessonNum}. {lesson.sessionName}
                                </Text>
                                <Text>
                                    {date}: {startTime} - {endTime}
                                </Text>
                                <Text>{lesson.location}</Text>
                                <Line />
                            </View>
                        );
                    })}
                    <Text style={globalStyles.error}>{message}</Text>
                    <ButtonCustom
                        onPress={createPayment}
                        disabled={loadingPayment}
                        title={loadingPayment ? 'Loading' : 'Enroll now'}
                    />
                </View>
            )}
        </ScrollView>
    );
};

export default ClazzDetailScreen;
