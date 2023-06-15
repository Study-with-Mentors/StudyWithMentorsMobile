import {Course} from '../../types/course';
import {View, Text, Image, StyleSheet} from 'react-native';

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

const CourseCompact = ({course}: {course: Partial<Course>}) => {
    // TODO: cut the overflown description text
    return (
        <View style={[styles.horizontal, styles.courseContainer]}>
            <Image
                source={{uri: 'https://reactjs.org/logo-og.png'}}
                style={{width: 100, height: 100}}
            />
            <View style={[styles.vertical, {flex: 2, paddingLeft: 15}]}>
                <Text style={styles.courseName}>{course.shortName}</Text>
                <Text style={styles.mentor}>
                    {course.mentor?.firstName} {course.mentor?.lastName}
                </Text>
                <View style={styles.horizontal}>
                    <Text>{course.intendedLearner} - </Text>
                    <Text>{course.field?.name}</Text>
                </View>
                <Text style={styles.description}>{course.description}</Text>
            </View>
        </View>
    );
};

export default CourseCompact;
