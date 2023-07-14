import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoggedTab from './logged/logged-tab';
import LandingTab from './landing/landing-tab';
import CourseStack from './course/course-stack';
import React, {useEffect, useState} from 'react';
import {getAccessToken, saveAccessToken} from '../utils/http';
import {useNavigation} from '@react-navigation/native';
import {GOOGLE_CLIENT_ID} from '@env';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import messaging, {
    FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {UserAPI} from '../api/user-api';
import notifee from '@notifee/react-native';
import {LogBox} from "react-native";

const Stack = createNativeStackNavigator();
type ContextType = {
    searchKey: string;
    setSearchKey: Function;
    isSearch: boolean;
    setIsSearch: Function;
    setAuthToken: Function;
    setNavigation: Function;
};

type NavigationRoute = {
    screen: string;
    params: {};
};

export const AppContext = React.createContext<ContextType>({} as ContextType);

const onMessageReceived = async (
    message: FirebaseMessagingTypes.RemoteMessage,
) => {
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default channel',
    });

    await notifee.displayNotification({
        title: message.notification?.title,
        body: message.notification?.body,
        android: {
            channelId,
        },
    });
};

const updateNotificationToken = async () => {
    console.log('Register notification');
    try {
        await messaging().requestPermission();
    } catch (ex) {
        console.log('Error register notification: ' + ex);
        return;
    }
    await messaging().registerDeviceForRemoteMessages();
    const notifToken = await messaging().getToken();
    console.log(notifToken);
    UserAPI.updateNotificationToken({token: notifToken})
        .then(() => {})
        .catch(error => console.log('Update notif token error: ' + error));
    messaging().onMessage(onMessageReceived);
};

const AppScreenStack = () => {
    const navigation = useNavigation();
    const setAuthToken = (token: string) => {
        saveAccessToken(token).then(() => {
            setAuth(token);
            if (token !== '') {
                updateNotificationToken().then();
            } else {
                messaging().deleteToken().then();
            }
            if (token && navigatedRoute.screen) {
                navigation.navigate(
                    navigatedRoute.screen,
                    navigatedRoute.params,
                );
                setNavigation({} as NavigationRoute);
            }
        });
    };
    useEffect(() => {
        LogBox.ignoreLogs(['Warning:...']);
    }, [])

    useEffect(() => {
        console.log('Google client: ' + GOOGLE_CLIENT_ID);
        GoogleSignin.hasPlayServices({
            showPlayServicesUpdateDialog: true,
        }).then(() => {});
        GoogleSignin.configure({
            // scopes: ['']
            webClientId: GOOGLE_CLIENT_ID,
            offlineAccess: true,
        });
    }, []);

    const [searchKey, setSearchKey] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [auth, setAuth] = useState('');
    const [navigatedRoute, setNavigation] = useState<NavigationRoute>(
        {} as NavigationRoute,
    );
    useEffect(() => {
        getAccessToken().then(result => {
            if (result !== '') {
                setAuth(result);
                updateNotificationToken().then();
            }
        });
        GoogleSignin.isSignedIn().then(() => GoogleSignin.signOut());
    }, []);

    return (
        <AppContext.Provider
            value={{
                searchKey,
                setSearchKey,
                isSearch,
                setIsSearch,
                setAuthToken,
                setNavigation,
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
