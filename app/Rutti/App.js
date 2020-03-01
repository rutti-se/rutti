import React, {Component} from 'react';
import {
    TouchableOpacity,
    ScrollView,
    Text,
    View,
    SafeAreaView,
    StyleSheet,
} from 'react-native';

import BottomDrawer from './components/BottomDrawer/BottomDrawer.js';
import Button from './components/Button';
const App: () => React$Node = () => {
    return (
        <>
            <SafeAreaView style={styles.container}>
                <Button
                    style={styles.button}
                    text="Register"
                    underlayColor={'#333333'}
                    onPress={() => console.log('Press')}></Button>
                <BottomDrawer username={'Oscar'} amount={3}></BottomDrawer>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#FFE5EA',
    },
});

export default App;
