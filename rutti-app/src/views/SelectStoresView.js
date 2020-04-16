import React, {Component} from 'react';
import COLOR from '../../assets/colors';
import {View, StyleSheet, Text, Alert} from 'react-native';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import findStores from '../api/findStores';
import {saveStores} from '../api/firebaseHelpers';
import StoreMap from '../components/select-stores-view/StoreMap';

export class SelectStoresView extends Component {
    constructor(props) {
        super(props);

        const {stores} = this.props;

        console.log(stores.length);

        this.state = {
            selectedStores: stores || [],
            storeResults: [],
            loading: false,
            mapBounds: {latitude: 56.483105, longitude: 13.585107},
        };
    }

    render() {
        let {selectedStores, storeResults, mapBounds, loading} = this.state;
        let {username, initialSetup, onStoresSelected} = this.props;

        console.log('stores length: ', selectedStores.length);

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
                        onChangeText={text => {
                            console.log(text);
                            if (text.length === 5) {
                                findStores({zipCode: text})
                                    .then(result => {
                                        this.setState({
                                            storeResults: result.stores,
                                            mapBounds: {
                                                latitude:
                                                    result.stores.centerLat,
                                                longitude:
                                                    result.stores.centerLong,
                                            },
                                        });
                                    })
                                    .catch(error => {
                                        Alert.alert(
                                            'Något gick fel!',
                                            error.toString(),
                                        );
                                    });
                            }
                        }}
                        name={'zipCode'}
                        labelText={'Postnummer'}
                    />
                </View>

                {storeResults && (
                    <StoreMap
                        stores={storeResults.map(store =>
                            selectedStores.findIndex(
                                e => e.storeId === store.storeId,
                            ) >= 0
                                ? {...store, ...{isSelected: !store.isSelected}}
                                : store,
                        )}
                        onStorePress={store => {
                            console.log('press');
                            if (store) {
                                if (
                                    selectedStores.findIndex(
                                        e => e.storeId === store.storeId,
                                    ) >= 0
                                ) {
                                    selectedStores.pop(store);
                                } else {
                                    selectedStores.push(store);
                                }
                                this.setState({selectedStores});
                            }
                        }}
                        mapBounds={mapBounds}
                    />
                )}

                <View style={styles.buttonContainer}>
                    <Button
                        text={
                            selectedStores.length > 0
                                ? initialSetup
                                    ? 'Fortsätt'
                                    : 'Spara'
                                : 'Välj minst en butik'
                        }
                        shadow={true}
                        loading={loading}
                        type={
                            selectedStores.length > 0 ? 'primary' : 'secondary'
                        }
                        onPress={() => {
                            this.setState({loading: true});

                            saveStores(username, selectedStores)
                                .then(() => onStoresSelected())
                                .catch(error =>
                                    Alert.alert(
                                        'Något gick fel!',
                                        error.error.message,
                                    ),
                                )
                                .finally(this.setState({loading: false}));
                        }}
                    />
                </View>
            </View>
        );
    }
}

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

export default SelectStoresView;
