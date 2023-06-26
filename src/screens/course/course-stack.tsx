import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CourseDetailScreen from './course-detail/course-detail-screen';
import SessionDetailScreen from './session-detail/session-detail-screen';

const Stack = createNativeStackNavigator();
const CourseStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
            <Stack.Screen
                name="SessionDetails"
                component={SessionDetailScreen}
            />
        </Stack.Navigator>
    );
};

export default CourseStack;
