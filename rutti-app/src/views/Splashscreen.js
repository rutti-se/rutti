import React, {Component, useState, useEffect} from 'react';
import COLORS from '../../assets/colors';
import RuttiLogo from '../../assets/rutti_logo.svg';
import {View, StyleSheet} from 'react-native';

import {firebase} from '@react-native-firebase/auth';
import AuthView from './AuthView';
import Button from '../components/Button';
import SelectStoresView from './SelectStoresView';

export default () => {
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            console.log('auth changed');
            if (user) {
                //Användare finns redan
                console.log(user.displayName);
            } else {
                //Ingen användare
                setLoading(false);
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <>
                    <View style={styles.topContainer}>
                        <RuttiLogo height={250} width={250} />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button
                            text="Logga ut"
                            shadow={true}
                            type={'secondary'}
                            onPress={() => {
                                firebase
                                    .auth()
                                    .signOut()
                                    .then(() => console.log('logged out'));
                            }}></Button>
                    </View>
                </>
            ) : (
                <AuthView />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    topContainer: {
        flex: 5,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonContainer: {
        flex: 1.7,
        alignSelf: 'center',
        width: '70%',
        justifyContent: 'space-between',
        marginBottom: '10%',
    },
    text: {
        fontSize: 48,
        margin: 20,
        fontFamily: 'Montserrat-Bold',
    },
});
