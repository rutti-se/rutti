import React, {Component} from 'react';
import {
    Animated,
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
} from 'react-native';
import Button from '../Button';
import COLORS from '../../assets/colors';
import {SvgCssUri} from 'react-native-svg';

export default class StartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handlePress(event) {
        switch (event) {
            case 'Register':
                this.props.navigation.navigate('RegisterPage');
                break;
            case 'SignIn':
                break;
        }
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
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
                        onPress={() => this.handlePress('Register')}></Button>
                    <Button
                        shadow={true}
                        color={COLORS.GRAY_2}
                        text="Logga in"
                        onPress={() => this.handlePress('SignIn')}></Button>
                </View>
            </SafeAreaView>
        );
    }
}

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
