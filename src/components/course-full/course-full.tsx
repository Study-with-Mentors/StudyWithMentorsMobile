import {Image, StyleSheet, View, Text} from 'react-native';
import {Course} from '../../types/course';
import Line from '../line/line';

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

    subText: {
        fontSize: 15,
    },

    strongText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },

    mentor: {
        fontWeight: 'normal',
        color: 'blue',
        textDecorationLine: 'underline',
    },

    description: {
        fontSize: 15,
    },

    horizontal: {
        flexDirection: 'row',
    },

    vertical: {
        flexDirection: 'column',
    },
});

const CourseFull = ({course}: {course: Partial<Course>}) => {
    // list of clazz
    // mentor information
    return (
        <View style={styles.vertical}>
            <Image
                source={{uri: 'https://reactjs.org/logo-og.png'}}
                style={{width: 200, height: 200}}
            />
            <Text style={styles.courseName}>{course.fullName}</Text>
            <Text style={styles.description}>{course.description}</Text>
            <Line />
            <View>
                <Text style={styles.subText}>
                    {/*TODO: get number of session and enrollments*/}
                    {'\u2B24'} <Text style={styles.strongText}>Outcome</Text>:{' '}
                    {course.learningOutcome}
                </Text>
                <Text style={styles.subText}>
                    {/*TODO: add an icon*/}
                    {course.courseLevel}
                </Text>
            </View>
            <Line />
            <View>
                <Text>What you'll learn</Text>
                <Text>{course.learningOutcome}</Text>
            </View>
            <View>
                <Text>Intended learner</Text>
                <Text>{course.intendedLearner}</Text>
            </View>

            <View style={styles.horizontal}>
                <Text style={[styles.mentor, styles.subText]}>
                    {course.mentor?.firstName} {course.mentor?.lastName}
                </Text>
                <Text style={styles.subText}> - {course.field?.name}</Text>
            </View>
        </View>
    );
};

export default CourseFull;
