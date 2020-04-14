import React, {Component, useEffect, useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import RoundButton from '../common/RoundButton';
import COLOR from '../../../assets/colors';

export default ({selectListVisible, setSelectListVisible}) => {
    return (
        <>
            <Modal
                style={{justifyContent: 'flex-end', margin: 0}}
                isVisible={selectListVisible}
                onBackButtonPress={() => setSelectListVisible(false)}
                onBackdropPress={() => setSelectListVisible(false)}
                onSwipeComplete={() => setSelectListVisible(false)}
                swipeDirection={['down']}>
                <>
                    <View style={styles.container}>
                        <View
                            style={{
                                marginTop: 5,
                                marginHorizontal: 10,
                                alignContent: 'space-between',
                            }}>
                            <Text style={styles.title}>Välj inköpslista</Text>
                            <View style={{marginTop: 20}}>
                                <TouchableOpacity
                                    onPress={() => setSelectListVisible(false)}
                                    style={{paddingVertical: 10}}>
                                    <Text style={styles.option}>
                                        Inköpslista
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => setSelectListVisible(false)}
                                    style={{paddingVertical: 10}}>
                                    <Text style={styles.option}>
                                        Mormors lista
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.topContainer}>
                            <RoundButton
                                icon={'cross'}
                                iconColor={COLOR.BLACK}
                                color={COLOR.GRAY_4}
                                inAnimatedView={false}
                                onPress={() => setSelectListVisible(false)}
                            />
                        </View>
                    </View>
                </>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        minHeight: 300,
        maxHeight: '50%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    topContainer: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    title: {
        fontSize: 32,
        fontFamily: 'Montserrat-Bold',
    },
    option: {
        fontSize: 16,
        fontFamily: 'Montserrat',
    },
});
