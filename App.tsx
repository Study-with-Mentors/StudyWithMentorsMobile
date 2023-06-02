import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomNavigation from './src/components/footer/bottom-navigation';

export default function App(): React.JSX.Element {
    return (
        <NavigationContainer>
            <BottomNavigation />
        </NavigationContainer>
    );
}
