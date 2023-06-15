import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from './profile/profile-screen';

const Tab = createBottomTabNavigator();
const LoggedTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Profile" component={ProfileScreen} />
            {/*<Tab.Screen name="Profile" component={CalendarScreen} />*/}
            {/*<Tab.Screen name="Profile" component={DiscoverScreen} />*/}
        </Tab.Navigator>
    );
};

export default LoggedTab;
