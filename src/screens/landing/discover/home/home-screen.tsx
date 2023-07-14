import React, {useEffect, useState} from 'react';
import {ScrollView, Text} from 'react-native';
import globalStyles from '../../../../styles/style';
import CourseCompact from '../../../../components/course-compact/course-compact';
import MentorCompact from '../../../../components/mentor-compact/mentor-compact';
import {Course} from '../../../../types/course';
import {CourseAPI, SearchCourseParams} from '../../../../api/course-api';
import ToolbarCustom from '../../../../components/toolbar/toolbar-custom';
import {UserAPI} from '../../../../api/user-api';
import {User} from '../../../../types/user';
import LoadingIndicator from '../../../../components/loading-indicator/loading-indicator';

const HomeScreen = () => {
    // TODO: change the heading text color
    const [courses, setCourses] = useState<Course[]>([]);
    const [mentors, setMentors] = useState<User[]>([]);
    const [courseLoading, setCourseLoading] = useState(false);
    const [mentorLoading, setMentorLoading] = useState(false);
    useEffect(() => {
        setCourseLoading(true);
        let searchCourseParams: SearchCourseParams = {};
        CourseAPI.getAll(searchCourseParams)
            .then(response => {
                setCourses(response.result);
                setCourseLoading(false);
            })
            .catch(error =>
                console.log('Error in home screen: ' + error.response),
            );
        setMentorLoading(true);
        UserAPI.getMentorList().then(response => {
            setMentors(response.result);
            setMentorLoading(false);
        });
    }, []);
    return (
        <ScrollView style={{flex: 1}} stickyHeaderIndices={[0]}>
            <ToolbarCustom title={'Home'} />
            <ScrollView
                contentContainerStyle={[
                    globalStyles.topView,
                    {gap: 10, paddingLeft: 5},
                ]}>
                <Text
                    style={[
                        globalStyles.heading1,
                        {paddingHorizontal: 15, paddingVertical: 7},
                    ]}>
                    Popular course
                </Text>
                {courseLoading ? (
                    <LoadingIndicator loadingText={'Loading courses'} />
                ) : (
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={{
                            flexGrow: 1,
                        }}>
                        {courses.map(course => (
                            <CourseCompact course={course} key={course.id} />
                        ))}
                    </ScrollView>
                )}
                <Text
                    style={[
                        globalStyles.heading1,
                        {paddingHorizontal: 15, paddingVertical: 7},
                    ]}>
                    Popular mentor
                </Text>
                {mentorLoading ? (
                    <LoadingIndicator loadingText={'Load mentors'} />
                ) : (
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={{
                            flexGrow: 1,
                        }}
                        style={{width: '100%'}}>
                        {mentors.map(mentor => (
                            <MentorCompact mentor={mentor} key={mentor.id} />
                        ))}
                    </ScrollView>
                )}
            </ScrollView>
        </ScrollView>
    );
};

export default HomeScreen;
