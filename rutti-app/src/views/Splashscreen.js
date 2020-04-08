import React, {useState, useEffect} from 'react';
import COLORS from '../../assets/colors';
import RuttiLogo from '../../assets/rutti_logo.svg';
import {View, StyleSheet} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import AuthView from './AuthView';
import * as RootNavigation from '../views/RootNavigation';
import FadeInView from '../components/animations/FadeInView';
import LottieView from 'lottie-react-native';

export default () => {
    let [loading, setLoading] = useState(true);
    let [initializing, setInitializing] = useState(true);

    useEffect(() => {
        let unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (initializing) {
                if (user) {
                    //Användare finns redan
                    RootNavigation.replace('Home');
                } else {
                    //Ingen användare
                    setLoading(false);
                }
                unsubscribe();
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.topContainer}>
                    <FadeInView>
                        <View>
                            <RuttiLogo height={250} width={250} />
                            <LottieView
                                source={require('../../assets/animations/shopping-loader-white.json')}
                                autoPlay
                                loop
                                style={{
                                    height: 168,
                                    width: 250,
                                    top: 0,
                                    position: 'absolute',
                                }}
                            />
                        </View>
                    </FadeInView>
                </View>
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
        backgroundColor: COLORS.SECONDARY,
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
