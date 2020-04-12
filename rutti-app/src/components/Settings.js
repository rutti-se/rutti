import React, {Component, useEffect, useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import RoundButton from './common/RoundButton';
import COLOR from '../../assets/colors';
import {firebase} from '@react-native-firebase/auth';
import SelectStoresView from '../views/SelectStoresView';

export default ({username}) => {
    const [visible, setVisible] = useState(false);
    const [selectStoresVisible, setSelectStoresVisible] = useState(false);

    return (
        <>
            <RoundButton
                icon={'settings'}
                iconColor={COLOR.WHITE}
                color={COLOR.PRIMARY}
                inAnimatedView={false}
                onPress={() => setVisible(true)}
            />
            <Modal
                style={{justifyContent: 'flex-end', margin: 0}}
                isVisible={visible}
                onBackButtonPress={() => setVisible(false)}
                onBackdropPress={() => setVisible(false)}
                onSwipeComplete={() => setVisible(false)}
                swipeDirection={selectStoresVisible ? [] : ['down']}>
                <>
                    {!selectStoresVisible ? (
                        <View style={styles.container}>
                            <View
                                style={{
                                    marginTop: 5,
                                    marginHorizontal: 10,
                                    alignContent: 'space-between',
                                }}>
                                <Text style={styles.title}>Inställningar</Text>
                                <View style={{marginTop: 20}}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            setSelectStoresVisible(true)
                                        }
                                        style={{paddingVertical: 10}}>
                                        <Text style={styles.option}>
                                            Välj butiker
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() =>
                                            firebase
                                                .auth()
                                                .signOut()
                                                .then(() =>
                                                    RootNavigation.replace(
                                                        'SignIn',
                                                    ),
                                                )
                                        }
                                        style={{paddingVertical: 10}}>
                                        <Text
                                            style={[
                                                styles.option,
                                                {color: COLOR.PRIMARY},
                                            ]}>
                                            Logga ut
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
                                    onPress={() => setVisible(false)}
                                />
                            </View>
                        </View>
                    ) : (
                        <SelectStoresView
                            username={username}
                            onStoresSelected={() =>
                                setSelectStoresVisible(false)
                            }
                        />
                    )}
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
