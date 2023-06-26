import {Image, StyleSheet, View, Text} from 'react-native';
import {User} from '../../types/user';
import containerStyle from '../../styles/container-style';
import globalStyles from '../../styles/style';

const styles = StyleSheet.create({
    mentorContainer: {
        ...containerStyle.compactContainer,
        padding: 15,
        backgroundColor: 'white',
    },

    image: {
        width: '85%',
        height: undefined,
        aspectRatio: 1,
        borderRadius: 100,
    },

    mentorName: {
        fontSize: 18,
        fontWeight: '500',
        color: 'black',
        marginVertical: 5,
    },

    vertical: {
        ...globalStyles.centerView,
        ...globalStyles.vertical,
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
});

const MentorCompact = ({mentor}: {mentor: Partial<User>}) => {
    return (
        <View style={[styles.vertical, styles.mentorContainer]}>
            <Image
                source={{uri: 'https://reactjs.org/logo-og.png'}}
                style={styles.image}
            />
            <Text style={styles.mentorName}>
                {mentor.firstName} {mentor.lastName}
            </Text>
            <Text style={globalStyles.textCenter}>{mentor.mentor?.bio}</Text>
        </View>
    );
};

export default MentorCompact;
