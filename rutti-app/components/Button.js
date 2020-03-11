import React from 'react';
import {TouchableHighlight, Text, StyleSheet, View} from 'react-native';
import {Icon} from '../assets/icomoon/';
import COLOR from '../assets/colors';

export default props => {
    function renderIcon(icon, iconColor) {
        return (
            <Icon
                name={icon}
                size={30}
                color={iconColor ? iconColor : COLOR.WHITE}></Icon>
        );
    }

    function renderText(text, icon) {
        if (text) {
            return <Text style={styles.text}>{text}</Text>;
        }
    }

    return (
        <View style={styles.Box}>
            <TouchableHighlight
                style={[
                    styles.button,
                    shadow ? styles.shadow : '',
                    {backgroundColor: color ? color : COLOR.PRIMARY},
                ]}
                {...props}>
                <View style={styles.buttonContent}>
                    {renderIcon(icon, iconColor)}
                    {renderText(text)}
                </View>
            </TouchableHighlight>
        </View>
    );
};

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
