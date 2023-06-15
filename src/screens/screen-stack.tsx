import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoggedTab from './logged/logged-tab';
import LandingTab from './landing/landing-tab';

const Stack = createNativeStackNavigator();

const AppScreenStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Landing"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Landing" component={LandingTab} />
            <Stack.Screen name="Logged" component={LoggedTab} />
        </Stack.Navigator>
    );
};

export default AppScreenStack;
