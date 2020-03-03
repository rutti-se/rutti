import React, {Component} from 'react';
import {TextInput, View, Text, StyleSheet, SafeAreaView} from 'react-native';
import Button from './Button';
import COLORS from '../assets/colors';
import InputField from './InputField';
export default class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handlePress() {}

    inputTextChanged(text) {
        console.log(text);
    }

    render() {
        const {} = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.topContainer}>
                    <Text style={styles.text}>Registrera</Text>
                </View>
                <View style={styles.inputForm}>
                    <InputField
                        onSubmitEditing={() => this.email.getInnerRef().focus()}
                        autoCorrect={false}
                        text={'Användarnamn'}></InputField>
                    <InputField
                        onSubmitEditing={() =>
                            this.password.getInnerRef().focus()
                        }
                        ref={r => (this.email = r)}
                        type={'email-address'}
                        text={'E-post'}></InputField>

                    <InputField
                        ref={r => (this.password = r)}
                        onSubmitEditing={() =>
                            this.rePassword.getInnerRef().focus()
                        }
                        secure={true}
                        text={'Lösenord'}></InputField>

                    <InputField
                        ref={r => (this.rePassword = r)}
                        autoCorrect={false}
                        secure={true}
                        text={'Bekräfta lösenord'}></InputField>
                </View>

                <View style={styles.bottomContainer}>
                    <Button
                        shadow={true}
                        onPress={this.handlePress}
                        text={'Registrera mig!'}></Button>
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

        // marginBottom: '20%',
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
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
    },
});
