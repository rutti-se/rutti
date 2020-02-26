import React, {Component} from 'react';
import {TouchableHighlight, Text, StyleSheet, View} from 'react-native';
import {Icon} from '../assets/icomoon/';

export default class Button extends Component {
    constructor() {
        super();
        this.state = {};
    }

    renderIcon(icon, iconColor) {
        if (icon) {
            return (
                <Icon
                    name={icon}
                    size={30}
                    color={iconColor ? iconColor : 'white'}></Icon>
            );
        }
    }

    renderText(text) {
        console.log('TJooo');
        if (text) {
            return <Text style={styles.text}>{text}</Text>;
        }
    }
    render() {
        const {
            text,
            onPress,
            icon,
            color,
            underlayColor,
            iconColor,
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
                        {this.renderIcon(icon, iconColor)}
                        {this.renderText(text)}
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
        borderRadius: 25,
    },
    buttonContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        color: 'white',
        margin: 15,
        marginLeft: 10,
        textAlign: 'center',
    },
});
