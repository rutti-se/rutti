import React, {Component} from 'react';
import {Image, TouchableHighlight, Text, StyleSheet, View} from 'react-native';

export default class Button extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const {
            text,
            onPress,
            icon,
            color,
            underlayColor,
            disabled,
        } = this.props;

        const primary = '#FF3258';
        return (
            <View style={styles.Box}>
                <TouchableHighlight
                    underlayColor={underlayColor}
                    style={[
                        styles.button,
                        {backgroundColor: color ? color : primary},
                    ]}
                    onPress={onPress}
                    disabled={disabled}>
                    <View style={styles.buttonContent}>
                        <Text style={styles.text}>{text}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Box: {
        flexWrap: 'wrap',
    },
    button: {
        width: '100%',
        padding: 5,
        borderRadius: 25,
        backgroundColor: '#FF3258',
    },
    primary: {
        backgroundColor: '#FF3258',
    },
    buttonContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    green: {
        backgroundColor: '#00FF00',
    },
    text: {
        fontSize: 20,
        color: 'white',
        margin: 15,
        marginLeft: 10,
        textAlign: 'center',
    },
});
