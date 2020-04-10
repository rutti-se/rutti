import React, {Component, useEffect, useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import RoundButton from './RoundButton';
import COLORS from '../../../assets/colors';

export default ({isVisible, close}, props) => {
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
                <View style={styles.topContainer}>
                    <RoundButton
                        icon={'cross'}
                        iconColor={COLORS.BLACK}
                        color={COLORS.GRAY_4}
                        inAnimatedView={false}
                        onPress={() => {
                            console.log('click');
                            close();
                        }}
                    />
                </View>

                {props.children}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '80%',
        minHeight: 200,
    },
    topContainer: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
});
