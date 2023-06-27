import React from 'react';
import {Clazz} from '../../types/clazz';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Course} from '../../types/course';

const ClazzCompact = ({clazz, course}: {clazz: Clazz; course?: Course}) => {
    const navigation = useNavigation();
    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('ClazzDetail', {
                        clazzId: clazz.id,
                        clazz: clazz,
                        course: course,
                    });
                }}>
                <Text>
                    {clazz.startDate} - {clazz.endDate}
                </Text>
                <Text>{clazz.enrollmentEndDate}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ClazzCompact;
