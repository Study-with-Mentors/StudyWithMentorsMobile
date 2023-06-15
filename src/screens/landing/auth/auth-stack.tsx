import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from './login/login-screen';
import SignUpScreen from './signup/sign-up-screen';

const AuthStack = createNativeStackNavigator();
const AuthStacks = () => {
    return (
        <AuthStack.Navigator
            initialRouteName="Login"
            screenOptions={{headerShown: false}}>
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="SignUp" component={SignUpScreen} />
        </AuthStack.Navigator>
    );
};

export default AuthStacks;
