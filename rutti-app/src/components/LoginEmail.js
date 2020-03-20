import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import Button from './Button';
import InputField from './InputField';
import {emailSignUp} from '../api/signInMethods';
import COLORS from '../../assets/colors';

export default class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handlePress = this.handlePress.bind(this);
    }

    handlePress() {
        // if (this.state.password != this.state.rePassword) {
        //     alert('Fel Lösenord');
        // } else {
        //     console.log(this.state);
        //     emailSignUp(this.state.email, this.state.password);
        // }
    }

    handleChange(event) {
        const {name, text} = event;
        this.setState({[name]: text});
    }

    render() {
        const {} = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.topContainer}>
                    <Text style={styles.text}>Logga in</Text>
                </View>
                <View style={styles.inputForm}>
                    <InputField
                        onChange={this.handleChange}
                        onSubmitEditing={() =>
                            this.password.getInnerRef().focus()
                        }
                        ref={r => (this.email = r)}
                        type={'email-address'}
                        name={'email'}
                        labelText={'E-post'}></InputField>

                    <InputField
                        onChange={this.handleChange}
                        ref={r => (this.password = r)}
                        onSubmitEditing={() =>
                            this.rePassword.getInnerRef().focus()
                        }
                        secure={true}
                        name={'password'}
                        labelText={'Lösenord'}></InputField>
                </View>

                <View style={styles.bottomContainer}>
                    <Button
                        shadow={true}
                        onPress={this.handlePress}
                        text={'Logga in!'}></Button>
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
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        fontSize: 48,
        margin: 20,
        fontFamily: 'Montserrat-Bold',
    },
    inputForm: {
        width: '90%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignSelf: 'center',
    },
    bottomContainer: {
        width: '90%',
        flex: 2,
        justifyContent: 'center',
        alignSelf: 'center',
    },
});
