import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
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
        const {} = this.props;
        return (
            <SafeAreaView style={styles.container}>
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
                            onPress={() => this.handlePress('Google')}></Button>
                    </View>
                    <View style={styles.bottomButton}>
                        <Button
                            shadow={true}
                            color={COLORS.GRAY_2}
                            text="E-post"
                            onPress={() => this.handlePress('Email')}></Button>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: COLORS.SECONDARY,
    },
    topContainer: {
        flex: 7,
        justifyContent: 'center',
    },
    buttonContainer: {
        alignSelf: 'center',
        flex: 9,
        width: '70%',
        justifyContent: 'space-around',
    },
    topButtons: {
        flex: 4,
        justifyContent: 'space-around',
    },
    bottomButton: {
        flex: 2,
        justifyContent: 'flex-end',
        borderTopColor: 'white',
        marginBottom: '20%',
    },

    text: {
        fontSize: 48,
        margin: 20,
        fontFamily: 'Montserrat-Bold',
    },
});
