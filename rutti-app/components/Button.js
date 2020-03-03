import React, {Component} from 'react';
import {TouchableHighlight, Text, StyleSheet, View} from 'react-native';
import {Icon} from '../assets/icomoon/';
import COLOR from '../assets/colors';

export default class Button extends Component {
    constructor() {
        super();
        this.state = {};
    }

    renderIcon(icon, iconColor) {
        return (
            <Icon
                name={icon}
                size={30}
                color={iconColor ? iconColor : COLOR.WHITE}></Icon>
        );
    }

    renderText(text, icon) {
        if (text) {
            return <Text style={styles.text}>{text}</Text>;
        }
    }
    renderShadow(shadow) {
        if (shadow) {
            return styles.shadow;
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
            shadow,
        } = this.props;

        return (
            <View style={styles.Box}>
                <TouchableHighlight
                    underlayColor={underlayColor}
                    style={[
                        styles.button,
                        shadow ? styles.shadow : '',
                        {backgroundColor: color ? color : COLOR.PRIMARY},
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
        borderRadius: 50,
        padding: 5,
    },
    buttonContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        color: COLOR.WHITE,
        margin: 15,
        marginLeft: 10,
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
    },
    shadow: {
        shadowOffset: {width: 0, height: 5},
        shadowColor: COLOR.GRAY_4,
        shadowOpacity: 1.0,
    },
});
