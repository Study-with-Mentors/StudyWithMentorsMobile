import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import ToolbarCustom from '../../../components/toolbar/toolbar-custom';
import {RouteProp} from '@react-navigation/native';
import {Clazz} from '../../../types/clazz';
import LoadingIndicator from '../../../components/loading-indicator/loading-indicator';
import {ClassAPI} from '../../../api/class-api';
import {CourseAPI} from '../../../api/course-api';
import {Course} from '../../../types/course';
import ButtonCustom from '../../../components/button-custom/button-custom';
import globalStyles from '../../../styles/style';
import Line from '../../../components/line/line';

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
    const [course, setCourse] = useState<Course>(loadedCourse as Course);
    const [loading, setLoading] = useState(false);
    const [loadingCourse, setLoadingCourse] = useState(false);
    useEffect(() => {
        if (loadedClazz == null) {
            setLoading(true);
            ClassAPI.getClassById(clazzId)
                .then(response => setClazz(response))
                .catch(error => console.log(error))
                .finally(() => setLoading(false));
        }
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

    return (
        <ScrollView style={{flex: 0}}>
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
                    <Text>{clazz.price}</Text>
                    <ButtonCustom
                        onPress={() =>
                            console.error('Implmenet move to payment, show course name, class time and price')
                        }
                        title={'Enroll now'}
                    />
                </View>
            )}
        </ScrollView>
    );
};

export default ClazzDetailScreen;
