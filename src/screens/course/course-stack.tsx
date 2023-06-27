import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CourseDetailScreen from './course-detail/course-detail-screen';
import SessionDetailScreen from './session-detail/session-detail-screen';
import MentorDetailScreen from './mentor-detail/mentor-detail-screen';
import ClazzListScreen from './clazz-list/clazz-list-screen';
import ClazzDetailScreen from "./clazz-detail/clazz-detail-screen";

const Stack = createNativeStackNavigator();
const CourseStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
            <Stack.Screen
                name="SessionDetails"
                component={SessionDetailScreen}
            />
            <Stack.Screen name="MentorDetail" component={MentorDetailScreen} />
            <Stack.Screen name="ClazzList" component={ClazzListScreen} />
            <Stack.Screen name="ClazzDetail" component={ClazzDetailScreen} />
        </Stack.Navigator>
    );
};

export default CourseStack;
