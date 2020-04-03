import React, {Component, useState, useEffect} from 'react';
import COLORS from '../../assets/colors';

import RuttiLogo from '../../assets/rutti_logo.svg';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    Dimensions,
    CheckBox,
} from 'react-native';
import InputField from '../components/InputField';
import {firebase} from '@react-native-firebase/auth';
import AuthView from './AuthView';
import Button from '../components/Button';
import {getStores} from '../api/storageHelpers';
import findStores from '../api/findStores';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const DEVICE = Dimensions.get('window');

export default () => {
    let [selectedStores, setSelectedStores] = useState([]);
    let [amountSelected, setAmountSelected] = useState(0);
    let [zipCode, setZipCode] = useState('');
    let [storeResults, setStoreResults] = useState([]);

    useEffect(() => {
        getStores().then(stores => setSelectedStores(stores));
    }, []);

    useEffect(() => {
        console.log(zipCode);
        if (zipCode.length === 5) {
            findStores({zipCode})
                .then(foundStores => {
                    setStoreResults(foundStores);
                })
                .catch(error => {
                    console.log('zipCode error', error);
                });
        }
    }, [zipCode]);

    function onPressMarker(id) {
        storeResults.map(store => {
            if (store.storeId === id) {
                store.isSelected
                    ? selectedStores.pop(store)
                    : selectedStores.push(store);
                store.isSelected = !store.isSelected;
                setAmountSelected(selectedStores.length);
            }
        });
    }

    return (
        <View style={styles.container}>
            <View
                style={{
                    paddingTop: 40,
                    paddingBottom: 20,
                    paddingHorizontal: 20,
                    shadowOffset: {width: 0, height: 5},
                    shadowColor: COLORS.GRAY_4,
                    shadowOpacity: 1.0,
                }}>
                <Text style={styles.text}>Välj butiker</Text>

                <InputField
                    onChangeText={text => setZipCode(text)}
                    name={'zipCode'}
                    labelText={'Postnummer'}></InputField>
            </View>

            <MapView
                style={{flex: 1}}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: 61.383105,
                    longitude: 15.085107,
                    latitudeDelta: 12.0,
                    longitudeDelta: 12.0,
                }}
                showsUserLocation={true}>
                {storeResults &&
                    storeResults.map(store => {
                        return (
                            <Marker
                                coordinate={{
                                    latitude: store.latitude,
                                    longitude: store.longitude,
                                }}
                                title={store.name}
                                key={store.storeId.toString()}
                                pinColor={
                                    store.isSelected && amountSelected
                                        ? 'indigo'
                                        : COLORS[store.retailer]
                                }
                                onPress={() =>
                                    onPressMarker(store.storeId)
                                }></Marker>
                        );
                    })}
            </MapView>
            {/* 
            <FlatList
                style={{paddingTop: 20, paddingHorizontal: 20}}
                data={storeResults}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                    return (
                        <View style={{flexDirection: 'row'}}>
                            <CheckBox
                                checked={
                                    selectedStores.filter(
                                        e => e.storeId === item.storeId,
                                    ).length > 0
                                }
                            />
                            <View>
                                <Text
                                    style={{
                                        color: COLORS.PRIMARY,
                                        fontFamily: 'Montserrat-Bold',
                                    }}>
                                    {item.name}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: 'Montserrat',
                                    }}>
                                    {item.retailer}
                                </Text>
                            </View>
                        </View>
                    );
                }}
            /> */}
            <View style={styles.buttonContainer}>
                <Button
                    text={
                        amountSelected && selectedStores.length > 0
                            ? 'Fortsätt'
                            : 'Välj minst en butik'
                    }
                    shadow={true}
                    type={selectedStores.length > 0 ? 'primary' : 'secondary'}
                    onPress={() => {
                        console.log('fortsätt');
                    }}></Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: COLORS.SECONDARY,
    },
    resultsList: {
        padding: 20,
        marginBottom: 110,
    },
    buttonContainer: {
        height: 110,
        alignSelf: 'center',
        width: '100%',
        justifyContent: 'flex-end',
        padding: 20,
    },
    text: {
        fontSize: 48,
        fontFamily: 'Montserrat-Bold',
    },
});
