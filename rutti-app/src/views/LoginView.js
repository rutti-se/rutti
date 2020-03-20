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
import {SvgCssUri} from 'react-native-svg';
import RegisterEmail from '../components/RegisterEmail';
import LoginEmail from '../components/LoginEmail';
import FadeInView from '../components/animations/FadeInView';

const WELCOME_PAGE = 0;
const SIGNIN_PAGE = 1;
const SIGNUP_PAGE = 2;

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
                            <SvgCssUri
                                width={250}
                                height={250}
                                uri={
                                    'https://firebasestorage.googleapis.com/v0/b/rutti-ca262.appspot.com/o/rutti_logo.svg?alt=media&token=c485a8e0-6f48-4bd3-9c77-ce64b51d15af'
                                }
                            />
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
                    <LoginEmail />
                </FadeInView>
            )}
            {currentPage === SIGNUP_PAGE && (
                <FadeInView>
                    <RegisterEmail />
                </FadeInView>
            )}
        </FadeInView>
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
