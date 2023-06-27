import React from 'react';
import {Course} from '../../types/course';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import globalStyles from '../../styles/style';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 120,
    },
});

const CourseCompact = ({course}: {course: Partial<Course>}) => {
    const navigation = useNavigation();
    return (
        <View
            style={[
                globalStyles.vertical,
                globalStyles.courseCompactContainer,
            ]}>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('CourseDetailStack', {
                        screen: 'CourseDetail',
                        params: {
                            courseId: course.id,
                        },
                    })
                }
                style={{flex: 1}}>
                <Image source={{uri: course.image?.url}} style={styles.image} />
                <View style={globalStyles.descriptionContainer}>
                    <Text style={globalStyles.courseName}>
                        {course.shortName}
                    </Text>
                    <Text style={globalStyles.mentor}>
                        {course.mentor?.firstName} {course.mentor?.lastName}
                    </Text>
                    <Text style={globalStyles.description} numberOfLines={3}>
                        {course.description}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default CourseCompact;
