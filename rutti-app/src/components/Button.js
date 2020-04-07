import React, {useEffect, useState} from 'react';
import {TouchableHighlight, Text, StyleSheet, View} from 'react-native';
import {Icon} from '../../assets/icomoon';
import COLOR from '../../assets/colors';
import LottieView from 'lottie-react-native';

export default (
    {
        icon,
        iconColor,
        text,
        shadow,
        type,
        backgroundColor,
        children,
        onPress,
        small,
        isLoading,
    },
    props,
) => {
    return (
        <View style={styles.Box}>
            <TouchableHighlight
                onPress={onPress}
                style={[
                    styles.button,
                    shadow ? styles.shadow : '',
                    {
                        backgroundColor: getBackgroundColor(),
                    },
                ]}
                {...props}>
                <View style={styles.buttonContent}>
                    {isLoading ? (
                        <LottieView
                            source={require('../../assets/animations/button-loading.json')}
                            autoPlay
                            loop
                            style={{height: 60}}
                        />
                    ) : (
                        <>
                            {icon && renderIcon()}
                            {text && renderText()}
                            {children}
                        </>
                    )}
                </View>
            </TouchableHighlight>
        </View>
    );

    function renderIcon() {
        return (
            icon && (
                <Icon
                    name={icon}
                    size={30}
                    color={iconColor ? iconColor : COLOR.WHITE}></Icon>
            )
        );
    }

    function renderText() {
        return (
            text &&
            text.length > 0 && (
                <Text style={small ? styles.textSmall : styles.text}>
                    {text}
                </Text>
            )
        );
    }

    function getBackgroundColor() {
        if (backgroundColor) {
            return backgroundColor;
        }
        if (!type) {
            return COLOR.PRIMARY;
        }
        switch (type) {
            case 'primary':
                return COLOR.PRIMARY;
            case 'secondary':
                return COLOR.GRAY_2;
        }
    }
};

const styles = StyleSheet.create({
    Box: {
        flexWrap: 'wrap',
    },
    button: {
        width: '100%',
        borderRadius: 50,
        height: 60,
        padding: 5,
    },
    buttonContent: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        height: '100%',
        color: COLOR.WHITE,
        marginHorizontal: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: 'Montserrat-Bold',
    },
    textSmall: {
        fontSize: 15,
        color: COLOR.WHITE,
        marginHorizontal: 5,
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
    },
    shadow: {
        shadowOffset: {width: 0, height: 5},
        shadowColor: COLOR.GRAY_4,
        shadowOpacity: 1.0,
    },
});
