import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Icon} from '../../../assets/icomoon';
import COLOR from '../../../assets/colors';

export default (
    {icon, iconColor, text, backgroundColor, children, large},
    props,
) => {
    return (
        <View
            style={[
                large ? styles.containerLarge : styles.container,
                {backgroundColor},
            ]}
            {...props}>
            <View style={styles.containerContent}>
                {icon && renderIcon()}
                {text && renderText()}
                {children}
            </View>
        </View>
    );

    function renderIcon() {
        return (
            icon && (
                <Icon
                    name={icon}
                    size={30}
                    color={iconColor ? iconColor : COLOR.WHITE}
                />
            )
        );
    }

    function renderText() {
        return (
            text &&
            text.length > 0 && (
                <Text style={large ? styles.textLarge : styles.text}>
                    {text}
                </Text>
            )
        );
    }
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 50,
        height: 20,
        marginBottom: 6,
        justifyContent: 'center',
    },
    containerLarge: {
        width: '100%',
        borderRadius: 50,
        height: 30,
        marginBottom: 6,
        justifyContent: 'center',
    },

    containerContent: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    text: {
        fontSize: 15,
        color: COLOR.WHITE,
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
    },
    textLarge: {
        fontSize: 15,
        color: COLOR.WHITE,
        marginHorizontal: 5,
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
    },
});
