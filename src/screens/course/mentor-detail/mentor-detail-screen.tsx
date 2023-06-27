import React from 'react';
import {View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MentorFull from '../../../components/mentor-full/mentor-full';
import ToolbarCustom from '../../../components/toolbar/toolbar-custom';

const MentorDetailScreen = ({route}: NativeStackScreenProps<any>) => {
    const mentorId = route.params.mentorId;
    const mentor = route.params.mentor;
    return (
        <View style={{flex: 1}}>
            <ToolbarCustom title={'Mentor'} isBackButton={true} />
            {mentorId ? (
                <MentorFull mentorId={mentorId} loadedMentor={mentor} />
            ) : (
                <Text>Mentor not found</Text>
            )}
        </View>
    );
};

export default MentorDetailScreen;
