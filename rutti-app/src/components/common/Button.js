import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Icon} from '../../../assets/icomoon';
import COLOR from '../../../assets/colors';
import LottieView from 'lottie-react-native';
let TouchableOpacity;

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
        extraSmall,
        isLoading,
        disabled,
        inAnimatedView,
    },
    props,
) => {
    let opacityImport = inAnimatedView
        ? require('react-native-gesture-handler')
        : require('react-native');

    TouchableOpacity = opacityImport.TouchableOpacity;
    return (
        <View style={styles.Box}>
            <TouchableOpacity
                disabled={disabled}
                onPressOut={onPress}
                style={[
                    small
                        ? styles.buttonSmall
                        : extraSmall
                        ? styles.buttonExtraSmall
                        : styles.button,
                    shadow ? styles.shadow : '',
                    {
                        backgroundColor: getBackgroundColor(),
                    },
                ]}
                {...props}>
                <View style={styles.buttonContent}>
                    {isLoading ? (
                        <LottieView
                            source={require('../../../assets/animations/button-loading.json')}
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
            </TouchableOpacity>
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
                <Text
                    style={
                        small
                            ? styles.textSmall
                            : extraSmall
                            ? styles.textExtraSmall
                            : styles.text
                    }>
                    {text}
                </Text>
            )
        );
    }

    function getBackgroundColor() {
        if (disabled) {
            return COLOR.GRAY_2;
        }
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
        //flexWrap: 'wrap',
    },
    button: {
        width: '100%',
        borderRadius: 50,
        height: 60,
        padding: 5,
        marginBottom: 6,
        justifyContent: 'center',
    },
    buttonExtraSmall: {
        width: '100%',
        borderRadius: 50,
        height: 20,
        marginBottom: 6,
        justifyContent: 'center',
    },
    buttonSmall: {
        width: '100%',
        borderRadius: 50,
        height: 30,
        marginBottom: 6,
        justifyContent: 'center',
    },
    buttonContent: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
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
    textExtraSmall: {
        fontSize: 15,
        color: COLOR.WHITE,
        //marginHorizontal: 5,
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
    },
    shadow: {
        shadowOffset: {width: 0, height: 5},
        shadowColor: COLOR.GRAY_4,
        shadowOpacity: 1.0,
    },
});
