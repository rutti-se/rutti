import React, {useRef} from 'react';
import {TextInput, View, Text, StyleSheet, SafeAreaView} from 'react-native';
import COLORS from '../assets/colors';

export default (
    {labelText, type, secure, autoCorrect, onSubmitEditing, name, onChange},
    props,
) => {
    let inputRef = useRef(null);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputForm}>
                <Text style={styles.labelText}>{labelText}</Text>
                <TextInput
                    onChangeText={text => onChange({name, text})}
                    ref={inputRef}
                    onSubmitEditing={onSubmitEditing}
                    autoCorrect={autoCorrect}
                    secureTextEntry={secure}
                    keyboardType={type ? type : 'default'}
                    style={styles.textInput}
                    {...props}></TextInput>
            </View>
        </SafeAreaView>
    );
};

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
