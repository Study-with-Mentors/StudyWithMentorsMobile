import {StyleSheet} from 'react-native';
import containerStyle from './container-style';

const courseStyle = StyleSheet.create({
    courseCompactContainer: {
        ...containerStyle.compactContainer,
    },

    courseName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },

    text: {
        fontSize: 15,
        color: 'black',
    },

    subText: {
        fontSize: 14,
    },

    mentor: {
        fontSize: 15,
        fontWeight: 'normal',
    },

    sessionContainer: {
        gap: 5,
    },

    activityContainer: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
        backgroundColor: '#E6E6E6',
        padding: 5,
        paddingLeft: 10,
    },

    activityTitle: {
        color: 'black',
    },

    sessionName: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#333333',
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
        color: '#111111',
    },

    descriptionContainer: {
        padding: 10,
        backgroundColor: 'white',
        flex: 1,
    },
});

export default courseStyle;
