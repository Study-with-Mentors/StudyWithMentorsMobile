import React from 'react';
import {Clazz} from '../../types/clazz';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Course} from '../../types/course';
import {Icon} from 'react-native-elements';

const ClazzCompact = ({clazz, course}: {clazz: Clazz; course?: Course}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('ClazzDetail', {
                    clazzId: clazz.id,
                    clazz: clazz,
                    course: course,
                });
            }}>
            <View
                style={{
                    paddingHorizontal: 10,
                    paddingVertical: 7,
                    borderWidth: 1,
                    borderRadius: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <View>
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: '500',
                            color: 'black',
                        }}>
                        Class date: {clazz.startDate} - {clazz.endDate}
                    </Text>
                    <Text>Close enrollment on: {clazz.enrollmentEndDate}</Text>
                    <Text
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <View
                            style={{
                                flex: 1,
                                marginTop: 5,
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}>
                            <Icon name={'attach-money'} />
                            <Text style={{color: 'black', fontSize: 15}}>{clazz.price}</Text>
                        </View>
                    </Text>
                </View>
                <Icon name={'chevron-right'} />
            </View>
        </TouchableOpacity>
    );
};

export default ClazzCompact;
