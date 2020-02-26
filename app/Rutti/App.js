import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

const App: () => React$Node = () => {
    return (
        <>
            <SafeAreaView style={styles.container}></SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
});

export default App;
