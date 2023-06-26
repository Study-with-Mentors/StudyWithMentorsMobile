import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoggedTab from './logged/logged-tab';
import LandingTab from './landing/landing-tab';
import CourseStack from './course/course-stack';
import React, {useState} from 'react';

const Stack = createNativeStackNavigator();
type ContextType = {
    searchKey: string;
    setSearchKey: Function;
    isSearch: boolean;
    setIsSearch: Function;
};

export const AppContext = React.createContext<ContextType>({} as ContextType);

const AppScreenStack = () => {
    const [searchKey, setSearchKey] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    return (
        <AppContext.Provider
            value={{searchKey, setSearchKey, isSearch, setIsSearch}}>
            <Stack.Navigator
                initialRouteName="Landing"
                screenOptions={{headerShown: false}}>
                <Stack.Screen name="Landing" component={LandingTab} />
                <Stack.Screen name="Logged" component={LoggedTab} />
                <Stack.Screen
                    name="CourseDetailStack"
                    component={CourseStack}
                />
            </Stack.Navigator>
        </AppContext.Provider>
    );
};

export default AppScreenStack;
