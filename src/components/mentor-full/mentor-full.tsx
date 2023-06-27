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
        borderRadius: 100,
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
        // TODO: error handling
        if (mentor.mentor == null) {
            UserAPI.getMentorProfileById(mentorId).then(response => {
                setMentor(response);
            });
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
        <ScrollView>
            <Image
                source={{uri: mentor.profileImage?.url}}
                style={styles.image}
            />
            <Text>
                {mentor.firstName} {mentor.lastName}
            </Text>
            <Text>{mentor.mentor?.bio}</Text>
            <Line />
            <View>
                <View>
                    <Text>Field</Text>
                    <Text>{mentor.mentor.field?.name}</Text>
                </View>
                <View>
                    <Text>Degree</Text>
                    <Text>{mentor.mentor.degree}</Text>
                </View>
            </View>
            <Line />
            <View>
                <Text>Courses</Text>
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
        </ScrollView>
    );
};

export default MentorFull;
