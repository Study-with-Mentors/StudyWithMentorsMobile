import {Course} from '../../types/course';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    courseContainer: {
        overflow: 'hidden',
        width: Dimensions.get('window').width * 0.45,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        margin: 5,
    },

    courseName: {
        fontSize: 18,
        fontWeight: '500',
        color: 'black',
        marginBottom: 5,
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

    descriptionContainer: {
        padding: 10,
        backgroundColor: 'white',
    },

    horizontal: {
        flexDirection: 'row',
    },

    vertical: {
        flexDirection: 'column',
    },

    image: {
        width: '100%',
        height: 120,
    },
});

const CourseCompact = ({course}: {course: Partial<Course>}) => {
    // TODO: cut the overflown description text
    // TODO: replace Image with data from backend
    // TODO: make this touchable to navigate to course detail
    return (
        <View style={[styles.vertical, styles.courseContainer]}>
            <Image
                source={{uri: 'https://reactjs.org/logo-og.png'}}
                style={styles.image}
            />
            <View style={styles.descriptionContainer}>
                <Text style={styles.courseName}>{course.shortName}</Text>
                <Text style={styles.mentor}>
                    {course.mentor?.firstName} {course.mentor?.lastName}
                </Text>
                <Text style={styles.description}>{course.description}</Text>
            </View>
        </View>
    );
};

export default CourseCompact;
