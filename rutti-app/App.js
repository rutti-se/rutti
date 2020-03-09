import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
    TouchableOpacity,
    ScrollView,
    Text,
    View,
    SafeAreaView,
    StyleSheet,
} from 'react-native';

import ScrollPage from './components/screens/ScrollPage';
import Button from './components/Button';
import BottomDrawer from './components/BottomDrawer/BottomDrawer';
import RegisterPage from './components/screens/RegisterPage';
import RegisterEmail from './components/RegisterEmail';
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}>
                    <Stack.Screen name="StartPage" component={ScrollPage} />
                    <Stack.Screen
                        name="RegisterPage"
                        component={RegisterPage}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

const Stack = createStackNavigator();
