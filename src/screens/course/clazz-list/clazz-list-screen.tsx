import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {ClassAPI} from '../../../api/class-api';
import ToolbarCustom from '../../../components/toolbar/toolbar-custom';
import LoadingIndicator from '../../../components/loading-indicator/loading-indicator';
import {Clazz, ClazzStatus} from '../../../types/clazz';
import ClazzCompact from '../../../components/clazz-compact/clazz-compact';
import globalStyles from '../../../styles/style';

const styles = StyleSheet.create({
    courseCompactContainer: {
        ...globalStyles.courseCompactContainer,
        width: '100%',
        padding: 10,
    },

    image: {
        width: '100%',
        height: 200,
    },
});

const ClazzListScreen = ({route}: {route: RouteProp<any>}) => {
    const courseId = route.params.courseId;
    const course = route.params.course;
    const [clazzes, setClazzes] = useState<Clazz[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        ClassAPI.getClassByCourse(courseId)
            .then(response => setClazzes(response))
            .finally(() => setLoading(false));
    }, [courseId]);

    return (
        <View style={{flex: 1}}>
            <ToolbarCustom title={'Class'} isBackButton={true} />
            {loading ? (
                <LoadingIndicator loadingText={'Loading classes'} />
            ) : (
                <ScrollView>
                    <View style={globalStyles.shadowBottom}>
                        <Image
                            source={{uri: course.image?.url}}
                            style={styles.image}
                        />
                    </View>
                    <View
                        style={{
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            gap: 10,
                        }}>
                        {/*course*/}
                        <View style={{marginBottom: 5}}>
                            <Text
                                style={[
                                    globalStyles.courseName,
                                    {fontSize: 22},
                                ]}>
                                {course.fullName}
                            </Text>
                            <Text style={globalStyles.description}>
                                {course.description}
                            </Text>
                        </View>
                    </View>
                    <View>
                        {clazzes
                            .filter(clazz => clazz.status === ClazzStatus.OPEN)
                            .map(clazz => {
                                return (
                                    <ClazzCompact
                                        clazz={clazz}
                                        course={course}
                                    />
                                );
                            })}
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

export default ClazzListScreen;
