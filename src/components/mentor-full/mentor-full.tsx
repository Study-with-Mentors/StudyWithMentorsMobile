import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {User} from '../../types/user';
import {UserAPI} from '../../api/user-api';
import LoadingIndicator from '../loading-indicator/loading-indicator';
import Line from '../line/line';
import {Course} from '../../types/course';
import globalStyles from '../../styles/style';
import CourseCompact from '../course-compact/course-compact';
import {CourseAPI, SearchCourseParams} from '../../api/course-api';

const styles = StyleSheet.create({
    image: {
        width: '65%',
        height: undefined,
        aspectRatio: 1,
        borderRadius: 9000,
    },
});

const MentorFull = ({
    mentorId,
    loadedMentor,
}: {
    mentorId: string;
    loadedMentor?: User;
}) => {
    const [mentor, setMentor] = useState<User>(loadedMentor as User);
    const [courses, setCourses] = useState<Course[]>([]);
    const [loadingCourses, setLoadingCourses] = useState(false);
    useEffect(() => {
        if (mentor.mentor == null) {
            UserAPI.getMentorProfileById(mentorId)
                .then(response => {
                    setMentor(response);
                })
                .catch(error => console.log(error));
        }
        setLoadingCourses(true);
        let searchQuery: SearchCourseParams = {
            mentorId,
        };
        CourseAPI.getAll(searchQuery)
            .then(response => {
                setCourses(response.result);
            })
            .finally(() => setLoadingCourses(false));
    }, [mentorId, mentor]);

    if (mentor.mentor == null) {
        return <LoadingIndicator loadingText={'Loading mentor'} />;
    }
    return (
        <ScrollView
            style={[globalStyles.vertical]}
            contentContainerStyle={{
                gap: 5,
                backgroundColor: 'white',
                paddingTop: 20,
            }}>
            <View
                style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Image
                    source={{uri: mentor.profileImage?.url}}
                    style={styles.image}
                />
            </View>
            <View style={{paddingHorizontal: 20, paddingVertical: 10, gap: 10}}>
                <Text style={[globalStyles.courseName]}>
                    {mentor.firstName} {mentor.lastName}
                </Text>
                <Text style={globalStyles.description}>
                    {mentor.mentor?.bio}
                </Text>
                <Line />
                <View style={{paddingLeft: 20, gap: 10}}>
                    <Text style={globalStyles.subText}>
                        Field {mentor.mentor.field?.name}
                    </Text>
                    <Text style={globalStyles.subText}>
                        Degree {mentor.mentor.degree}
                    </Text>
                </View>
                <Line />
                <View>
                    <Text style={globalStyles.heading1}>Courses</Text>
                    {loadingCourses ? (
                        <LoadingIndicator loadingText={'Load mentor courses'} />
                    ) : (
                        <View>
                            {courses
                                .reduce(
                                    (
                                        accumulator,
                                        currentValue,
                                        currentIndex,
                                        array,
                                    ) => {
                                        if (currentIndex % 2 === 0) {
                                            accumulator.push(
                                                array.slice(
                                                    currentIndex,
                                                    currentIndex + 2,
                                                ) as never,
                                            );
                                        }
                                        return accumulator;
                                    },
                                    [],
                                )
                                .map((c, key) => {
                                    return (
                                        <View
                                            style={[globalStyles.horizontal]}
                                            key={key}>
                                            <CourseCompact course={c[0]} />
                                            {c[1] && (
                                                <CourseCompact course={c[1]} />
                                            )}
                                        </View>
                                    );
                                })}
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

export default MentorFull;
