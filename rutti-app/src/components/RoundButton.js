import React, {Component, useEffect, useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {Icon} from '../../assets/icomoon';
import COLOR from '../../assets/colors';
import {TouchableHighlight} from 'react-native-gesture-handler';
export default (
    {
        text,
        onPress,
        onLongPress,
        icon,
        color,
        underlayColor,
        iconColor,
        disabled,
    },
    props,
) => {
    const [isAndroid, setIsAndroid] = useState(false);

    useEffect(() => {
        setIsAndroid(Platform.OS === 'android');
    }, []);

    function renderContent() {
        if (icon) {
            return (
                <Icon
                    name={icon}
                    size={25}
                    color={iconColor ? iconColor : 'white'}></Icon>
            );
        } else {
            return <Text style={styles.text}>{text}</Text>;
        }
    }

    function renderAndroidButton() {
        return (
            <TouchableHighlight
                underlayColor={COLOR.PRIMARY}
                style={[
                    styles.button,
                    {backgroundColor: color ? color : COLOR.PRIMARY},
                ]}
                onPress={onPress}
                onLongPress={onLongPress}
                disabled={disabled}>
                <View style={styles.buttonContent}>{renderContent()}</View>
            </TouchableHighlight>
        );
    }

    function renderIOSButton() {
        return (
            <TouchableOpacity
                underlayColor={COLOR.PRIMARY}
                style={[
                    styles.button,
                    {backgroundColor: color ? color : COLOR.PRIMARY},
                ]}
                onPress={onPress}
                onLongPress={onLongPress}
                disabled={disabled}>
                <View style={styles.buttonContent}>{renderContent()}</View>
            </TouchableOpacity>
        );
    }
    return (
        <View style={styles.Box}>
            {isAndroid ? renderAndroidButton() : renderIOSButton()}
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 40,
        width: 40,
        borderRadius: 400,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        fontSize: 20,
        color: COLOR.WHITE,
    },
});
