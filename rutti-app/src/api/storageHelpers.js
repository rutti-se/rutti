import {AsyncStorage} from 'react-native';
import {useState, useEffect} from 'react';

export function getStores() {
    return AsyncStorage.getItem('stores').then(value => {
        if (value) {
            return value;
        } else {
            return [];
        }
    });
}

export function addStore(store) {
    let addedStores = currentStores.push(store);

    AsyncStorage.setItem('stores', JSON.stringify(addedStores)).then(
        result => storesUpdated++,
    );
}

export function removeStore(store) {}

export function clearStores() {}

export function setStores(stores) {}
