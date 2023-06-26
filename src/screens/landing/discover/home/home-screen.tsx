import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import globalStyles from '../../../../styles/style';
import CourseCompact from '../../../../components/course-compact/course-compact';
import MentorCompact from '../../../../components/mentor-compact/mentor-compact';
import {Course} from '../../../../types/course';
import {CourseAPI, SearchCourseParams} from '../../../../api/course-api';

const HomeScreen = () => {
    // TODO: change the heading text color
    // return (
    //     <View style={[globalStyles.topView, globalStyles.fullScreen]}>
    //         <CourseFull courseId={'25ddba99-e339-5888-a2c1-c91dd6764391'} />
    //     </View>
    // );
    const [courses, setCourses] = useState<Course[]>([]);
    const [courseLoading, setCourseLoading] = useState(false);
    const [mentorLoading, setMentorLoading] = useState(false);
    useEffect(() => {
        setCourseLoading(true);
        let searchCourseParams: SearchCourseParams = {};
        CourseAPI.getAll(searchCourseParams).then(response => {
            setCourses(response.result);
            setCourseLoading(false);
        });
    }, []);
    // TODO: get mentor
    return (
        <View style={[globalStyles.topView, {gap: 10, paddingLeft: 5}]}>
            <Text style={[globalStyles.heading1]}>Popular course</Text>
            {courseLoading ? (
                <Text>Loading</Text>
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
            <Text style={[globalStyles.heading1]}>Popular mentor</Text>
            <ScrollView
                horizontal={true}
                contentContainerStyle={{
                    flexGrow: 1,
                }}
                style={{width: '100%'}}>
                {/*<MentorCompact mentor={mentor} />*/}
                {/*<MentorCompact mentor={mentor} />*/}
                {/*<MentorCompact mentor={mentor} />*/}
                {/*<MentorCompact mentor={mentor} />*/}
            </ScrollView>
        </View>
    );
};

export default HomeScreen;
