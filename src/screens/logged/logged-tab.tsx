import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from './profile/profile-screen';
import CalendarScreen from './calendar/calendar-screen';
import HomeScreen from './home/home-screen';

const Tab = createBottomTabNavigator();
const LoggedTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Calendar" component={CalendarScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default LoggedTab;
