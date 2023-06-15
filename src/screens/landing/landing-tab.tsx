import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AuthStacks from './auth/auth-stack';
import HomeScreen from './discover/home/home-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CourseSearchScreen from './course/course-search-screen';
import React from 'react';

const Tab = createBottomTabNavigator();

const LandingTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({focused, color, size}) => (
                        <Icon name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="CourseSearch"
                component={CourseSearchScreen}
                options={{
                    tabBarIcon: ({focused, color, size}) => (
                        <Icon name="book" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={AuthStacks}
                options={{
                    tabBarIcon: ({focused, color, size}) => (
                        <Icon name="account-circle" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default LandingTab;
