import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Splashscreen from './views/Splashscreen';
import HomePage from './views/HomePage';
import {navigationRef} from './views/RootNavigation';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <NavigationContainer ref={navigationRef}>
                <RootStack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                    initialRouteName="SignIn">
                    <RootStack.Screen name="SignIn" component={SignIn} />
                    <RootStack.Screen name="Home" component={Home} />
                </RootStack.Navigator>
            </NavigationContainer>
        );
    }
}
const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();

function SignIn() {
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <AuthStack.Screen name="SplashScreen" component={Splashscreen} />
        </AuthStack.Navigator>
    );
}

function Home() {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <HomeStack.Screen name="HomePage" component={HomePage} />
        </HomeStack.Navigator>
    );
}
