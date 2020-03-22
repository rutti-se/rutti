import React, {Component, useState, useEffect} from 'react';
import COLORS from '../../assets/colors';
import RuttiLogo from '../../assets/rutti_logo.svg';
import {View, StyleSheet, Text, ScrollView, Dimensions} from 'react-native';
import InputField from '../components/InputField';
import {firebase} from '@react-native-firebase/auth';
import AuthView from './AuthView';
import Button from '../components/Button';
import {getStores} from '../api/storageHelpers';
import findStores from '../api/findStores';
const DEVICE = Dimensions.get('window');

export default () => {
    let {stores: selectedStores} = getStores();
    let [zipCode, setZipCode] = useState('');
    let [storeResults, setStoreResults] = useState([]);

    useEffect(() => {
        console.log(zipCode);
        if (zipCode.length === 5) {
            findStores({zipCode})
                .then(foundStores => {
                    setStoreResults(foundStores);

                    foundStores.forEach(store => console.log(store.storeId));
                })
                .catch(error => {
                    console.log('zipCode error', error);
                });
        }
    }, [zipCode]);

    function getStoreList() {
        return;
    }

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.text}>Välj butiker</Text>

                <InputField
                    onChangeText={text => setZipCode(text)}
                    name={'zipCode'}
                    labelText={'Postnummer'}></InputField>
            </View>

            {storeResults.map(store => {
                return (
                    <View>
                        <Text
                            style={{
                                color: COLORS.PRIMARY,
                                fontFamily: 'Montserrat-Bold',
                            }}>
                            {store.name}
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'Montserrat',
                            }}>
                            {store.retailer}
                        </Text>
                    </View>
                );
            })}

            <View style={styles.buttonContainer}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    resultsList: {
        padding: 20,
    },
    topContainer: {
        flex: 2,
        padding: 20,
    },
    buttonContainer: {
        flex: 1.7,
        alignSelf: 'center',
        width: '70%',
        justifyContent: 'space-between',
        marginBottom: '10%',
    },
    text: {
        fontSize: 48,
        fontFamily: 'Montserrat-Bold',
    },
});
