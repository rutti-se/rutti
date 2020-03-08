import React, {Component} from 'react';
import {
    TouchableOpacity,
    ScrollView,
    Text,
    View,
    SafeAreaView,
    StyleSheet,
} from 'react-native';

import ScrollPage from './components/ScrollPage';
import Button from './components/Button';
import BottomDrawer from './components/BottomDrawer/BottomDrawer';
import RegisterPage from './components/RegisterPage';
import RegisterEmail from './components/RegisterEmail';

const App: () => React$Node = () => {
    return (
        <>
            <View style={styles.container}>
                {/* <RegisterPage></RegisterPage> */}
                <RegisterEmail></RegisterEmail>
                <BottomDrawer></BottomDrawer>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: '#FFE5EA',
        justifyContent: 'center',
    },
    button: {
        alignSelf: 'center',
        marginTop: 25,
    },
});

export default App;
