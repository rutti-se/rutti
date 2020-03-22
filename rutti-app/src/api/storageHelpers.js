import {AsyncStorage} from 'react-native';
import {useState, useEffect} from 'react';

let currentStores = useStores();

let storesUpdated = 0;

export function useStores() {
    let [stores, setStores] = useState([]);
    let [error, setError] = useState(null);

    console.log(stores);

    useEffect(async () => {
        AsyncStorage.getItem('stores')
            .then(value => {
                if (value) {
                    setStores(JSON.parse(value));
                    setError(null);
                }
            })
            .catch(error => {
                setError(error);
                console.log(error);
            });
    }, [storesUpdated]);
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
