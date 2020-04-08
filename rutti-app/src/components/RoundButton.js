import React, {Component, useEffect, useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Icon} from '../../assets/icomoon';
import COLOR from '../../assets/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
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
    return (
        <View style={styles.Box}>
            <TouchableOpacity
                underlayColor={COLOR.PRIMARY}
                style={[
                    styles.button,
                    {backgroundColor: color ? color : COLOR.PRIMARY},
                ]}
                onPressOut={onPress}
                onLongPress={onLongPress}
                disabled={disabled}>
                <View style={styles.buttonContent}>{renderContent()}</View>
            </TouchableOpacity>
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
