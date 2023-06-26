import {StyleSheet} from 'react-native';
import containerStyle from './container-style';

const courseStyle = StyleSheet.create({
    courseCompactContainer: {
        ...containerStyle.compactContainer,
    },

    courseName: {
        fontSize: 18,
        fontWeight: '500',
        color: 'black',
        marginBottom: 5,
    },

    text: {
        fontSize: 15,
        color: 'black',
    },

    subText: {
        fontSize: 15,
    },

    mentor: {
        fontSize: 15,
        fontWeight: 'normal',
    },

    sessionContainer: {},

    sessionName: {
        fontWeight: 'bold',
        fontSize: 15,
    },

    sessionDescription: {},

    mentorProfile: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },

    description: {
        fontSize: 15,
        fontWeight: '300',
        color: 'gray',
    },

    descriptionContainer: {
        padding: 10,
        backgroundColor: 'white',
        flex: 1,
    },
});

export default courseStyle;
