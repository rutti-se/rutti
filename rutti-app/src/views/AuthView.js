import React, {useState, useEffect} from 'react';
import {Animated, View, StyleSheet, BackHandler} from 'react-native';
import Button from '../components/common/Button';
import COLOR from '../../assets/colors';
import RuttiLogo from '../../assets/rutti_nologo.svg';
import RegisterEmail from '../components/auth-view/RegisterEmail';
import LoginEmail from '../components/auth-view/LoginEmail';
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
    let [username, setUsername] = useState(null);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', function() {
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
                        <View style={{paddingBottom: 20}}>
                            <Button
                                text="Registrera mig"
                                shadow={true}
                                type={'primary'}
                                onPress={() => {
                                    setCurrentPage(SIGNUP_PAGE);
                                }}
                            />
                        </View>
                        <Button
                            shadow={true}
                            text="Logga in"
                            type={'secondary'}
                            onPress={() => setCurrentPage(SIGNIN_PAGE)}
                        />
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
                        onRegistrationComplete={user => {
                            setUsername(user.displayName);
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
                        username={username}
                        onStoresSelected={() => {
                            RootNavigation.replace('Home');
                        }}
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
        backgroundColor: COLOR.SECONDARY,
    },
    topContainer: {
        flex: 5,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonContainer: {
        //flex: 1.5,
        height: '33%',
        alignSelf: 'center',
        width: '70%',
        justifyContent: 'center',
        marginBottom: '10%',
    },

    text: {
        fontSize: 48,
        margin: 20,
        fontFamily: 'Montserrat-Bold',
    },
});
