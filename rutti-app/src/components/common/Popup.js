import React, {Component, useEffect, useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import RoundButton from './RoundButton';
import COLORS from '../../../assets/colors';

export default ({isVisible, close, children}) => {
    console.log(children);
    return (
        <Modal
            style={{justifyContent: 'center', alignItems: 'center'}}
            isVisible={isVisible}
            onBackButtonPress={close}
            onBackdropPress={close}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}>
            <View style={styles.container}>
                <View>{children}</View>
                <View style={styles.topContainer}>
                    <RoundButton
                        icon={'cross'}
                        iconColor={COLORS.BLACK}
                        color={COLORS.GRAY_5}
                        inAnimatedView={false}
                        onPress={close}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '90%',
        minHeight: 200,
        maxHeight: '80%',
        borderRadius: 10,
    },
    topContainer: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
});
