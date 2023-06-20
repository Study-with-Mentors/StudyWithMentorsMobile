import {Image, StyleSheet, View, Text, Dimensions} from 'react-native';
import {User} from '../../types/user';

const styles = StyleSheet.create({
    mentorContainer: {
        overflow: 'hidden',
        width: Dimensions.get('window').width * 0.45,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        margin: 5,
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
            <Text style={{textAlign: 'center'}}>{mentor.mentor?.bio}</Text>
        </View>
    );
};

export default MentorCompact;
