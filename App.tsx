import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppScreenStack from './src/screens/screen-stack';

export default function App(): React.JSX.Element {
    return (
        <NavigationContainer>
            <AppScreenStack />
        </NavigationContainer>
    );
}
