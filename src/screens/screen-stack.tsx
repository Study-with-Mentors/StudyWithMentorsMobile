import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoggedTab from './logged/logged-tab';
import LandingTab from './landing/landing-tab';
import CourseStack from './course/course-stack';
import React, {useEffect, useState} from 'react';
import {getAccessToken, saveAccessToken} from '../utils/http';
import {useNavigation} from '@react-navigation/native';
import {SERVER_URL} from '@env';

const Stack = createNativeStackNavigator();
type ContextType = {
    searchKey: string;
    setSearchKey: Function;
    isSearch: boolean;
    setIsSearch: Function;
    setAuthToken: Function;
};

export const AppContext = React.createContext<ContextType>({} as ContextType);

const AppScreenStack = () => {
    const navigation = useNavigation();
    const setAuthToken = (token: string) => {
        saveAccessToken(token).then(() => {
            setAuth(token);
        });
    };

    const [searchKey, setSearchKey] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [auth, setAuth] = useState('');
    useEffect(() => {
        getAccessToken().then(result => {
            // setAuth(result);
        });
    }, []);

    return (
        <AppContext.Provider
            value={{
                searchKey,
                setSearchKey,
                isSearch,
                setIsSearch,
                setAuthToken,
            }}>
            <Stack.Navigator
                initialRouteName="Landing"
                screenOptions={{headerShown: false}}>
                {auth ? (
                    <Stack.Screen name="Logged" component={LoggedTab} />
                ) : (
                    <Stack.Screen name="Landing" component={LandingTab} />
                )}
                <Stack.Screen
                    name="CourseDetailStack"
                    component={CourseStack}
                />
            </Stack.Navigator>
        </AppContext.Provider>
    );
};

export default AppScreenStack;
