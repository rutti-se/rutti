import React, {Component} from 'react';
import COLOR from '../../../assets/colors';
import StoreMarker from './StoreMarker';
import MapView from 'react-native-map-clustering';
import {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

export default ({stores, onStorePress, mapBounds}) => {
    return (
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
            {stores.map(store => {
                return (
                    <Marker
                        coordinate={{
                            latitude: store.latitude,
                            longitude: store.longitude,
                        }}
                        title={store.name}
                        tracksViewChanges={true}
                        stopPropagation={true}
                        key={Math.random()}
                        onPress={() => onStorePress(store)}>
                        <StoreMarker
                            store={store.retailer}
                            selected={store.isSelected}
                        />
                    </Marker>
                );
            })}
        </MapView>
    );
};
