import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../../screens/home/home-screen';
import CourseSearchScreen from '../../screens/course/course-search-screen';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
            }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({focused, color, size}) => (
                        <Icon
                            name="home"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="CourseSearch"
                component={CourseSearchScreen}
                options={{
                    tabBarIcon: ({focused, color, size}) => (
                        <Icon
                            name="book"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({focused, color, size}) => (
                        <Icon
                            name="account-circle"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomNavigation;
