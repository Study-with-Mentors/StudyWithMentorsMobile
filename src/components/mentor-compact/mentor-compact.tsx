import React from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {User} from '../../types/user';
import containerStyle from '../../styles/container-style';
import globalStyles from '../../styles/style';
import {useNavigation} from '@react-navigation/native';

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
        // ...globalStyles.centerView,
        ...globalStyles.vertical,
    },
});

const MentorCompact = ({mentor}: {mentor: Partial<User>}) => {
    const navigation = useNavigation();
    return (
        <View style={[styles.vertical, styles.mentorContainer]}>
            <TouchableOpacity
                style={{flex: 1}}
                onPress={() =>
                    navigation.navigate('CourseDetailStack', {
                        screen: 'MentorDetail',
                        params: {
                            mentorId: mentor.id,
                            mentor: mentor,
                        },
                    })
                }>
                <View style={{width: '100%', alignItems: 'center'}}>
                    <Image
                        source={{uri: mentor.profileImage?.url}}
                        style={styles.image}
                    />
                </View>
                <Text style={styles.mentorName}>
                    {mentor.firstName} {mentor.lastName}
                </Text>
                <Text style={{}}>{mentor.mentor?.bio}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default MentorCompact;
