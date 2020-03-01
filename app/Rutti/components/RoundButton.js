import React, {Component} from 'react';
import {TouchableHighlight, Text, StyleSheet, View} from 'react-native';
import {Icon} from '../assets/icomoon';
import COLOR from '../assets/colors';

export default class Button extends Component {
    constructor() {
        super();
        this.state = {};
    }

    renderContent(icon, iconColor, text) {
        if (icon) {
            return (
                <Icon
                    name={icon}
                    size={30}
                    color={iconColor ? iconColor : 'white'}></Icon>
            );
        } else {
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

        return (
            <View style={styles.Box}>
                <TouchableHighlight
                    underlayColor={'white'}
                    style={[
                        styles.button,
                        {backgroundColor: color ? color : COLOR.PRIMARY},
                    ]}
                    onPress={onPress}
                    disabled={disabled}>
                    <View style={styles.buttonContent}>
                        {this.renderContent(icon, iconColor, text)}
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: 50, //The Width must be the same as the height
        borderRadius: 400, //Then Make the Border Radius twice the size of width or Height
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        fontSize: 20,
        color: COLOR.WHITE,
    },
});
