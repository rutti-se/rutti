import React, {useState, useEffect} from 'react';
import COLOR from '../../assets/colors';
import StoreMarker from '../components/select-stores-view/StoreMarker';
import {View, StyleSheet, Text, Alert} from 'react-native';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import findStores from '../api/findStores';
import MapView from 'react-native-map-clustering';
import {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {saveStores, getStores} from '../api/firebaseHelpers';

export default ({username, onStoresSelected}) => {
    let [selectedStores, setSelectedStores] = useState([]);
    let [amountSelected, setAmountSelected] = useState(0);
    let [zipCode, setZipCode] = useState('');
    let [storeResults, setStoreResults] = useState([]);
    let [loading, setLoading] = useState(false);
    let [mapBounds, setMapBounds] = useState({
        latitude: 56.483105,
        longitude: 13.585107,
    });

    useEffect(() => {
        getStores(username).then(stores => {
            setSelectedStores(stores);
        });
    }, []);

    useEffect(() => {
        if (zipCode.length === 5) {
            findStores({zipCode})
                .then(result => {
                    setStoreResults(result.stores);
                    setMapBounds({
                        latitude: result.stores.centerLat,
                        longitude: result.stores.centerLong,
                    });
                })
                .catch(error => {
                    Alert.alert('Något gick fel!', error.toString());
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

    function onPress() {
        setLoading(true);

        saveStores(username, selectedStores)
            .then(() => onStoresSelected())
            .catch(error =>
                Alert.alert('Något gick fel!', error.error.message),
            );
    }

    return (
        <View style={styles.container}>
            <View
                style={{
                    paddingTop: 40,
                    paddingBottom: 20,
                    paddingHorizontal: 20,
                    shadowOffset: {width: 0, height: 5},
                    shadowColor: COLOR.GRAY_4,
                    shadowOpacity: 1.0,
                }}>
                <Text style={styles.text}>Välj butiker</Text>

                <InputField
                    onChangeText={text => setZipCode(text)}
                    name={'zipCode'}
                    labelText={'Postnummer'}
                />
            </View>

            <MapView
                style={{flex: 1}}
                provider={PROVIDER_GOOGLE}
                clusterColor={COLOR.PRIMARY}
                initialRegion={{
                    latitude: mapBounds.latitude,
                    longitude: mapBounds.longitude,
                    latitudeDelta: 2.4,
                    longitudeDelta: 2.4,
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
                                //tracksViewChanges={false}
                                key={store.storeId.toString()}
                                onPress={() => onPressMarker(store.storeId)}>
                                <StoreMarker
                                    store={store.retailer}
                                    selected={store.isSelected}
                                />
                            </Marker>
                        );
                    })}
            </MapView>
            <View style={styles.buttonContainer}>
                <Button
                    text={
                        amountSelected && selectedStores.length > 0
                            ? 'Fortsätt'
                            : 'Välj minst en butik'
                    }
                    shadow={true}
                    loading={loading}
                    type={selectedStores.length > 0 ? 'primary' : 'secondary'}
                    onPress={onPress}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: COLOR.SECONDARY,
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
