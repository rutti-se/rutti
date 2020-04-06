import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import Button from '../components/Button';
import COLORS from '../../assets/colors';
import {facebookLogin, googleLogin} from '../api/signInMethods';

export default class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handlePress(event) {
        switch (event) {
            case 'Facebook':
                facebookLogin();
                break;
            case 'Google':
                googleLogin();
                break;
            case 'Email':
                this.props.navigation.navigate('RegisterEmail');
        }
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.topContainer}>
                        <Text style={styles.text}>Registrera</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.topButtons}>
                            <Button
                                color={COLORS.FACEBOOK}
                                text="Facebook"
                                shadow={true}
                                onPress={() =>
                                    this.handlePress('Facebook')
                                }></Button>
                            <Button
                                color={COLORS.TWITTER}
                                text="Twitter"
                                shadow={true}
                                onPress={() =>
                                    this.handlePress('Twitter')
                                }></Button>
                            <Button
                                text="Google"
                                shadow={true}
                                onPress={() =>
                                    this.handlePress('Google')
                                }></Button>
                        </View>
                        <View style={styles.bottomButton}>
                            <Button
                                shadow={true}
                                color={COLORS.GRAY_2}
                                text="E-post"
                                onPress={() =>
                                    this.handlePress('Email')
                                }></Button>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: COLORS.SECONDARY,
    },
    topContainer: {
        justifyContent: 'center',
    },
    buttonContainer: {
        alignSelf: 'center',
        width: '70%',
        justifyContent: 'space-around',
    },
    topButtons: {
        justifyContent: 'space-around',
    },
    bottomButton: {
        borderTopColor: 'white',
    },

    text: {
        fontSize: 48,
        margin: 20,
        fontFamily: 'Montserrat-Bold',
    },
});
