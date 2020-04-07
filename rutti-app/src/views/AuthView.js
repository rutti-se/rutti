import React, {Component, useState, useEffect} from 'react';
import {
    Animated,
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    BackHandler,
} from 'react-native';
import Button from '../components/Button';
import COLORS from '../../assets/colors';
import RuttiLogo from '../../assets/rutti_nologo.svg';
import RegisterEmail from '../components/RegisterEmail';
import LoginEmail from '../components/LoginEmail';
import FadeInView from '../components/animations/FadeInView';
import SelectStoresView from './SelectStoresView';
import LottieView from 'lottie-react-native';
import * as RootNavigation from '../views/RootNavigation';

const WELCOME_PAGE = 0;
const SIGNIN_PAGE = 1;
const SIGNUP_PAGE = 2;
const SELECT_STORES_PAGE = 3;

export default () => {
    let [currentPage, setCurrentPage] = useState(WELCOME_PAGE);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', function() {
            console.log('back');
            if (currentPage !== WELCOME_PAGE) {
                setCurrentPage(WELCOME_PAGE);
                return true;
            }
            return false;
        });
    }, [currentPage]);

    return (
        <FadeInView style={styles.container}>
            {currentPage === WELCOME_PAGE && (
                <>
                    <Animated.View style={styles.topContainer}>
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
                    </Animated.View>
                    <View style={styles.buttonContainer}>
                        <Button
                            text="Registrera mig"
                            shadow={true}
                            type={'primary'}
                            onPress={() => {
                                setCurrentPage(SIGNUP_PAGE);
                            }}></Button>
                        <Button
                            shadow={true}
                            text="Logga in"
                            type={'secondary'}
                            onPress={() =>
                                setCurrentPage(SIGNIN_PAGE)
                            }></Button>
                    </View>
                </>
            )}
            {currentPage === SIGNIN_PAGE && (
                <FadeInView>
                    <LoginEmail
                        onLoginComplete={() => RootNavigation.replace('Home')}
                        backPress={() => setCurrentPage(WELCOME_PAGE)}
                        goToRegistration={() => setCurrentPage(SIGNUP_PAGE)}
                    />
                </FadeInView>
            )}
            {currentPage === SIGNUP_PAGE && (
                <FadeInView>
                    <RegisterEmail
                        onRegistrationComplete={() => {
                            setCurrentPage(SELECT_STORES_PAGE);
                        }}
                        backPress={() => setCurrentPage(WELCOME_PAGE)}
                        goToLogin={() => setCurrentPage(SIGNIN_PAGE)}
                    />
                </FadeInView>
            )}
            {currentPage === SELECT_STORES_PAGE && (
                <FadeInView>
                    <SelectStoresView
                        onStoresSelected={() => RootNavigation.replace('Home')}
                    />
                </FadeInView>
            )}
        </FadeInView>
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
        flex: 1.5,
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
