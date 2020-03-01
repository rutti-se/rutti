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
const App: () => React$Node = () => {
    return (
        <>
            <View style={styles.container}>
                {/*    <Button
                    style={styles.button}
                    text="Register"
                    underlayColor={'#333333'}
                    onPress={() => console.log('Press')}></Button>
                <BottomDrawer username={'Oscar'} amount={3}></BottomDrawer> */}

                <ScrollPage></ScrollPage>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //height: '100%',
        backgroundColor: '#FFE5EA',
    },
});

export default App;
