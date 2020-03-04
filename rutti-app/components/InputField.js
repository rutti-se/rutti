import React, {Component} from 'react';
import {TextInput, View, Text, StyleSheet, SafeAreaView} from 'react-native';
import COLORS from '../assets/colors';
export default class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    getInnerRef = () => this.ref;

    render() {
        const {
            labelText,
            type,
            secure,
            autoCorrect,
            onSubmitEditing,
            name,
            onChange,
        } = this.props;

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.inputForm}>
                    <Text style={styles.labelText}>{labelText}</Text>
                    <TextInput
                        onChangeText={text => onChange({name, text})}
                        ref={r => (this.ref = r)}
                        onSubmitEditing={onSubmitEditing}
                        autoCorrect={autoCorrect}
                        secureTextEntry={secure}
                        keyboardType={type ? type : 'default'}
                        style={styles.textInput}></TextInput>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    labelText: {
        color: COLORS.PRIMARY,
        fontFamily: 'Montserrat-Bold',
        paddingBottom: 10,
        paddingTop: 10,
    },
    textInput: {
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 15,
        color: 'black',
    },
});
