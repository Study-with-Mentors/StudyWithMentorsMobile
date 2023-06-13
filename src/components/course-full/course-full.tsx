import {Image, StyleSheet, View, Text} from 'react-native';
import {Course} from '../../types/course';

const styles = StyleSheet.create({
    courseContainer: {
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        borderColor: 'gray',
        padding: 10,
    },

    courseName: {
        fontSize: 20,
        fontWeight: '500',
        color: 'black',
    },

    mentor: {
        fontSize: 15,
        fontWeight: 'normal',
    },

    description: {
        fontSize: 15,
        fontWeight: '300',
        color: 'gray',
    },

    horizontal: {
        flexDirection: 'row',
    },

    vertical: {
        flexDirection: 'column',
    },
});

const CourseFull = ({course}: {course: Course}) => {
    // list of clazz
    // mentor information
    return (
        <View style={styles.vertical}>
            <Image
                source={{uri: 'https://reactjs.org/logo-og.png'}}
                style={{width: 200, height: 200}}
            />
            <Text>{course.fullName}</Text>
            <View style={styles.horizontal}>
                <Text>
                    {course.mentor.firstName} {course.mentor.lastName} -{' '}
                </Text>
                <Text>{course.field?.name}</Text>
            </View>
            <Text>
                {'\u2B24'} {course.learningOutcome}
            </Text>
            <Text>
                {'\u2B24'} {course.intendedLearner}
            </Text>
            <Text>
                {'\u2B24'} {course.courseLevel}
            </Text>
            <Text>
                {course.description}
            </Text>
        </View>
    );
};

export default CourseFull;
