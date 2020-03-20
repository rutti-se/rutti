import React, {Component, useState} from 'react';
import {
    Animated,
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
} from 'react-native';
import Button from '../components/Button';
import COLORS from '../../assets/colors';
import {SvgCssUri} from 'react-native-svg';
import RegisterEmail from '../components/RegisterEmail';
import LoginEmail from '../components/LoginEmail';

const WELCOME_PAGE = 0;
const SIGNIN_PAGE = 1;
const SIGNUP_PAGE = 2;

export default () => {
    let [currentPage, setCurrentPage] = useState(WELCOME_PAGE);

    return (
        <SafeAreaView style={styles.container}>
            {currentPage === WELCOME_PAGE && (
                <>
                    <Animated.View style={styles.topContainer}>
                        <SvgCssUri
                            width={250}
                            height={250}
                            uri={
                                'https://firebasestorage.googleapis.com/v0/b/rutti-ca262.appspot.com/o/rutti_logo.svg?alt=media&token=c485a8e0-6f48-4bd3-9c77-ce64b51d15af'
                            }
                        />
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
                                setCurrentPage(SIGNUP_PAGE)
                            }></Button>
                    </View>
                </>
            )}
            {currentPage === SIGNIN_PAGE && <LoginEmail />}
            {currentPage === SIGNUP_PAGE && <RegisterEmail />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: '10%',
        justifyContent: 'flex-end',
    },
    topContainer: {
        flex: 5,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonContainer: {
        flex: 1.2,
        alignSelf: 'center',
        width: '70%',
        justifyContent: 'space-between',
    },

    text: {
        fontSize: 48,
        margin: 20,
        fontFamily: 'Montserrat-Bold',
    },
});
