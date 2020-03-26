import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import COLORS from '../../assets/colors';
import FadeInView from './animations/FadeInView';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import Svg, {Circle, Rect} from 'react-native-svg';

export default ({index}) => {
    return (
        <FadeInView style={styles.container}>
            <SvgAnimatedLinearGradient height={260}>
                <Rect x="75" y="5" width="140" height="140" />
                <Rect x="75" y="225" rx="4" ry="4" width="100" height="13" />
                <Circle cx="205" cy="230" r="20" />
            </SvgAnimatedLinearGradient>
        </FadeInView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
    },
});
