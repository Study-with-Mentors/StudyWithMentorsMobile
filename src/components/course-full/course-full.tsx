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
            <View style={styles.horizontal}>
                <Text style={[styles.mentor, styles.subText]}>
                    {course.mentor?.firstName} {course.mentor?.lastName}
                </Text>
                <Text style={styles.subText}> - {course.field?.name}</Text>
            </View>
            <View>
                <Text style={styles.subText}>
                    {'\u2B24'} <Text style={styles.strongText}>Outcome</Text>:{' '}
                    {course.learningOutcome}
                </Text>
                <Text style={styles.subText}>
                    {'\u2B24'} <Text style={styles.strongText}>For</Text>:{' '}
                    {course.intendedLearner}
                </Text>
                <Text style={styles.subText}>
                    {'\u2B24'} <Text style={styles.strongText}>Level</Text>:{' '}
                    {course.courseLevel}
                </Text>
                <Text style={styles.subText}>
                    {'\u2B24'} <Text style={styles.strongText}>Status</Text>:{' '}
                    {course.status}
                </Text>
            </View>
            <Text style={styles.strongText}>Description</Text>
            <Text style={styles.description}>{course.description}</Text>
        </View>
    );
};

export default CourseFull;
